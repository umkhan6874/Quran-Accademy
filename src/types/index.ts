export type UserRole = 'student' | 'parent' | 'teacher';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  learningLevel: string;
  dailyGoalMinutes: number;
  streakDays: number;
  starsEarned: number;
  isKidsMode: boolean;
  preferredLanguage: string;
  quranFontSize: number;
  theme: 'light' | 'dark' | 'system';
  hasCompletedOnboarding: boolean;
  avatarSeed: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  qualification: string;
  ijazah: string;
  subjects: string[];
  languages: string[];
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  gender: 'male' | 'female';
  availableToday: boolean;
  availableSlots: string[];
}

export interface ClassBooking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentName: string;
  subject: string;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  homework: string;
  teacherNotes: string;
  isTrial: boolean;
  createdAt: string;
}

export interface Surah {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  translation: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  transliteration: string;
  translation: string;
  tafsir?: string;
}

export interface QaidaItem {
  symbol: string;
  name: string;
  transliteration: string;
  makhraj: string;
  sound: string;
}

export interface QaidaLesson {
  id: number;
  title: string;
  titleArabic: string;
  description: string;
  level: string;
  items: QaidaItem[];
}

export interface TajweedRule {
  id: string;
  title: string;
  titleArabic: string;
  category: string;
  explanation: string;
  examples: {
    arabic: string;
    highlight: string;
    transliteration: string;
    explanation: string;
  }[];
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabicText: string;
  timestamp: number;
}

export interface HifzProgress {
  surahNumber: number;
  surahName: string;
  currentRepeats: number;
  targetRepeats: number;
  status: 'new' | 'in_progress' | 'mastered';
}

export interface DuaItem {
  id: string;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ustadhi';
  text: string;
  arabicQuote?: string;
  timestamp: string;
}
