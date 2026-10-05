import React, { useState } from 'react';
import { Modal } from '../../components/Modal';
import { UserRole, UserProfile } from '../../types';
import { School, Users, Shield, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { FreeBadge } from '../../components/FreeBadge';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profileData: Partial<UserProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>('student');
  const [goalTrack, setGoalTrack] = useState('Noorani Qaida');
  const [level, setLevel] = useState('Beginner (Fresh learner)');
  const [dailyMinutes, setDailyMinutes] = useState(20);

  const handleFinish = () => {
    onComplete({
      role,
      learningLevel: `${goalTrack} • ${level}`,
      dailyGoalMinutes: dailyMinutes,
      hasCompletedOnboarding: true
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Welcome to Quran Academy (Step ${step} of 4)`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Progress bar */}
        <div style={{ width: '100%', height: '6px', background: 'var(--primary-container)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }} />
        </div>

        {step === 1 && (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Who is joining today?</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Select your role to personalize the curriculum and portal tools:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { r: 'student', title: 'Student (Child or Adult)', desc: 'I want to learn Noorani Qaida, Tajweed, or memorize the Quran.', icon: School },
                { r: 'parent', title: 'Parent / Guardian', desc: 'I want to monitor my children\'s lessons, homework, and attendance.', icon: Users },
                { r: 'teacher', title: 'Quran Tutor / Instructor', desc: 'I am a certified teacher offering lessons to students.', icon: Shield }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = role === opt.r;
                return (
                  <div
                    key={opt.r}
                    onClick={() => setRole(opt.r as UserRole)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                      background: isSelected ? 'var(--primary-container)' : 'var(--surface)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--primary)' : 'var(--surface-variant)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '15px' }}>{opt.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{opt.desc}</div>
                    </div>
                    {isSelected && <Check size={20} color="var(--primary)" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>What is your primary goal?</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Pick the track you want to focus on first:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { track: 'Noorani Qaida', desc: 'Arabic alphabet, phonetics, and short vowels' },
                { track: 'Nazra Quran Reading', desc: 'Fluent recitation directly from the Mushaf' },
                { track: 'Tajweed Rules', desc: 'Noon Saakin, Qalqalah, Ghunnah, and melodic rules' },
                { track: 'Hifz Memorization', desc: 'Systematic memorization with repetition counter' }
              ].map((item) => (
                <div
                  key={item.track}
                  onClick={() => setGoalTrack(item.track)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${goalTrack === item.track ? 'var(--primary)' : 'var(--border)'}`,
                    background: goalTrack === item.track ? 'var(--primary-container)' : 'var(--surface)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.track}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  {goalTrack === item.track && <Check size={18} color="var(--primary)" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Current Quran Reading Level</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Beginners are welcomed with open arms—no previous knowledge required!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Beginner (Starting fresh with letters)',
                'Can recognize letters but struggle to connect',
                'Can read slowly with basic vowels',
                'Fluent reader practicing Tajweed & memorization'
              ].map((lvl) => (
                <div
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${level === lvl ? 'var(--primary)' : 'var(--border)'}`,
                    background: level === lvl ? 'var(--primary-container)' : 'var(--surface)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{lvl}</span>
                  {level === lvl && <Check size={18} color="var(--primary)" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Daily Learning Goal</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Consistency is key. Even 15 minutes a day brings immense blessing:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
              {[
                { mins: 10, label: 'Casual (10 min)', sub: 'Great for young kids' },
                { mins: 20, label: 'Balanced (20 min)', sub: 'Recommended' },
                { mins: 30, label: 'Dedicated (30 min)', sub: 'Fast progress' },
                { mins: 45, label: 'Intensive (45 min)', sub: 'Hifz students' }
              ].map((g) => (
                <div
                  key={g.mins}
                  onClick={() => setDailyMinutes(g.mins)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${dailyMinutes === g.mins ? 'var(--primary)' : 'var(--border)'}`,
                    background: dailyMinutes === g.mins ? 'var(--primary-container)' : 'var(--surface)',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>{g.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{g.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <FreeBadge />
            </div>
          </div>
        )}

        {/* Modal footer buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-outline"
              style={{ padding: '10px 16px' }}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : <div />}

          <button
            onClick={() => {
              if (step < 4) setStep(step + 1);
              else handleFinish();
            }}
            className="btn-primary"
          >
            <span>{step === 4 ? 'Launch Academy' : 'Continue'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Modal>
  );
};
