import React from 'react';
import { BookOpen, Heart, ShieldCheck, Sparkles, Globe, Mail } from 'lucide-react';
import { FreeBadge } from './FreeBadge';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '48px 20px 80px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '32px'
      }}>
        {/* Brand Col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <BookOpen size={18} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>
              Quran Academy
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '14px' }}>
            A global non-profit educational platform dedicated to making Quranic learning, Noorani Qaida, Tajweed, and 1-on-1 tutoring accessible to every child, adult, and family worldwide.
          </p>
          <FreeBadge />
        </div>

        {/* Learning Tracks */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Learning Areas</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <li><button onClick={() => onNavigate('qaida')} style={{ color: 'inherit' }}>Noorani Qaida for Beginners</button></li>
            <li><button onClick={() => onNavigate('quran')} style={{ color: 'inherit' }}>Quran Reader & Recitation</button></li>
            <li><button onClick={() => onNavigate('tajweed')} style={{ color: 'inherit' }}>Tajweed Rules with Audio</button></li>
            <li><button onClick={() => onNavigate('hifz')} style={{ color: 'inherit' }}>Hifz Memorization Tracker</button></li>
            <li><button onClick={() => onNavigate('teachers')} style={{ color: 'inherit' }}>Book 1-on-1 Free Trial</button></li>
          </ul>
        </div>

        {/* Resources & Tools */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Tools & Community</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <li><button onClick={() => onNavigate('classroom')} style={{ color: 'inherit' }}>Virtual Live Classroom</button></li>
            <li><button onClick={() => onNavigate('ai_tutor')} style={{ color: 'inherit' }}>Ustadhi AI Quran Tutor</button></li>
            <li><button onClick={() => onNavigate('tools')} style={{ color: 'inherit' }}>Digital Tasbeeh & Prayer Times</button></li>
            <li><button onClick={() => onNavigate('parent')} style={{ color: 'inherit' }}>Parent Guardian Portal</button></li>
            <li><button onClick={() => onNavigate('teacher')} style={{ color: 'inherit' }}>Teacher Instructor Studio</button></li>
          </ul>
        </div>

        {/* Waqf Trust Guarantee */}
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Waqf Charity Pledge</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px' }}>
            This platform operates under a continuous charity endowment (Sadaqah Jariyah). There will never be subscriptions, paywalls, or advertisements.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
            <ShieldCheck size={16} />
            <span>Verified Traditional Curriculums</span>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '36px auto 0 auto',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <span>© {new Date().getFullYear()} Quran Tutor Academy. Dedicated for the sake of Allah.</span>
        <span>SEO & Accessibility Ready • Mobile & Desktop Responsive</span>
      </div>
    </footer>
  );
};
