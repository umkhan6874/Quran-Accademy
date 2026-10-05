import React, { useState } from 'react';
import { BookOpen, Moon, Sun, User, Menu, X, Sparkles, School, Users, Shield } from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { FreeBadge } from './FreeBadge';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  profile: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  onToggleTheme: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  profile,
  onSwitchRole,
  onToggleTheme,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { route: 'home', label: 'Home' },
    { route: 'qaida', label: 'Noorani Qaida' },
    { route: 'quran', label: 'Quran Reader' },
    { route: 'tajweed', label: 'Tajweed' },
    { route: 'teachers', label: 'Find Teacher' },
    { route: 'classroom', label: 'Live Class' },
    { route: 'ai_tutor', label: 'AI Tutor' },
    { route: 'tools', label: 'Tools' }
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 800,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Brand */}
        <div
          onClick={() => handleNav('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.3px' }}>
                Quran Academy
              </span>
              <FreeBadge />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              100% Free World-Class Learning
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '6px'
        }} className="desktop-nav">
          <style>{`
            @media (min-width: 900px) {
              .desktop-nav { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  background: isActive ? 'var(--primary-container)' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Role Switcher Pill */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--surface-variant)',
            borderRadius: 'var(--radius-full)',
            padding: '3px',
            border: '1px solid var(--border)'
          }}>
            {(['student', 'parent', 'teacher'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => onSwitchRole(role)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: profile.role === role ? 700 : 500,
                  background: profile.role === role ? 'var(--primary)' : 'transparent',
                  color: profile.role === role ? '#FFFFFF' : 'var(--text-muted)',
                  textTransform: 'capitalize'
                }}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: 'var(--text-muted)',
              background: 'var(--surface-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {profile.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User profile / login */}
          <button
            onClick={onOpenAuth}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-container)',
              color: 'var(--on-primary-container)',
              fontWeight: 600,
              fontSize: '13px'
            }}
          >
            <User size={16} />
            <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {profile.name.split(' ')[0]}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '8px',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {navLinks.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNav(item.route)}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '15px',
                fontWeight: currentRoute === item.route ? 700 : 500,
                color: currentRoute === item.route ? 'var(--primary)' : 'var(--text-main)',
                background: currentRoute === item.route ? 'var(--primary-container)' : 'transparent'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
