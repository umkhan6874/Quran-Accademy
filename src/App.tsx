import React, { useState, useEffect } from 'react';
import { StorageService, defaultProfile } from './storage/localStorage';
import { UserProfile, UserRole, ClassBooking, Bookmark, Teacher, HifzProgress } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { NooraniQaidaPage } from './pages/NooraniQaidaPage';
import { QuranReaderPage } from './pages/QuranReaderPage';
import { TajweedPage } from './pages/TajweedPage';
import { HifzPage } from './pages/HifzPage';
import { TeachersPage } from './pages/TeachersPage';
import { ClassesPage } from './pages/ClassesPage';
import { AiTutorPage } from './pages/AiTutorPage';
import { ToolsPage } from './pages/ToolsPage';
import { ParentDashboard } from './pages/ParentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { CoursesPage } from './pages/CoursesPage';
import { SettingsPage } from './pages/SettingsPage';
import { OnboardingModal } from './features/onboarding/OnboardingModal';
import { AuthModal } from './features/auth/AuthModal';
import { BookingModal } from './features/booking/BookingModal';
import { LiveClassroomModal } from './features/classroom/LiveClassroomModal';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [bookings, setBookings] = useState<ClassBooking[]>(() => StorageService.getBookings());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => StorageService.getBookmarks());
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => StorageService.getCompletedLessons());
  const [hifzProgress, setHifzProgress] = useState<HifzProgress[]>(() => StorageService.getHifzProgress());
  const [tasbeehCount, setTasbeehCount] = useState<number>(() => StorageService.getTasbeehCount());

  // Routing
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [routeHistory, setRouteHistory] = useState<string[]>(['landing']);

  // Modals
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [bookingTeacher, setBookingTeacher] = useState<Teacher | null>(null);
  const [classroomOpen, setClassroomOpen] = useState(false);
  const [activeClassroomBooking, setActiveClassroomBooking] = useState<ClassBooking | null>(null);

  // Sync theme & language direction
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', profile.theme);
    if (profile.preferredLanguage === 'Arabic' || profile.preferredLanguage === 'Urdu') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [profile.theme, profile.preferredLanguage]);

  const navigateTo = (route: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRouteHistory(prev => [...prev, route]);
    setCurrentRoute(route);
  };

  const handleBack = () => {
    if (routeHistory.length > 1) {
      const nextHistory = routeHistory.slice(0, -1);
      setRouteHistory(nextHistory);
      setCurrentRoute(nextHistory[nextHistory.length - 1]);
    } else {
      const home = profile.role === 'parent' ? 'parent' : profile.role === 'teacher' ? 'teacher' : 'student';
      setCurrentRoute(home);
    }
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    const next = { ...profile, ...updated };
    setProfile(next);
    StorageService.saveProfile(next);
  };

  const handleSwitchRole = (role: UserRole) => {
    updateProfile({ role });
    if (role === 'parent') navigateTo('parent');
    else if (role === 'teacher') navigateTo('teacher');
    else navigateTo('student');
  };

  const handleToggleTheme = () => {
    const nextTheme = profile.theme === 'dark' ? 'light' : 'dark';
    updateProfile({ theme: nextTheme });
  };

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    updateProfile(data);
    confetti({ particleCount: 100, spread: 70 });
    const target = data.role === 'parent' ? 'parent' : data.role === 'teacher' ? 'teacher' : 'student';
    navigateTo(target);
  };

  const handleAuthSuccess = (name: string, email: string) => {
    updateProfile({ name, email });
    const target = profile.role === 'parent' ? 'parent' : profile.role === 'teacher' ? 'teacher' : 'student';
    navigateTo(target);
  };

  const handleLessonComplete = (lessonId: number) => {
    const updated = StorageService.markLessonCompleted(lessonId);
    setCompletedLessons(updated);
    updateProfile({ starsEarned: profile.starsEarned + 15 });
  };

  const handleToggleBookmark = (bm: Omit<Bookmark, 'id' | 'timestamp'>) => {
    const updated = StorageService.toggleBookmark(bm);
    setBookmarks(updated);
  };

  const handleConfirmBooking = (booking: ClassBooking) => {
    const updated = StorageService.addBooking(booking);
    setBookings(updated);
    navigateTo('classes');
  };

  const handleCancelBooking = (id: string) => {
    const updated = StorageService.cancelBooking(id);
    setBookings(updated);
  };

  const handleJoinClassroom = (booking?: ClassBooking) => {
    setActiveClassroomBooking(booking || bookings.find(b => b.status === 'upcoming') || null);
    setClassroomOpen(true);
  };

  const handleCompleteClassroom = () => {
    if (activeClassroomBooking) {
      const updated = StorageService.completeBooking(activeClassroomBooking.id);
      setBookings(updated);
    }
    updateProfile({ starsEarned: profile.starsEarned + 25 });
  };

  const handleIncrementHifzRepeat = (surahNumber: number) => {
    const updated = StorageService.incrementHifzRepeat(surahNumber);
    setHifzProgress(updated);
  };

  const handleResetHifzRepeat = (surahNumber: number) => {
    const updated = StorageService.resetHifzRepeat(surahNumber);
    setHifzProgress(updated);
  };

  const handleSetHifzTarget = (surahNumber: number, target: number) => {
    const updated = StorageService.setHifzTarget(surahNumber, target);
    setHifzProgress(updated);
  };

  const handleUpdateTasbeeh = (count: number) => {
    setTasbeehCount(count);
    StorageService.saveTasbeehCount(count);
  };

  const handleResetData = () => {
    localStorage.clear();
    setProfile(defaultProfile);
    setBookings(StorageService.getBookings());
    setBookmarks(StorageService.getBookmarks());
    setCompletedLessons(StorageService.getCompletedLessons());
    setHifzProgress(StorageService.getHifzProgress());
    setTasbeehCount(0);
    navigateTo('landing');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        profile={profile}
        onSwitchRole={handleSwitchRole}
        onToggleTheme={handleToggleTheme}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Main View Area */}
      <main className="main-content">
        {currentRoute === 'landing' && (
          <LandingPage
            onGetStarted={() => setOnboardingOpen(true)}
            onFindTeacher={() => navigateTo('teachers')}
            onExploreQaida={() => navigateTo('qaida')}
            onSwitchRole={handleSwitchRole}
          />
        )}

        {(currentRoute === 'student' || currentRoute === 'home') && (
          <StudentDashboard
            profile={profile}
            bookings={bookings}
            onNavigate={navigateTo}
            onJoinClassroom={() => handleJoinClassroom()}
          />
        )}

        {currentRoute === 'qaida' && (
          <NooraniQaidaPage
            onBack={handleBack}
            onLessonComplete={handleLessonComplete}
            completedLessons={completedLessons}
          />
        )}

        {currentRoute === 'quran' && (
          <QuranReaderPage
            onBack={handleBack}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            quranFontSize={profile.quranFontSize}
            onUpdateFontSize={(size) => updateProfile({ quranFontSize: size })}
          />
        )}

        {currentRoute === 'tajweed' && (
          <TajweedPage onBack={handleBack} />
        )}

        {currentRoute === 'hifz' && (
          <HifzPage
            onBack={handleBack}
            hifzProgress={hifzProgress}
            onIncrementRepeat={handleIncrementHifzRepeat}
            onResetRepeat={handleResetHifzRepeat}
            onSetTarget={handleSetHifzTarget}
          />
        )}

        {currentRoute === 'teachers' && (
          <TeachersPage
            onBack={handleBack}
            onSelectTeacherForBooking={(teacher) => setBookingTeacher(teacher)}
          />
        )}

        {currentRoute === 'classes' && (
          <ClassesPage
            onBack={handleBack}
            bookings={bookings}
            onJoinClassroom={(booking) => handleJoinClassroom(booking)}
            onCancelBooking={handleCancelBooking}
            onFindNewTeacher={() => navigateTo('teachers')}
          />
        )}

        {currentRoute === 'ai_tutor' && (
          <AiTutorPage
            onBack={handleBack}
            isKidsMode={profile.isKidsMode}
            onToggleKidsMode={() => updateProfile({ isKidsMode: !profile.isKidsMode })}
          />
        )}

        {currentRoute === 'tools' && (
          <ToolsPage
            onBack={handleBack}
            tasbeehCount={tasbeehCount}
            onUpdateTasbeehCount={handleUpdateTasbeeh}
          />
        )}

        {currentRoute === 'parent' && (
          <ParentDashboard
            onBack={handleBack}
            bookings={bookings}
            onBookClass={() => navigateTo('teachers')}
          />
        )}

        {currentRoute === 'teacher' && (
          <TeacherDashboard
            onBack={handleBack}
            bookings={bookings}
            onEnterClassroom={() => handleJoinClassroom()}
            onAddBooking={handleConfirmBooking}
          />
        )}

        {currentRoute === 'courses' && (
          <CoursesPage
            onBack={handleBack}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'settings' && (
          <SettingsPage
            onBack={handleBack}
            profile={profile}
            onUpdateProfile={updateProfile}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        profile={profile}
      />

      {/* Modals */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <BookingModal
        isOpen={bookingTeacher !== null}
        onClose={() => setBookingTeacher(null)}
        teacher={bookingTeacher}
        onConfirmBooking={handleConfirmBooking}
        studentName={profile.name}
      />

      <LiveClassroomModal
        isOpen={classroomOpen}
        onClose={() => setClassroomOpen(false)}
        onCompleteClass={handleCompleteClassroom}
        teacherName={activeClassroomBooking?.teacherName || 'Sheikh Ahmad Al-Masri'}
        studentName={profile.name}
      />
    </div>
  );
};
