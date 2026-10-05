import React from 'react';
import { Home, BookOpen, BookText, Calendar, LayoutGrid } from 'lucide-react';
import { UserProfile } from '../types';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  profile: UserProfile;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate, profile }) => {
  const getHomeRoute = () => {
    switch (profile.role) {
      case 'parent': return 'parent';
      case 'teacher': return 'teacher';
      default: return 'student';
    }
  };

  const navItems = [
    { route: getHomeRoute(), label: 'Home', icon: Home, matchRoutes: ['home', 'student', 'parent', 'teacher', 'landing'] },
    { route: 'qaida', label: 'Learn', icon: BookOpen, matchRoutes: ['qaida', 'tajweed', 'courses'] },
    { route: 'quran', label: 'Quran', icon: BookText, matchRoutes: ['quran', 'hifz'] },
    { route: 'classes', label: 'Classes', icon: Calendar, matchRoutes: ['classes', 'teachers', 'classroom'] },
    { route: 'tools', label: 'Tools', icon: LayoutGrid, matchRoutes: ['tools', 'ai_tutor', 'settings'] }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.matchRoutes.includes(currentRoute);
        return (
          <button
            key={item.label}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.route)}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
