package com.example.data.model

enum class UserRole {
    STUDENT,
    PARENT,
    TEACHER
}

data class UserProfile(
    val id: String = "user_1",
    val name: String = "Hamza Ali",
    val email: String = "hamza@example.com",
    val role: UserRole = UserRole.STUDENT,
    val learningLevel: String = "Beginner (Noorani Qaida)",
    val dailyGoalMinutes: Int = 20,
    val streakDays: Int = 7,
    val starsEarned: Int = 145,
    val isKidsMode: Boolean = true,
    val preferredLanguage: String = "English",
    val quranFontSizeSp: Int = 26,
    val hasCompletedOnboarding: Boolean = true
)

data class Teacher(
    val id: String,
    val name: String,
    val title: String,
    val qualification: String,
    val ijazah: String,
    val subjects: List<String>,
    val languages: List<String>,
    val experienceYears: Int,
    val rating: Float,
    val reviewsCount: Int,
    val bio: String,
    val isVerified: Boolean = true,
    val gender: String = "Male",
    val availableToday: Boolean = true,
    val availableSlots: List<String> = listOf("10:00 AM", "02:00 PM", "05:00 PM", "07:30 PM")
)

data class ClassSession(
    val id: String,
    val teacherId: String,
    val teacherName: String,
    val studentName: String,
    val subject: String,
    val date: String,
    val timeSlot: String,
    val durationMinutes: Int = 30,
    val status: String = "UPCOMING", // UPCOMING, COMPLETED, CANCELLED
    val homework: String = "Read Lesson 4 Harakat and practice Kasra with teacher feedback.",
    val teacherNotes: String = "Excellent pronunciation on Makharij of Al-Halq today. Keep up the good work!",
    val isTrial: Boolean = true
)

data class Surah(
    val number: Int,
    val nameArabic: String,
    val nameEnglish: String,
    val translation: String,
    val versesCount: Int,
    val revelationType: String // Meccan, Medinan
)

data class Ayah(
    val surahNumber: Int,
    val ayahNumber: Int,
    val arabicText: String,
    val transliteration: String,
    val translation: String,
    val tafsir: String = ""
)

data class QaidaItem(
    val symbol: String,
    val name: String,
    val transliteration: String,
    val makhrajDescription: String,
    val soundSample: String
)

data class QaidaLesson(
    val id: Int,
    val title: String,
    val titleArabic: String,
    val description: String,
    val level: String,
    val isCompleted: Boolean = false,
    val items: List<QaidaItem>
)

data class TajweedRule(
    val id: String,
    val title: String,
    val titleArabic: String,
    val category: String, // Noon Saakin, Meem Saakin, Qalqalah, Madd, Heavy Letters
    val explanation: String,
    val examples: List<TajweedExample>
)

data class TajweedExample(
    val arabic: String,
    val highlightedPart: String,
    val transliteration: String,
    val explanation: String
)

data class HifzItem(
    val id: String,
    val surahNumber: Int,
    val surahName: String,
    val startAyah: Int,
    val endAyah: Int,
    val currentRepeats: Int,
    val targetRepeats: Int = 10,
    val status: String = "IN_PROGRESS" // NEW, IN_PROGRESS, MASTERED
)

data class DuaItem(
    val id: String,
    val title: String,
    val category: String,
    val arabic: String,
    val transliteration: String,
    val translation: String,
    val benefit: String
)

data class Achievement(
    val id: String,
    val title: String,
    val description: String,
    val iconEmoji: String,
    val isUnlocked: Boolean,
    val dateUnlocked: String = ""
)
