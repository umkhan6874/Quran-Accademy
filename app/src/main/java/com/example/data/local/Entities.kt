package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_profile")
data class UserProfileEntity(
    @PrimaryKey val id: String = "primary_user",
    val name: String = "Hamza Ali",
    val email: String = "hamza@example.com",
    val role: String = "STUDENT",
    val learningLevel: String = "Beginner (Noorani Qaida)",
    val dailyGoalMinutes: Int = 20,
    val streakDays: Int = 7,
    val starsEarned: Int = 145,
    val isKidsMode: Boolean = true,
    val preferredLanguage: String = "English",
    val quranFontSizeSp: Int = 26,
    val hasCompletedOnboarding: Boolean = true
)

@Entity(tableName = "class_bookings")
data class ClassBookingEntity(
    @PrimaryKey val id: String,
    val teacherId: String,
    val teacherName: String,
    val studentName: String,
    val subject: String,
    val date: String,
    val timeSlot: String,
    val durationMinutes: Int = 30,
    val status: String = "UPCOMING",
    val homework: String = "Practice Lesson 4 Harakat with audio examples.",
    val teacherNotes: String = "Masha'Allah, great progress on Al-Halq letters!",
    val isTrial: Boolean = true
)

@Entity(tableName = "quran_bookmarks")
data class QuranBookmarkEntity(
    @PrimaryKey val id: String,
    val surahNumber: Int,
    val surahName: String,
    val ayahNumber: Int,
    val ayahArabic: String,
    val timestamp: Long = System.currentTimeMillis()
)

@Entity(tableName = "qaida_progress")
data class QaidaProgressEntity(
    @PrimaryKey val lessonId: Int,
    val isCompleted: Boolean,
    val practiceScore: Int,
    val lastAccessed: Long
)

@Entity(tableName = "hifz_progress")
data class HifzProgressEntity(
    @PrimaryKey val id: String,
    val surahNumber: Int,
    val surahName: String,
    val startAyah: Int,
    val endAyah: Int,
    val currentRepeats: Int,
    val targetRepeats: Int,
    val status: String
)
