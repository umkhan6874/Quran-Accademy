import React from 'react';
import { BookOpen, Sparkles, CheckCircle, Video, Award, Users, ShieldCheck, ArrowRight, Star, Heart, HelpCircle, MessageSquare } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';
import { UserRole } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onFindTeacher: () => void;
  onExploreQaida: () => void;
  onSwitchRole: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onFindTeacher,
  onExploreQaida,
  onSwitchRole
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #07382E 0%, #0D5C4D 60%, #167B67 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '60px 32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
            <FreeBadge />
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: '1.2',
            marginBottom: '18px',
            letterSpacing: '-0.5px'
          }}>
            Learn Quran — Anytime, Anywhere — 100% Free
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            color: 'var(--primary-container)',
            lineHeight: '1.6',
            marginBottom: '32px',
            maxWidth: '650px',
            margin: '0 auto 32px auto'
          }}>
            A world-class academy for children, beginners, and adults. Master Noorani Qaida, Tajweed rules, fluent recitation, and book free 1-on-1 sessions with verified Sheikhs & Ustadhs.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button
              onClick={onGetStarted}
              className="btn-gold"
              style={{ padding: '16px 32px', fontSize: '16px', borderRadius: 'var(--radius-md)' }}
            >
              <span>Get Started (Free Onboarding)</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={onFindTeacher}
              className="btn-outline"
              style={{
                padding: '16px 28px',
                fontSize: '16px',
                background: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                borderColor: 'rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <span>Find Verified Tutors</span>
            </button>
          </div>

          <div style={{
            marginTop: '36px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '13px',
            color: 'var(--gold-light)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} /> Zero Subscriptions
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} /> No In-App Ads
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} /> Qualified & Patient Tutors
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} /> Child & Beginner Friendly
            </span>
          </div>
        </div>
      </section>

      {/* Core Learning Tracks Grid */}
      <section>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px auto' }}>
          <h2 className="section-title" style={{ fontSize: '28px' }}>Complete Quranic Curriculum</h2>
          <p className="section-subtitle">Structured from first Arabic letter to fluent recitation with Tajweed</p>
        </div>

        <div className="grid-4">
          {[
            {
              title: 'Noorani Qaida',
              desc: 'Learn the 29 Arabic letters, articulation points (Makharij), Harakat, Sukoon, and Tashdeed with interactive audio.',
              icon: BookOpen,
              color: 'var(--primary)',
              action: onExploreQaida
            },
            {
              title: 'Quran Reader & Nazra',
              desc: 'Recite with beautiful Uthmani calligraphy, verse-by-verse repetition player, bookmarks, and authentic translations.',
              icon: Sparkles,
              color: 'var(--teal)',
              action: onGetStarted
            },
            {
              title: 'Tajweed Master',
              desc: 'Master rules of Noon Saakin (Izhar, Idgham, Iqlab, Ikhfa), Qalqalah echo, and melodious Ghunnah with clear examples.',
              icon: Award,
              color: 'var(--gold)',
              action: onGetStarted
            },
            {
              title: 'Live 1-on-1 Classes',
              desc: 'Simulated interactive virtual classroom with verified teachers, shared Mushaf whiteboard, and real-time guidance.',
              icon: Video,
              color: '#15803D',
              action: onFindTeacher
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="card"
                onClick={item.action}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--surface-variant)',
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
                  {item.desc}
                </p>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Explore Track <ArrowRight size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Role Experience Switcher */}
      <section className="card" style={{ background: 'var(--surface-variant)', border: 'none', padding: '36px 28px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>
            A Tailored Experience for Every Family Member
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Switch roles anytime in the navigation bar to preview student, parent guardian, or teacher studio views:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div
              className="card"
              onClick={() => { onSwitchRole('student'); onGetStarted(); }}
              style={{ cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: 'var(--primary)' }}>
                🎒 Student Portal
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Streaks, star badges, lesson progress, interactive Qaida letter grid, and practice flashcards.
              </p>
            </div>

            <div
              className="card"
              onClick={() => { onSwitchRole('parent'); onGetStarted(); }}
              style={{ cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: 'var(--teal)' }}>
                👨‍👩‍👧 Parent Guardian
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Track study hours, attendance records, teacher lesson remarks, and verify assigned homework.
              </p>
            </div>

            <div
              className="card"
              onClick={() => { onSwitchRole('teacher'); onGetStarted(); }}
              style={{ cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: 'var(--gold)' }}>
                🎓 Teacher Studio
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Manage teaching schedule, approve incoming trial requests, and assign homework tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="section-title">Loved by Thousands of Learners Worldwide</h2>
          <p className="section-subtitle">Real feedback from parents and students learning for the sake of Allah</p>
        </div>

        <div className="grid-3">
          {[
            {
              name: 'Dr. Tariq Al-Hashimi',
              role: 'Parent of two (Dallas, USA)',
              text: 'Finding a completely free platform with authentic Noorani Qaida articulation points and no intrusive ads was an answered dua for our family.'
            },
            {
              name: 'Sister Maryam Khan',
              role: 'Adult Beginner (Manchester, UK)',
              text: 'I was hesitant to start reading Arabic at 34, but the Qaida audio guide and kind teachers made me confident within two weeks!'
            },
            {
              name: 'Brother Zaid Siddiqui',
              role: 'Hifz Student (Toronto, Canada)',
              text: 'The Sabaq-Sabqi-Manzil repetition loop counter helped me memorize Juz Amma with solid retention. Truly world-class quality.'
            }
          ].map((t, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', gap: '3px', color: 'var(--gold)', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold)" />
                ))}
              </div>
              <p style={{ fontSize: '13px', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '16px', color: 'var(--text-main)' }}>
                "{t.text}"
              </p>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about our free Quran Academy</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            {
              q: 'Is it really 100% free? Are there any hidden fees or locks?',
              a: 'Yes, absolutely 100% free forever. There are zero subscriptions, paywalls, premium tiers, or ads. The platform is operated as an educational Waqf (Islamic continuous endowment) supported by international donors.'
            },
            {
              q: 'How are the Quran teachers vetted?',
              a: 'All instructors are experienced Quran educators proficient in Tajweed, Noorani Qaida pedagogy, and fluent recitation with structured, encouraging teaching methods for kids and beginners.'
            },
            {
              q: 'Can young children use this app independently?',
              a: 'Yes! The interface is specifically designed with large touch targets, child-friendly colors, audio pronunciations on every letter, and an encouraging star reward system.'
            },
            {
              q: 'What is the role of the AI Quran Tutor?',
              a: 'Ustadhi AI is an educational study tool to explain Tajweed rules, Arabic vocabulary, and phonetics. It is not an Islamic religious authority; for formal legal fatwas, users are always directed to qualified scholars.'
            }
          ].map((faq, i) => (
            <div key={i} className="card" style={{ padding: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px', color: 'var(--primary)' }}>
                {faq.q}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
