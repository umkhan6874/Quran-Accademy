package com.example.ui

import android.app.Application
import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.speech.tts.TextToSpeech
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.AppDatabase
import com.example.data.local.ClassBookingEntity
import com.example.data.local.HifzProgressEntity
import com.example.data.local.QaidaProgressEntity
import com.example.data.local.QuranBookmarkEntity
import com.example.data.model.Ayah
import com.example.data.model.QaidaItem
import com.example.data.model.QaidaLesson
import com.example.data.model.Surah
import com.example.data.model.Teacher
import com.example.data.model.UserProfile
import com.example.data.model.UserRole
import com.example.data.repository.AppRepository
import com.example.data.repository.QuranData
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.util.Locale

data class AiMessage(
    val id: String = java.util.UUID.randomUUID().toString(),
    val sender: String, // "user" or "ustadhi"
    val text: String,
    val arabicQuote: String? = null,
    val timestamp: String = "Just now"
)

data class ClassroomState(
    val isMicMuted: Boolean = false,
    val isCameraOn: Boolean = true,
    val isHandRaised: Boolean = false,
    val currentAyahHighlight: Int = 1,
    val secondsRemaining: Int = 28 * 60 + 15,
    val isClassActive: Boolean = true,
    val chatMessages: List<Pair<String, String>> = listOf(
        "Sheikh Ahmad" to "Assalamu Alaikum! Welcome to today's Tajweed lesson.",
        "System" to "Hamza Ali joined the classroom.",
        "Sheikh Ahmad" to "Let us recite together starting from Surah Al-Fatihah, verse 1."
    )
)

class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = AppRepository(AppDatabase.getDatabase(application))
    private val vibrator = application.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    private var tts: TextToSpeech? = null
    private var isTtsReady = false

    init {
        tts = TextToSpeech(application) { status ->
            if (status == TextToSpeech.SUCCESS) {
                tts?.language = Locale.ENGLISH
                isTtsReady = true
            }
        }
    }

    override fun onCleared() {
        tts?.stop()
        tts?.shutdown()
        super.onCleared()
    }

    // User Profile
    val userProfile: StateFlow<UserProfile> = repository.userProfile.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        UserProfile()
    )

    // Bookings & Classes
    val bookings: StateFlow<List<ClassBookingEntity>> = repository.bookings.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        emptyList()
    )

    // Bookmarks
    val bookmarks: StateFlow<List<QuranBookmarkEntity>> = repository.bookmarks.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        emptyList()
    )

    // Progress
    val qaidaProgress: StateFlow<List<QaidaProgressEntity>> = repository.qaidaProgress.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        emptyList()
    )

    val hifzProgress: StateFlow<List<HifzProgressEntity>> = repository.hifzProgress.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        emptyList()
    )

    // Teachers List
    val teachersList: List<Teacher> = repository.teachersList

    // Navigation state
    private val _currentRoute = MutableStateFlow("landing")
    val currentRoute: StateFlow<String> = _currentRoute.asStateFlow()

    fun navigateTo(route: String) {
        _currentRoute.value = route
    }

    // Role switching
    fun switchRole(role: UserRole) {
        viewModelScope.launch {
            repository.switchRole(role)
        }
    }

    fun toggleKidsMode() {
        viewModelScope.launch {
            repository.toggleKidsMode()
        }
    }

    fun setQuranFontSize(sizeSp: Int) {
        viewModelScope.launch {
            repository.setQuranFontSize(sizeSp)
        }
    }

    fun completeOnboarding(role: UserRole, level: String, goalMins: Int) {
        viewModelScope.launch {
            val current = userProfile.value
            repository.updateProfile(
                current.copy(
                    role = role,
                    learningLevel = level,
                    dailyGoalMinutes = goalMins,
                    hasCompletedOnboarding = true
                )
            )
            _currentRoute.value = "student"
        }
    }

    // Free Trial Booking
    private val _selectedTeacher = MutableStateFlow<Teacher?>(null)
    val selectedTeacher: StateFlow<Teacher?> = _selectedTeacher.asStateFlow()

    fun selectTeacher(teacher: Teacher) {
        _selectedTeacher.value = teacher
    }

    fun bookFreeTrial(
        teacher: Teacher,
        subject: String,
        date: String,
        timeSlot: String,
        onSuccess: () -> Unit
    ) {
        viewModelScope.launch {
            repository.bookFreeTrial(
                teacher = teacher,
                subject = subject,
                date = date,
                timeSlot = timeSlot,
                studentName = userProfile.value.name
            )
            onSuccess()
        }
    }

    fun cancelBooking(id: String) {
        viewModelScope.launch {
            repository.cancelBooking(id)
        }
    }

    fun completeClass(id: String) {
        viewModelScope.launch {
            repository.completeClass(id)
        }
    }

    // Quran Reader State
    private val _selectedSurah = MutableStateFlow(QuranData.surahs.first())
    val selectedSurah: StateFlow<Surah> = _selectedSurah.asStateFlow()

    private val _activeAyahIndex = MutableStateFlow(1)
    val activeAyahIndex: StateFlow<Int> = _activeAyahIndex.asStateFlow()

    private val _isPlayingQuranAudio = MutableStateFlow(false)
    val isPlayingQuranAudio: StateFlow<Boolean> = _isPlayingQuranAudio.asStateFlow()

    private val _repeatCount = MutableStateFlow(1)
    val repeatCount: StateFlow<Int> = _repeatCount.asStateFlow()

    private var playbackJob: Job? = null

    fun selectSurah(surah: Surah) {
        _selectedSurah.value = surah
        _activeAyahIndex.value = 1
        stopQuranAudio()
    }

    fun playPauseQuranAudio() {
        if (_isPlayingQuranAudio.value) {
            stopQuranAudio()
        } else {
            startQuranAudio()
        }
    }

    private fun startQuranAudio() {
        _isPlayingQuranAudio.value = true
        playbackJob?.cancel()
        playbackJob = viewModelScope.launch {
            val ayahs = QuranData.ayahsMap[_selectedSurah.value.number] ?: emptyList()
            if (ayahs.isEmpty()) return@launch

            while (_isPlayingQuranAudio.value) {
                for (r in 1.._repeatCount.value) {
                    // Pronounce or simulate recitation cadence
                    val currentAyah = ayahs.find { it.ayahNumber == _activeAyahIndex.value }
                    if (currentAyah != null && isTtsReady) {
                        tts?.speak(currentAyah.arabicText, TextToSpeech.QUEUE_FLUSH, null, "ayah_${currentAyah.ayahNumber}")
                    }
                    delay(3500)
                    if (!_isPlayingQuranAudio.value) break
                }
                // Next Ayah
                if (_activeAyahIndex.value < ayahs.size) {
                    _activeAyahIndex.value += 1
                } else {
                    _activeAyahIndex.value = 1
                    _isPlayingQuranAudio.value = false
                    break
                }
            }
        }
    }

    fun stopQuranAudio() {
        _isPlayingQuranAudio.value = false
        playbackJob?.cancel()
        tts?.stop()
    }

    fun nextAyah() {
        val ayahs = QuranData.ayahsMap[_selectedSurah.value.number] ?: return
        if (_activeAyahIndex.value < ayahs.size) {
            _activeAyahIndex.value += 1
        }
    }

    fun prevAyah() {
        if (_activeAyahIndex.value > 1) {
            _activeAyahIndex.value -= 1
        }
    }

    fun toggleRepeat() {
        _repeatCount.value = when (_repeatCount.value) {
            1 -> 3
            3 -> 5
            5 -> 10
            else -> 1
        }
    }

    fun toggleBookmark(surah: Surah, ayah: Ayah) {
        viewModelScope.launch {
            repository.toggleBookmark(
                surah = surah.number,
                surahName = surah.nameEnglish,
                ayah = ayah.ayahNumber,
                ayahArabic = ayah.arabicText
            )
        }
    }

    // Noorani Qaida Interaction
    private val _selectedQaidaLesson = MutableStateFlow(QuranData.qaidaLessons.first())
    val selectedQaidaLesson: StateFlow<QaidaLesson> = _selectedQaidaLesson.asStateFlow()

    private val _selectedQaidaItem = MutableStateFlow<QaidaItem?>(null)
    val selectedQaidaItem: StateFlow<QaidaItem?> = _selectedQaidaItem.asStateFlow()

    fun selectQaidaLesson(lesson: QaidaLesson) {
        _selectedQaidaLesson.value = lesson
        _selectedQaidaItem.value = lesson.items.firstOrNull()
    }

    fun tapQaidaItem(item: QaidaItem) {
        _selectedQaidaItem.value = item
        vibrate(35)
        if (isTtsReady) {
            tts?.speak(item.name + ". " + item.symbol, TextToSpeech.QUEUE_FLUSH, null, "qaida_${item.name}")
        }
    }

    fun completeCurrentQaidaLesson() {
        viewModelScope.launch {
            repository.markQaidaCompleted(_selectedQaidaLesson.value.id, 100)
        }
    }

    // Hifz Tracker
    fun repeatHifzAyah(surahNumber: Int) {
        viewModelScope.launch {
            repository.incrementHifzRepeat(surahNumber)
            vibrate(50)
        }
    }

    // AI Quran Tutor Chat State
    private val _aiMessages = MutableStateFlow<List<AiMessage>>(
        listOf(
            AiMessage(
                sender = "ustadhi",
                text = "Assalamu Alaikum! I am your AI Quran Tutor. How can I assist your Quran journey today? You can ask me about Tajweed rules, Arabic letter pronunciation, or the meaning of any Ayah.",
                arabicQuote = "رَّبِّ زِدْنِي عِلْمًا"
            )
        )
    )
    val aiMessages: StateFlow<List<AiMessage>> = _aiMessages.asStateFlow()

    private val _isAiThinking = MutableStateFlow(false)
    val isAiThinking: StateFlow<Boolean> = _isAiThinking.asStateFlow()

    fun sendAiPrompt(prompt: String) {
        val userMsg = AiMessage(sender = "user", text = prompt)
        _aiMessages.value = _aiMessages.value + userMsg
        _isAiThinking.value = true

        viewModelScope.launch {
            delay(1200) // Realistic thoughtful generation time
            val response = generateTutorResponse(prompt, userProfile.value.isKidsMode)
            _aiMessages.value = _aiMessages.value + response
            _isAiThinking.value = false
            vibrate(40)
        }
    }

    private fun generateTutorResponse(prompt: String, kidsMode: Boolean): AiMessage {
        val lower = prompt.lowercase()
        return when {
            lower.contains("qalqalah") || lower.contains("echo") -> {
                AiMessage(
                    sender = "ustadhi",
                    text = if (kidsMode) {
                        "Imagine bouncing a super bouncy ball! Qalqalah makes an echoing bounce sound on 5 special letters: Qaf (ق), Taa (ط), Baa (ب), Jeem (ج), Daal (د). Remember the secret word: 'Qutb Jad' (قُطْبُ جَدّ)! When you stop on them, make them bounce happily!"
                    } else {
                        "Qalqalah (القلقلة) refers to a distinct echoing or bouncing sound created when releasing one of the 5 Qalqalah letters: (ق، ط، ب، ج، د - grouped as Qutb Jad) with a Sukoon or at a stop. There are two major levels: Sughra (light bounce in the middle of a word) and Kubra (strong bounce when pausing at the end of an ayah, e.g. Aḥad(e) in Surah Al-Ikhlas)."
                    },
                    arabicQuote = "قُلْ هُوَ اللَّهُ أَحَدٌ"
                )
            }
            lower.contains("ikhfa") || lower.contains("hide") -> {
                AiMessage(
                    sender = "ustadhi",
                    text = if (kidsMode) {
                        "Ikhfa is like playing hide-and-seek with the letter Noon! Instead of saying 'N' loudly, we hide it softly in our nose for 2 counts before saying the next letter. Try it with 'Min Qablu'!"
                    } else {
                        "Ikhfa (الإخفاء) literally means 'concealment'. In Tajweed, when a Noon Saakin or Tanween is followed by any of the 15 Ikhfa letters (such as ت، ث، ج، د، ذ، ز...), we pronounce the Noon between Izhar and Idgham with a gentle 2-count nasal tone (Ghunnah), while preparing the mouth for the next letter."
                    },
                    arabicQuote = "مِن قَبْلُ"
                )
            }
            lower.contains("ain") || lower.contains("ayn") || lower.contains("hamza") -> {
                AiMessage(
                    sender = "ustadhi",
                    text = "Great question! Hamzah (ء) comes from the deepest bottom of your throat (near the vocal cords) with an abrupt, crisp stop. In contrast, 'Ayn (ع) comes from the middle of the throat (Adna al-Halq); gently squeeze the middle of your throat as if taking a sip of warm honey to get that authentic Arabic sound.",
                    arabicQuote = "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ"
                )
            }
            lower.contains("fatiha") || lower.contains("meaning") -> {
                AiMessage(
                    sender = "ustadhi",
                    text = "Surah Al-Fatihah is known as 'Umm al-Kitab' (Mother of the Book) and 'As-Sab' al-Mathani' (The Seven Oft-Repeated Verses). It is the greatest Surah in the Quran, encapsulating Allah's praise, His supreme mercy, the Day of Judgment, our pledge of worship, and our plea for true guidance on the Straight Path.",
                    arabicQuote = "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ"
                )
            }
            lower.contains("memorize") || lower.contains("hifz") -> {
                AiMessage(
                    sender = "ustadhi",
                    text = if (kidsMode) {
                        "Here is the Gold Star Secret to memorizing: 1. Listen to the Ayah 3 times. 2. Repeat it 10 times looking at the book. 3. Close your eyes and say it from your heart! Do just 2 or 3 verses every single day, and soon you will know the whole Surah!"
                    } else {
                        "The golden methodology for Hifz is: 'Sabaq' (New lesson of 3-5 ayahs recited 15x to perfection), 'Sabqi' (Recent 5-10 pages reviewed daily to lock in memory), and 'Manzil' (Older memorized portions cycled continuously). Consistent small daily repetition beats cramming every single time."
                    },
                    arabicQuote = "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"
                )
            }
            else -> {
                AiMessage(
                    sender = "ustadhi",
                    text = "That is a beautiful topic in Quranic learning. With consistent practice, correct Makharij, and sincere intention, Allah opens every door. Remember the Prophet ﷺ said: 'The one who recites the Quran beautifully is with the noble angels, and the one who stutters and finds it difficult gets double the reward!'",
                    arabicQuote = "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
                )
            }
        }
    }

    // Live Classroom Simulation
    private val _classroomState = MutableStateFlow(ClassroomState())
    val classroomState: StateFlow<ClassroomState> = _classroomState.asStateFlow()

    fun toggleMic() {
        _classroomState.value = _classroomState.value.copy(
            isMicMuted = !_classroomState.value.isMicMuted
        )
        vibrate(30)
    }

    fun toggleCamera() {
        _classroomState.value = _classroomState.value.copy(
            isCameraOn = !_classroomState.value.isCameraOn
        )
        vibrate(30)
    }

    fun toggleRaiseHand() {
        val current = _classroomState.value.isHandRaised
        _classroomState.value = _classroomState.value.copy(
            isHandRaised = !current,
            chatMessages = if (!current) {
                _classroomState.value.chatMessages + ("You" to "✋ Raised hand to ask a question.")
            } else {
                _classroomState.value.chatMessages
            }
        )
        vibrate(50)
    }

    fun sendClassChatMessage(msg: String) {
        if (msg.isBlank()) return
        val updated = _classroomState.value.chatMessages + ("You" to msg)
        _classroomState.value = _classroomState.value.copy(chatMessages = updated)

        // Teacher simulated response
        viewModelScope.launch {
            delay(1500)
            _classroomState.value = _classroomState.value.copy(
                chatMessages = _classroomState.value.chatMessages + ("Sheikh Ahmad" to "Ahsant Hamza! Great question. Notice the Sukoon on the letter Noon.")
            )
        }
    }

    fun highlightClassAyah(ayahNumber: Int) {
        _classroomState.value = _classroomState.value.copy(currentAyahHighlight = ayahNumber)
    }

    // Islamic Tools: Tasbeeh Counter
    private val _tasbeehCount = MutableStateFlow(0)
    val tasbeehCount: StateFlow<Int> = _tasbeehCount.asStateFlow()

    private val _tasbeehTarget = MutableStateFlow(33)
    val tasbeehTarget: StateFlow<Int> = _tasbeehTarget.asStateFlow()

    private val _selectedDhikr = MutableStateFlow("سُبْحَانَ اللَّهِ (SubhanAllah)")
    val selectedDhikr: StateFlow<String> = _selectedDhikr.asStateFlow()

    fun countTasbeeh() {
        val next = _tasbeehCount.value + 1
        _tasbeehCount.value = next
        if (next % _tasbeehTarget.value == 0) {
            vibrate(100) // Celebratory vibration on target completion
        } else {
            vibrate(25)
        }
    }

    fun resetTasbeeh() {
        _tasbeehCount.value = 0
        vibrate(40)
    }

    fun setDhikr(dhikr: String, target: Int = 33) {
        _selectedDhikr.value = dhikr
        _tasbeehTarget.value = target
        _tasbeehCount.value = 0
    }

    private fun vibrate(durationMs: Long) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator?.vibrate(VibrationEffect.createOneShot(durationMs, VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                @Suppress("DEPRECATION")
                vibrator?.vibrate(durationMs)
            }
        } catch (_: Exception) {}
    }
}
