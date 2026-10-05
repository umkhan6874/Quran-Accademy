package com.example.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    @Query("SELECT * FROM user_profile WHERE id = :id LIMIT 1")
    fun getUserProfile(id: String = "primary_user"): Flow<UserProfileEntity?>

    @Query("SELECT * FROM user_profile WHERE id = :id LIMIT 1")
    suspend fun getUserProfileOnce(id: String = "primary_user"): UserProfileEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdateProfile(profile: UserProfileEntity)
}

@Dao
interface BookingDao {
    @Query("SELECT * FROM class_bookings ORDER BY date ASC, timeSlot ASC")
    fun getAllBookings(): Flow<List<ClassBookingEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBooking(booking: ClassBookingEntity)

    @Update
    suspend fun updateBooking(booking: ClassBookingEntity)

    @Query("UPDATE class_bookings SET status = :status WHERE id = :id")
    suspend fun updateBookingStatus(id: String, status: String)

    @Query("DELETE FROM class_bookings WHERE id = :id")
    suspend fun deleteBooking(id: String)
}

@Dao
interface BookmarkDao {
    @Query("SELECT * FROM quran_bookmarks ORDER BY timestamp DESC")
    fun getAllBookmarks(): Flow<List<QuranBookmarkEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun addBookmark(bookmark: QuranBookmarkEntity)

    @Query("DELETE FROM quran_bookmarks WHERE surahNumber = :surah AND ayahNumber = :ayah")
    suspend fun removeBookmark(surah: Int, ayah: Int)

    @Query("SELECT EXISTS(SELECT 1 FROM quran_bookmarks WHERE surahNumber = :surah AND ayahNumber = :ayah)")
    fun isBookmarked(surah: Int, ayah: Int): Flow<Boolean>
}

@Dao
interface ProgressDao {
    @Query("SELECT * FROM qaida_progress")
    fun getAllQaidaProgress(): Flow<List<QaidaProgressEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun setQaidaProgress(progress: QaidaProgressEntity)

    @Query("SELECT * FROM hifz_progress")
    fun getAllHifzProgress(): Flow<List<HifzProgressEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun setHifzProgress(hifz: HifzProgressEntity)
}
