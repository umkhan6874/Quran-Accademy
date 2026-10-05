import { UserProfile, ClassBooking, Bookmark, HifzProgress } from '../types';

const KEYS = {
  USER_PROFILE: 'quran_academy_user_profile',
  BOOKINGS: 'quran_academy_bookings',
  BOOKMARKS: 'quran_academy_bookmarks',
  QAIDA_COMPLETED: 'quran_academy_qaida_completed',
  HIFZ_PROGRESS: 'quran_academy_hifz_progress',
  TASBEEH_COUNT: 'quran_academy_tasbeeh_count',
  AUTH_STATE: 'quran_academy_auth_state',
};

export const defaultProfile: UserProfile = {
  id: 'usr_default',
  name: 'Hamza Ali',
  email: 'hamza@example.com',
  role: 'student',
  learningLevel: 'Beginner (Noorani Qaida)',
  dailyGoalMinutes: 20,
  streakDays: 7,
  starsEarned: 145,
  isKidsMode: true,
  preferredLanguage: 'English',
  quranFontSize: 28,
  theme: 'light',
  hasCompletedOnboarding: true,
  avatarSeed: 'HA'
};

export const defaultBookings: ClassBooking[] = [
  {
    id: 'booking_1',
    teacherId: 't1',
    teacherName: 'Sheikh Ahmad Al-Masri',
    studentName: 'Hamza Ali',
    subject: 'Tajweed & Makharij Articulation',
    date: 'Today',
    timeSlot: '05:00 PM',
    durationMinutes: 30,
    status: 'upcoming',
    homework: 'Practice throat letters (Halqi) from Lesson 1.',
    teacherNotes: 'Great effort on articulation points today!',
    isTrial: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'booking_2',
    teacherId: 't2',
    teacherName: 'Ustadha Fatima Khan',
    studentName: 'Hamza Ali',
    subject: 'Noorani Qaida: Lesson 2',
    date: 'Yesterday',
    timeSlot: '04:30 PM',
    durationMinutes: 30,
    status: 'completed',
    homework: 'Review Kasra and Damma with audio examples.',
    teacherNotes: 'Masha\'Allah, recognized letters Alif through Jeem with perfect clarity.',
    isTrial: false,
    createdAt: new Date().toISOString()
  }
];

export const defaultBookmarks: Bookmark[] = [
  {
    id: 'bm_1',
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    ayahNumber: 5,
    arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    timestamp: Date.now()
  }
];

export const defaultHifz: HifzProgress[] = [
  {
    surahNumber: 112,
    surahName: 'Al-Ikhlas',
    currentRepeats: 8,
    targetRepeats: 10,
    status: 'in_progress'
  },
  {
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    currentRepeats: 10,
    targetRepeats: 10,
    status: 'mastered'
  }
];

// Helper functions for safe local persistence
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Error reading key ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing key ${key} to localStorage:`, e);
  }
}

export const StorageService = {
  getProfile(): UserProfile {
    return safeGet<UserProfile>(KEYS.USER_PROFILE, defaultProfile);
  },
  saveProfile(profile: UserProfile): void {
    safeSet(KEYS.USER_PROFILE, profile);
  },

  getBookings(): ClassBooking[] {
    return safeGet<ClassBooking[]>(KEYS.BOOKINGS, defaultBookings);
  },
  saveBookings(bookings: ClassBooking[]): void {
    safeSet(KEYS.BOOKINGS, bookings);
  },
  addBooking(booking: ClassBooking): ClassBooking[] {
    const current = this.getBookings();
    const updated = [booking, ...current];
    this.saveBookings(updated);
    return updated;
  },
  cancelBooking(id: string): ClassBooking[] {
    const current = this.getBookings();
    const updated = current.filter(b => b.id !== id);
    this.saveBookings(updated);
    return updated;
  },
  completeBooking(id: string): ClassBooking[] {
    const current = this.getBookings();
    const updated = current.map(b => b.id === id ? { ...b, status: 'completed' as const } : b);
    this.saveBookings(updated);
    return updated;
  },

  getBookmarks(): Bookmark[] {
    return safeGet<Bookmark[]>(KEYS.BOOKMARKS, defaultBookmarks);
  },
  toggleBookmark(bookmark: Omit<Bookmark, 'id' | 'timestamp'>): Bookmark[] {
    const current = this.getBookmarks();
    const existing = current.find(b => b.surahNumber === bookmark.surahNumber && b.ayahNumber === bookmark.ayahNumber);
    let updated: Bookmark[];
    if (existing) {
      updated = current.filter(b => b.id !== existing.id);
    } else {
      updated = [{ ...bookmark, id: `bm_${Date.now()}`, timestamp: Date.now() }, ...current];
    }
    safeSet(KEYS.BOOKMARKS, updated);
    return updated;
  },

  getCompletedLessons(): number[] {
    return safeGet<number[]>(KEYS.QAIDA_COMPLETED, [1]);
  },
  markLessonCompleted(lessonId: number): number[] {
    const current = this.getCompletedLessons();
    if (!current.includes(lessonId)) {
      const updated = [...current, lessonId];
      safeSet(KEYS.QAIDA_COMPLETED, updated);
      return updated;
    }
    return current;
  },

  getHifzProgress(): HifzProgress[] {
    return safeGet<HifzProgress[]>(KEYS.HIFZ_PROGRESS, defaultHifz);
  },
  incrementHifzRepeat(surahNumber: number): HifzProgress[] {
    const current = this.getHifzProgress();
    const updated = current.map(item => {
      if (item.surahNumber === surahNumber) {
        const nextCount = item.currentRepeats + 1;
        return {
          ...item,
          currentRepeats: nextCount,
          status: nextCount >= item.targetRepeats ? ('mastered' as const) : ('in_progress' as const)
        };
      }
      return item;
    });
    safeSet(KEYS.HIFZ_PROGRESS, updated);
    return updated;
  },

  getTasbeehCount(): number {
    return safeGet<number>(KEYS.TASBEEH_COUNT, 0);
  },
  saveTasbeehCount(count: number): void {
    safeSet(KEYS.TASBEEH_COUNT, count);
  },

  getAuthState(): { isLoggedIn: boolean; email: string } {
    return safeGet(KEYS.AUTH_STATE, { isLoggedIn: true, email: 'hamza@example.com' });
  },
  saveAuthState(state: { isLoggedIn: boolean; email: string }): void {
    safeSet(KEYS.AUTH_STATE, state);
  }
};
