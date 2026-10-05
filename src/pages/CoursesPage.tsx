import React from 'react';
import { BookOpen, Sparkles, Award, Target, BookText, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface CoursesPageProps {
  onBack: () => void;
  onNavigate: (route: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onBack, onNavigate }) => {
  const courses = [
    {
      title: 'Noorani Qaida for Beginners',
      level: 'Beginner',
      duration: '4-6 Weeks',
      desc: 'Foundational Arabic phonetics, alphabet recognition, vowels (Harakat), Tanween, Sukoon, and Shaddah with audio feedback.',
      icon: BookOpen,
      route: 'qaida',
      color: 'var(--primary)'
    },
    {
      title: 'Nazra Quran Reading',
      level: 'Elementary',
      duration: 'Ongoing',
      desc: 'Fluent recitation directly from the holy Mushaf with Ayah repetition loops and bookmarking.',
      icon: BookText,
      route: 'quran',
      color: 'var(--teal)'
    },
    {
      title: 'Tajweed Rules Master',
      level: 'Intermediate',
      duration: '8 Weeks',
      desc: 'Noon Saakin & Tanween rules (Izhar, Idgham, Iqlab, Ikhfa), Qalqalah, Ghunnah, and Madd rules with Quran examples.',
      icon: Award,
      route: 'tajweed',
      color: 'var(--gold)'
    },
    {
      title: 'Hifz Memorization Track',
      level: 'Intermediate / Advanced',
      duration: 'Self-Paced',
      desc: 'Systematic memorization retention using the traditional 3-pillar method (Sabaq, Sabqi, Manzil) with repetition counter.',
      icon: Target,
      route: 'hifz',
      color: '#15803D'
    },
    {
      title: 'Quranic Vocabulary & Translation',
      level: 'All Levels',
      duration: '10 Weeks',
      desc: 'Understand 85% of the most frequently occurring words in the Holy Quran to connect deeply during prayer.',
      icon: Globe,
      route: 'quran',
      color: '#0284C7'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn-outline" style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Complete Course Catalog</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              100% Free Structured Curriculums for All Ages
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {courses.map((course, idx) => {
          const Icon = course.icon;
          return (
            <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', maxWidth: '750px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'var(--surface-variant)',
                  color: course.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={26} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>{course.title}</h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'var(--primary-container)',
                      color: 'var(--on-primary-container)'
                    }}>
                      {course.level}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {course.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate(course.route)}
                className="btn-primary"
                style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}
              >
                <span>Start Course</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
