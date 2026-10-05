package com.example.data.repository

import com.example.data.local.AppDatabase
import com.example.data.local.ClassBookingEntity
import com.example.data.local.HifzProgressEntity
import com.example.data.local.QaidaProgressEntity
import com.example.data.local.QuranBookmarkEntity
import com.example.data.local.UserProfileEntity
import com.example.data.model.Teacher
import com.example.data.model.UserProfile
import com.example.data.model.UserRole
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import java.util.UUID

class AppRepository(private val database: AppDatabase) {

    private val userDao = database.userDao()
    private val bookingDao = database.bookingDao()
    private val bookmarkDao = database.bookmarkDao()
    private val progressDao = database.progressDao()

    init {
        CoroutineScope(Dispatchers.IO).launch {
            seedInitialDataIfEmpty()
        }
    }

    private suspend fun seedInitialDataIfEmpty() {
        val existingProfile = userDao.getUserProfileOnce()
        if (existingProfile == null) {
            userDao.insertOrUpdateProfile(
                UserProfileEntity(
                    id = "primary_user",
                    name = "Hamza Ali",
                    email = "hamza@example.com",
                    role = "STUDENT",
                    learningLevel = "Beginner (Noorani Qaida)",
                    dailyGoalMinutes = 20,
                    streakDays = 7,
                    starsEarned = 145,
                    isKidsMode = true,
                    preferredLanguage = "English",
                    quranFontSizeSp = 26,
                    hasCompletedOnboarding = true
                )
            )

            // Seed initial demo class
            bookingDao.insertBooking(
                ClassBookingEntity(
                    id = "demo_class_1",
                    teacherId = "t1",
                    teacherName = "Sheikh Ahmad Al-Masri",
                    studentName = "Hamza Ali",
                    subject = "Tajweed & Makharij Practice",
                    date = "Today",
                    timeSlot = "05:00 PM",
                    durationMinutes = 30,
                    status = "UPCOMING",
                    homework = "Practice the 6 Halqi letters from Lesson 1.",
                    teacherNotes = "Excellent enthusiasm! Focused on throat articulation points.",
                    isTrial = true
                )
            )
            bookingDao.insertBooking(
                ClassBookingEntity(
                    id = "demo_class_2",
                    teacherId = "t2",
                    teacherName = "Ustadha Fatima Khan",
                    studentName = "Hamza Ali",
                    subject = "Noorani Qaida Lesson 2",
                    date = "Yesterday",
                    timeSlot = "04:30 PM",
                    durationMinutes = 30,
                    status = "COMPLETED",
                    homework = "Review Kasra and Damma with audio examples.",
                    teacherNotes = "Masha'Allah, mastered Alif through Jeem with perfect clarity!",
                    isTrial = false
                )
            )

            // Seed initial bookmark
            bookmarkDao.addBookmark(
                QuranBookmarkEntity(
                    id = "bm_1",
                    surahNumber = 1,
                    surahName = "Al-Fatihah",
                    ayahNumber = 5,
                    ayahArabic = "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"
                )
            )

            // Seed initial Hifz progress
            progressDao.setHifzProgress(
                HifzProgressEntity(
                    id = "hifz_112",
                    surahNumber = 112,
                    surahName = "Al-Ikhlas",
                    startAyah = 1,
                    endAyah = 4,
                    currentRepeats = 8,
                    targetRepeats = 10,
                    status = "IN_PROGRESS"
                )
            )
        }
    }

    val userProfile: Flow<UserProfile> = userDao.getUserProfile().map { entity ->
        if (entity != null) {
            UserProfile(
                id = entity.id,
                name = entity.name,
                email = entity.email,
                role = try { UserRole.valueOf(entity.role) } catch (_: Exception) { UserRole.STUDENT },
                learningLevel = entity.learningLevel,
                dailyGoalMinutes = entity.dailyGoalMinutes,
                streakDays = entity.streakDays,
                starsEarned = entity.starsEarned,
                isKidsMode = entity.isKidsMode,
                preferredLanguage = entity.preferredLanguage,
                quranFontSizeSp = entity.quranFontSizeSp,
                hasCompletedOnboarding = entity.hasCompletedOnboarding
            )
        } else {
            UserProfile()
        }
    }

    suspend fun updateProfile(profile: UserProfile) {
        userDao.insertOrUpdateProfile(
            UserProfileEntity(
                id = profile.id,
                name = profile.name,
                email = profile.email,
                role = profile.role.name,
                learningLevel = profile.learningLevel,
                dailyGoalMinutes = profile.dailyGoalMinutes,
                streakDays = profile.streakDays,
                starsEarned = profile.starsEarned,
                isKidsMode = profile.isKidsMode,
                preferredLanguage = profile.preferredLanguage,
                quranFontSizeSp = profile.quranFontSizeSp,
                hasCompletedOnboarding = profile.hasCompletedOnboarding
            )
        )
    }

    suspend fun switchRole(newRole: UserRole) {
        val current = userDao.getUserProfileOnce() ?: return
        userDao.insertOrUpdateProfile(current.copy(role = newRole.name))
    }

    suspend fun toggleKidsMode() {
        val current = userDao.getUserProfileOnce() ?: return
        userDao.insertOrUpdateProfile(current.copy(isKidsMode = !current.isKidsMode))
    }

    suspend fun setQuranFontSize(sizeSp: Int) {
        val current = userDao.getUserProfileOnce() ?: return
        userDao.insertOrUpdateProfile(current.copy(quranFontSizeSp = sizeSp))
    }

    suspend fun addStars(amount: Int) {
        val current = userDao.getUserProfileOnce() ?: return
        userDao.insertOrUpdateProfile(current.copy(starsEarned = current.starsEarned + amount))
    }

    // Bookings
    val bookings: Flow<List<ClassBookingEntity>> = bookingDao.getAllBookings()

    suspend fun bookFreeTrial(
        teacher: Teacher,
        subject: String,
        date: String,
        timeSlot: String,
        studentName: String = "Hamza Ali"
    ): ClassBookingEntity {
        val newBooking = ClassBookingEntity(
            id = UUID.randomUUID().toString(),
            teacherId = teacher.id,
            teacherName = teacher.name,
            studentName = studentName,
            subject = subject,
            date = date,
            timeSlot = timeSlot,
            durationMinutes = 30,
            status = "UPCOMING",
            homework = "Review lesson intro before meeting your teacher.",
            teacherNotes = "Teacher will meet you in the live interactive classroom.",
            isTrial = true
        )
        bookingDao.insertBooking(newBooking)
        return newBooking
    }

    suspend fun cancelBooking(id: String) {
        bookingDao.deleteBooking(id)
    }

    suspend fun completeClass(id: String) {
        bookingDao.updateBookingStatus(id, "COMPLETED")
        addStars(20)
    }

    // Bookmarks
    val bookmarks: Flow<List<QuranBookmarkEntity>> = bookmarkDao.getAllBookmarks()

    fun isBookmarked(surah: Int, ayah: Int): Flow<Boolean> = bookmarkDao.isBookmarked(surah, ayah)

    suspend fun toggleBookmark(surah: Int, surahName: String, ayah: Int, ayahArabic: String) {
        val isBm = bookmarkDao.isBookmarked(surah, ayah).firstOrNull() ?: false
        if (isBm) {
            bookmarkDao.removeBookmark(surah, ayah)
        } else {
            bookmarkDao.addBookmark(
                QuranBookmarkEntity(
                    id = "bm_${surah}_${ayah}",
                    surahNumber = surah,
                    surahName = surahName,
                    ayahNumber = ayah,
                    ayahArabic = ayahArabic
                )
            )
        }
    }

    // Progress
    val qaidaProgress: Flow<List<QaidaProgressEntity>> = progressDao.getAllQaidaProgress()
    val hifzProgress: Flow<List<HifzProgressEntity>> = progressDao.getAllHifzProgress()

    suspend fun markQaidaCompleted(lessonId: Int, score: Int = 100) {
        progressDao.setQaidaProgress(
            QaidaProgressEntity(
                lessonId = lessonId,
                isCompleted = true,
                practiceScore = score,
                lastAccessed = System.currentTimeMillis()
            )
        )
        addStars(15)
    }

    suspend fun incrementHifzRepeat(surahNumber: Int) {
        val currentList = progressDao.getAllHifzProgress().firstOrNull() ?: emptyList()
        val found = currentList.find { it.surahNumber == surahNumber }
        if (found != null) {
            val newRepeats = found.currentRepeats + 1
            val newStatus = if (newRepeats >= found.targetRepeats) "MASTERED" else "IN_PROGRESS"
            progressDao.setHifzProgress(found.copy(currentRepeats = newRepeats, status = newStatus))
            if (newStatus == "MASTERED") addStars(25)
        }
    }

    // Verified Teachers List
    val teachersList: List<Teacher> = listOf(
        Teacher(
            id = "t1",
            name = "Sheikh Ahmad Al-Masri",
            title = "Senior Quran & Tajweed Specialist",
            qualification = "Al-Azhar University, Islamic Studies Graduate",
            ijazah = "Ijazah in Hafs 'an Asim (with unbroken chain to the Prophet ﷺ)",
            subjects = listOf("Tajweed Rules", "Nazra Reading", "Makharij Articulation", "Tafsir"),
            languages = listOf("English", "Arabic"),
            experienceYears = 14,
            rating = 4.95f,
            reviewsCount = 184,
            bio = "Certified senior instructor specializing in clearing pronunciation obstacles for English-speaking youth and beginners. Patient, structured, and warm.",
            gender = "Male",
            availableToday = true,
            availableSlots = listOf("09:00 AM", "11:30 AM", "03:00 PM", "05:00 PM", "08:00 PM")
        ),
        Teacher(
            id = "t2",
            name = "Ustadha Fatima Khan",
            title = "Child Quran Pedagogy & Noorani Qaida Master",
            qualification = "B.A. Islamic Studies & Child Psychology",
            ijazah = "Certified Noorani Qaida Instructor with Sanad",
            subjects = listOf("Noorani Qaida for Kids", "Tajweed Basics", "Short Surahs", "Islamic Stories"),
            languages = listOf("English", "Urdu"),
            experienceYears = 9,
            rating = 4.98f,
            reviewsCount = 212,
            bio = "Loved by kids worldwide for interactive, fun, and encouraging lessons. Uses visual cards, gentle praise, and engaging storytelling.",
            gender = "Female",
            availableToday = true,
            availableSlots = listOf("10:00 AM", "01:30 PM", "04:30 PM", "06:00 PM")
        ),
        Teacher(
            id = "t3",
            name = "Qari Muhammad Bilal",
            title = "Hifz ul-Quran & Qira'at Mentor",
            qualification = "Islamic University of Madinah Graduate",
            ijazah = "Ijazah in 10 Qira'at from the Prophet's Mosque",
            subjects = listOf("Hifz Memorization", "Revision (Muraja'ah)", "Voice Modulation", "Advanced Tajweed"),
            languages = listOf("English", "Arabic", "Urdu"),
            experienceYears = 16,
            rating = 4.92f,
            reviewsCount = 159,
            bio = "Has mentored over 40 students to full Quran memorization. Specializes in effective memory retention systems (Sabaq, Sabqi, Manzil).",
            gender = "Male",
            availableToday = false,
            availableSlots = listOf("08:00 AM", "02:00 PM", "07:00 PM")
        ),
        Teacher(
            id = "t4",
            name = "Ustadha Maryam Siddiqui",
            title = "Youth Quran & Character Building Educator",
            qualification = "Diploma in Quranic Sciences & Hadith",
            ijazah = "Ijazah in Shu'bah & Hafs Recitations",
            subjects = listOf("Noorani Qaida", "Nazra", "Dua & Azkar", "Teens Mentorship"),
            languages = listOf("English", "Urdu"),
            experienceYears = 7,
            rating = 4.89f,
            reviewsCount = 98,
            bio = "Dedicated to creating safe, inspiring spaces for young sisters and boys to connect deeply with the Holy Quran without anxiety.",
            gender = "Female",
            availableToday = true,
            availableSlots = listOf("11:00 AM", "03:30 PM", "06:30 PM", "08:30 PM")
        )
    )
}
