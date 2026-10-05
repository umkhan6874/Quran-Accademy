import React, { useState, useEffect } from 'react';
import { qaidaLessonsData } from '../data/quranData';
import { QaidaLesson, QaidaItem } from '../types';
import { Volume2, CheckCircle2, Sparkles, HelpCircle, ArrowLeft, Award, Play, RotateCcw } from 'lucide-react';
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
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTarget, setQuizTarget] = useState<QaidaItem>(selectedLesson.items[0]);
  const [quizOptions, setQuizOptions] = useState<QaidaItem[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const isCompleted = completedLessons.includes(selectedLesson.id);

  // Play gentle web audio chime + speak pronunciation
  const playSoundEffect = (freq = 440) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // AudioContext fallback
    }
  };

  const speakLetter = (item: QaidaItem) => {
    setSelectedItem(item);
    playSoundEffect(520);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Try Arabic pronunciation first
      const utterance = new SpeechSynthesisUtterance(item.symbol);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;

      utterance.onerror = () => {
        // Fallback to letter name in English
        const fallback = new SpeechSynthesisUtterance(item.name);
        fallback.rate = 0.9;
        window.speechSynthesis.speak(fallback);
      };

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

  // Setup new dynamic quiz question
  const initQuizQuestion = () => {
    const items = selectedLesson.items;
    const randomIndex = Math.floor(Math.random() * items.length);
    const target = items[randomIndex];
    setQuizTarget(target);

    // Pick 2 other distinct items
    const others = items.filter(x => x.symbol !== target.symbol);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 2);

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());
    setQuizOptions(options);
    setQuizFeedback(null);
  };

  useEffect(() => {
    if (showQuiz) {
      initQuizQuestion();
    }
  }, [showQuiz, selectedLesson]);

  const handleAnswerClick = (option: QaidaItem) => {
    if (option.symbol === quizTarget.symbol) {
      setQuizFeedback('correct');
      setQuizScore(prev => prev + 1);
      playSoundEffect(659);
      confetti({ particleCount: 40, spread: 60 });
    } else {
      setQuizFeedback('wrong');
      playSoundEffect(260);
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
              Interactive Arabic Alphabets, Short Vowels & Makharij Articulation
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
                setShowQuiz(false);
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
            onClick={() => {
              setShowQuiz(!showQuiz);
              setQuizScore(0);
              setQuizQuestionIndex(0);
            }}
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <HelpCircle size={15} />
            <span>{showQuiz ? 'Close Practice Quiz' : 'Interactive Recognition Quiz'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Practice Quiz Card */}
      {showQuiz && (
        <div className="card" style={{ border: '2px solid var(--gold)', background: 'var(--gold-container)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--on-gold-container)' }}>
              Letter Recognition Challenge
            </h3>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--on-gold-container)' }}>
              Score: {quizScore} Correct
            </span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--on-gold-container)', marginBottom: '16px' }}>
            Identify the correct letter name and articulation for this symbol:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
            <div className="arabic-text" style={{
              fontSize: '64px',
              fontWeight: 800,
              padding: '16px 44px',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--primary)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {quizTarget.symbol}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {quizOptions.map((opt) => (
                <button
                  key={opt.symbol}
                  onClick={() => handleAnswerClick(opt)}
                  className="btn-outline"
                  style={{
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 700,
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  {opt.name} ({opt.transliteration})
                </button>
              ))}
            </div>

            {quizFeedback === 'correct' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--success)', fontWeight: 800, fontSize: '15px' }}>
                  🎉 Masha'Allah! Correct: {quizTarget.name} — {quizTarget.makhraj}
                </span>
                <button
                  onClick={initQuizQuestion}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '13px' }}
                >
                  Next Letter Challenge →
                </button>
              </div>
            )}

            {quizFeedback === 'wrong' && (
              <div style={{ color: 'var(--danger)', fontWeight: 700, fontSize: '14px' }}>
                ❌ Not quite. Notice the shape and dot position. Try again!
              </div>
            )}
          </div>
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
            <span>Hear Articulation</span>
          </button>
        </div>
      )}
    </div>
  );
};
