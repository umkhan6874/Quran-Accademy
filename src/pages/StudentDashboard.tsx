import React from 'react';
import { UserProfile, ClassBooking } from '../types';
import { BookOpen, Sparkles, Award, Video, Calendar, LayoutGrid, Clock, Flame, Star, Target, ArrowRight, Quote } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';
import { hadithsData } from '../data/quranData';

interface StudentDashboardProps {
  profile: UserProfile;
  bookings: ClassBooking[];
  onNavigate: (route: string) => void;
  onJoinClassroom: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  bookings,
  onNavigate,
  onJoinClassroom
}) => {
  const nextClass = bookings.find(b => b.status === 'upcoming');
  const todayHadith = hadithsData[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Greeting & Streak Stats */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-variant) 100%)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Assalamu Alaikum,</span>
            <span style={{ fontSize: '16px' }}>✨</span>
            <FreeBadge />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
            {profile.name}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Track: <strong style={{ color: 'var(--primary)' }}>{profile.learningLevel}</strong>
          </p>
        </div>

        {/* Badges / Stats Pills */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ color: 'var(--warning)', background: '#FFF3E0', padding: '6px', borderRadius: '50%' }}>
              <Flame size={18} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>{profile.streakDays} Days</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Daily Streak</div>
            </div>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ color: 'var(--gold)', background: 'var(--gold-container)', padding: '6px', borderRadius: '50%' }}>
              <Star size={18} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>{profile.starsEarned} Stars</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Points Earned</div>
            </div>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ color: 'var(--primary)', background: 'var(--primary-container)', padding: '6px', borderRadius: '50%' }}>
              <Target size={18} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>{profile.dailyGoalMinutes} mins</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Today's Goal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Upcoming Live Class Alert Card */}
      <div style={{
        background: 'linear-gradient(135deg, #07382E 0%, #0D5C4D 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '580px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981'
            }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', color: 'var(--gold-light)' }}>
              NEXT 1-ON-1 LIVE CLASS
            </span>
            <FreeBadge />
          </div>

          {nextClass ? (
            <>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>
                {nextClass.subject}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--primary-container)' }}>
                With <strong>{nextClass.teacherName}</strong> • {nextClass.date} at {nextClass.timeSlot} (30 mins)
              </p>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                No Session Scheduled Today
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--primary-container)' }}>
                Book a free 1-on-1 trial class with an experienced Quran instructor.
              </p>
            </>
          )}
        </div>

        <div>
          {nextClass ? (
            <button
              onClick={onJoinClassroom}
              className="btn-gold"
              style={{ padding: '14px 24px', fontSize: '15px' }}
            >
              <Video size={18} />
              <span>Enter Live Classroom</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('teachers')}
              className="btn-gold"
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              <span>Book Free Session</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Quran Learning Areas Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 className="section-title">Quran Learning Areas</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Select an interactive curriculum module</p>
          </div>
        </div>

        <div className="grid-4">
          {[
            { title: 'Noorani Qaida', desc: 'Alphabet, Harakat & Makharij', icon: BookOpen, color: 'var(--primary)', route: 'qaida' },
            { title: 'Quran Reader', desc: 'Surahs, Audio & Tafsir', icon: Sparkles, color: 'var(--teal)', route: 'quran' },
            { title: 'Tajweed Rules', desc: 'Noon Saakin & Qalqalah', icon: Award, color: 'var(--gold)', route: 'tajweed' },
            { title: 'Hifz Tracker', desc: 'Repetition Loop Counter', icon: Target, color: '#15803D', route: 'hifz' },
            { title: 'Find Teacher', desc: '100% Free 1-on-1 Tutors', icon: Video, color: '#0284C7', route: 'teachers' },
            { title: 'AI Quran Tutor', desc: 'Tajweed Q&A & Pronunciation', icon: Sparkles, color: '#9333EA', route: 'ai_tutor' },
            { title: 'Islamic Tools', desc: 'Tasbeeh, Azkar & Prayer Times', icon: LayoutGrid, color: '#D97706', route: 'tools' },
            { title: 'My Classes', desc: 'Schedule, Notes & Homework', icon: Calendar, color: '#475569', route: 'classes' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="card"
                onClick={() => onNavigate(item.route)}
                style={{ cursor: 'pointer', padding: '20px' }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--surface-variant)',
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Recent Lesson Card */}
      <div
        className="card"
        onClick={() => onNavigate('qaida')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderLeft: '5px solid var(--primary)'
        }}
      >
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary-container)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: 800
        }}>
          ح
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px' }}>
            CONTINUE RECENT LESSON
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700 }}>Lesson 1: Arabic Letters (Makharij)</div>
          <div style={{ marginTop: '6px', width: '100%', maxWidth: '300px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '65%', height: '100%', background: 'var(--primary)' }} />
          </div>
        </div>
        <button className="btn-secondary" style={{ padding: '8px 16px' }}>
          <span>Resume</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Daily Hadith Banner */}
      <div className="card" style={{
        background: 'var(--gold-container)',
        border: '1px solid #F5E5C9',
        color: 'var(--on-gold-container)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Quote size={20} color="var(--gold)" />
          <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px' }}>HADITH OF THE DAY</span>
        </div>
        <p className="arabic-text" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
          {todayHadith.arabic}
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.5', fontStyle: 'italic', marginBottom: '6px' }}>
          "{todayHadith.translation}"
        </p>
        <div style={{ fontSize: '12px', color: 'var(--gold-hover)', fontWeight: 600 }}>
          — {todayHadith.reference}
        </div>
      </div>
    </div>
  );
};
