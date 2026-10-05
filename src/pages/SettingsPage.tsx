import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { User, Moon, Sun, ArrowLeft, ShieldCheck, Heart, Sparkles, Sliders, Globe } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface SettingsPageProps {
  onBack: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onBack,
  profile,
  onUpdateProfile,
  onResetData
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [fontSize, setFontSize] = useState(profile.quranFontSize);
  const [kidsMode, setKidsMode] = useState(profile.isKidsMode);
  const [language, setLanguage] = useState(profile.preferredLanguage);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      quranFontSize: fontSize,
      isKidsMode: kidsMode,
      preferredLanguage: language
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '780px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn-outline" style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Profile & Settings</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Manage persona role, accessibility font size, and preferences
            </p>
          </div>
        </div>

        {savedNotice && (
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--success)' }}>
            Settings Saved Successfully! ✅
          </span>
        )}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Profile Card */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Personal Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)', background: 'var(--surface)', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)', background: 'var(--surface)', fontSize: '14px' }}
              />
            </div>
          </div>
        </div>

        {/* Role Persona Switcher */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Active Persona / Role</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Switch roles to test the student learning journey, parent oversight portal, or teacher studio:
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(['student', 'parent', 'teacher'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onUpdateProfile({ role: r })}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: profile.role === r ? 700 : 500,
                  background: profile.role === r ? 'var(--primary)' : 'var(--surface-variant)',
                  color: profile.role === r ? '#FFFFFF' : 'var(--text-main)',
                  border: `1.5px solid ${profile.role === r ? 'var(--primary)' : 'var(--border)'}`,
                  textTransform: 'capitalize',
                  fontSize: '14px'
                }}
              >
                {r} Mode
              </button>
            ))}
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Learning & Accessibility</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Kids Mode */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Kids Mode Active</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Simplifies Tajweed rules with playful analogies, stars, and cheerful feedback.
                </div>
              </div>
              <input
                type="checkbox"
                checked={kidsMode}
                onChange={(e) => setKidsMode(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Quran Font Size */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Quran Arabic Text Size: {fontSize}px</span>
                <span className="arabic-text" style={{ fontSize: `${fontSize}px`, fontWeight: 800, color: 'var(--primary)' }}>
                  بِسْمِ اللَّهِ
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="42"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>

            {/* Language */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Interface Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)',
                  fontSize: '14px'
                }}
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu (اردو)</option>
                <option value="Arabic">Arabic (العربية)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Free Forever Pledge Notice */}
        <div className="card" style={{ background: 'var(--primary-container)', color: 'var(--on-primary-container)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={20} color="var(--primary)" />
            <h4 style={{ fontSize: '16px', fontWeight: 800 }}>100% Free Forever Waqf Pledge</h4>
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.6', opacity: 0.9 }}>
            Our platform operates under a continuous Islamic charity endowment (Sadaqah Jariyah). There will never be subscriptions, ads, or paid courses.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onResetData}
            className="btn-outline"
            style={{ color: 'var(--danger)', borderColor: 'var(--border)', fontSize: '13px' }}
          >
            Reset Demo Data
          </button>

          <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};
