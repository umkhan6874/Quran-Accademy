import React, { useState } from 'react';
import { qaidaLessonsData } from '../data/quranData';
import { QaidaLesson, QaidaItem } from '../types';
import { Volume2, CheckCircle2, Sparkles, HelpCircle, ArrowLeft, Award, Play } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';
import confetti from 'canvas-confetti';

interface NooraniQaidaPageProps {
  onBack: () => void;
  onLessonComplete: (lessonId: number) => void;
  completedLessons: number[];
}

export const NooraniQaidaPage: React.FC<NooraniQaidaPageProps> = ({
  onBack,
  onLessonComplete,
  completedLessons
}) => {
  const [selectedLesson, setSelectedLesson] = useState<QaidaLesson>(qaidaLessonsData[0]);
  const [selectedItem, setSelectedItem] = useState<QaidaItem>(selectedLesson.items[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const isCompleted = completedLessons.includes(selectedLesson.id);

  const speakLetter = (item: QaidaItem) => {
    setSelectedItem(item);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.name);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleComplete = () => {
    onLessonComplete(selectedLesson.id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      setQuizScore(100);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      setQuizScore(50);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn-outline" style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Noorani Qaida</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Interactive Arabic Alphabets, Short Vowels & Makharij Pronunciation
            </p>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="btn-primary"
          style={{
            background: isCompleted ? 'var(--success)' : 'var(--primary)',
            fontSize: '14px',
            padding: '10px 18px'
          }}
        >
          <CheckCircle2 size={16} />
          <span>{isCompleted ? 'Lesson Mastered ✅' : 'Mark Lesson Complete (+15 ⭐)'}</span>
        </button>
      </div>

      {/* Horizontal Lesson Selector */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {qaidaLessonsData.map((lesson) => {
          const isCurrent = lesson.id === selectedLesson.id;
          const isDone = completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => {
                setSelectedLesson(lesson);
                setSelectedItem(lesson.items[0]);
              }}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                fontWeight: isCurrent ? 700 : 500,
                border: `1.5px solid ${isCurrent ? 'var(--primary)' : 'var(--border)'}`,
                background: isCurrent ? 'var(--primary)' : 'var(--surface)',
                color: isCurrent ? '#FFFFFF' : 'var(--text-main)',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{lesson.title.split(':')[0]}</span>
              {isDone && <span style={{ color: isCurrent ? 'var(--gold-light)' : 'var(--success)' }}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* Current Lesson Summary Banner */}
      <div className="card" style={{
        background: 'var(--primary-container)',
        border: '1px solid #C8EFE5',
        color: 'var(--on-primary-container)',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {selectedLesson.level} Level
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{selectedLesson.title}</h2>
            <p style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>{selectedLesson.description}</p>
          </div>
          <button
            onClick={() => { setShowQuiz(!showQuiz); setQuizScore(null); }}
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <HelpCircle size={15} />
            <span>Practice Recognition Quiz</span>
          </button>
        </div>
      </div>

      {/* Quiz Card Modal */}
      {showQuiz && (
        <div className="card" style={{ border: '2px solid var(--gold)', background: 'var(--gold-container)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Letter Recognition Challenge!</h3>
          <p style={{ fontSize: '13px', color: 'var(--on-gold-container)', marginBottom: '14px' }}>
            Identify this letter and its pronunciation point:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div className="arabic-text" style={{
              fontSize: '48px',
              fontWeight: 800,
              padding: '10px 30px',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--primary)'
            }}>
              ج
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleQuizAnswer(true)}
                className="btn-primary"
                style={{ padding: '10px 18px', fontSize: '14px' }}
              >
                It is "Jeem" (ج) — Middle tongue touching palate
              </button>
              <button
                onClick={() => handleQuizAnswer(false)}
                className="btn-outline"
                style={{ padding: '10px 18px', fontSize: '14px' }}
              >
                It is "Khaa" (خ)
              </button>
            </div>
          </div>
          {quizScore && (
            <div style={{ marginTop: '14px', fontWeight: 700, color: quizScore === 100 ? 'var(--success)' : 'var(--danger)' }}>
              {quizScore === 100 ? '🎉 Excellent! Exactly correct.' : '❌ Not quite. Notice the single dot in the middle.'}
            </div>
          )}
        </div>
      )}

      {/* Interactive Letter Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700 }}>
            Tap any letter to hear articulation & pronunciation:
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {selectedLesson.items.length} Glyphs
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
          gap: '12px'
        }}>
          {selectedLesson.items.map((item, idx) => {
            const isSelected = selectedItem.symbol === item.symbol;
            return (
              <div
                key={idx}
                className="card"
                onClick={() => speakLetter(item)}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '16px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--primary-container)' : 'var(--surface)',
                  transform: isSelected ? 'scale(1.04)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div className="arabic-text" style={{
                  fontSize: '34px',
                  fontWeight: 800,
                  color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                  lineHeight: '1.2'
                }}>
                  {item.symbol}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginTop: '4px' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  {item.transliteration}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Letter Articulation Point (Makhraj) Detail Card */}
      {selectedItem && (
        <div className="card" style={{
          border: '2px solid var(--primary-container)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="arabic-text" style={{
              width: '74px',
              height: '74px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-container)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44px',
              fontWeight: 800
            }}>
              {selectedItem.symbol}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800 }}>{selectedItem.name}</h3>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>({selectedItem.transliteration})</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                <strong>Makhraj (Articulation Point):</strong> {selectedItem.makhraj}
              </div>
            </div>
          </div>

          <button
            onClick={() => speakLetter(selectedItem)}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '14px' }}
          >
            <Volume2 size={18} />
            <span>Hear Pronunciation</span>
          </button>
        </div>
      )}
    </div>
  );
};
