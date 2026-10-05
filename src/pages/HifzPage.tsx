import React, { useState } from 'react';
import { HifzProgress } from '../types';
import { Target, Repeat, ArrowLeft, Award, Sparkles, CheckCircle, BookOpen, RotateCcw } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';
import confetti from 'canvas-confetti';

interface HifzPageProps {
  onBack: () => void;
  hifzProgress: HifzProgress[];
  onIncrementRepeat: (surahNumber: number) => void;
  onResetRepeat?: (surahNumber: number) => void;
  onSetTarget?: (surahNumber: number, target: number) => void;
}

export const HifzPage: React.FC<HifzPageProps> = ({
  onBack,
  hifzProgress,
  onIncrementRepeat,
  onResetRepeat,
  onSetTarget
}) => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState(112); // Surah Al-Ikhlas

  const currentTarget = hifzProgress.find(h => h.surahNumber === selectedSurahNumber) || {
    surahNumber: selectedSurahNumber,
    surahName: 'Al-Ikhlas',
    currentRepeats: 0,
    targetRepeats: 10,
    status: 'in_progress' as const
  };

  const playChime = (highPitch = false) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(highPitch ? 880 : 520, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // AudioContext fallback
    }
  };

  const handleRepeat = () => {
    onIncrementRepeat(selectedSurahNumber);
    if (currentTarget.currentRepeats + 1 >= currentTarget.targetRepeats) {
      playChime(true);
      confetti({ particleCount: 80, spread: 70 });
    } else {
      playChime(false);
    }
  };

  const handleReset = () => {
    if (onResetRepeat) {
      onResetRepeat(selectedSurahNumber);
    }
  };

  const handleSelectTarget = (target: number) => {
    if (onSetTarget) {
      onSetTarget(selectedSurahNumber, target);
    }
  };

  const progressFraction = Math.min(1, currentTarget.currentRepeats / currentTarget.targetRepeats);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn-outline" style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Hifz Memorization Tracker</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Systematic memorization retention with the traditional 3-pillar method
            </p>
          </div>
        </div>
      </div>

      {/* Live Circular Repetition Counter Hero */}
      <div className="card" style={{
        textAlign: 'center',
        padding: '36px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>
          ACTIVE MEMORIZATION TARGET
        </span>
        <h2 style={{ fontSize: '26px', fontWeight: 800 }}>
          Surah {currentTarget.surahName}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '480px' }}>
          Repeated recitation locks verses into long-term memory. Goal: Recite {currentTarget.targetRepeats} times to master.
        </p>

        {/* Target Repeats Selector */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Set Target:</span>
          {[5, 10, 20, 40].map((t) => (
            <button
              key={t}
              onClick={() => handleSelectTarget(t)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: currentTarget.targetRepeats === t ? 700 : 500,
                background: currentTarget.targetRepeats === t ? 'var(--primary)' : 'var(--surface-variant)',
                color: currentTarget.targetRepeats === t ? '#FFFFFF' : 'var(--text-main)',
                border: '1px solid var(--border)'
              }}
            >
              {t} Repeats
            </button>
          ))}
        </div>

        {/* Circular Dial */}
        <div style={{ position: 'relative', width: '180px', height: '180px', margin: '14px 0' }}>
          <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle
              cx="90"
              cy="90"
              r="76"
              stroke="var(--primary-container)"
              strokeWidth="14"
              fill="transparent"
            />
            <circle
              cx="90"
              cy="90"
              r="76"
              stroke="var(--primary)"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 76}
              strokeDashoffset={2 * Math.PI * 76 * (1 - progressFraction)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '44px', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1' }}>
              {currentTarget.currentRepeats}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              of {currentTarget.targetRepeats} repeats
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleRepeat}
            className="btn-primary"
            style={{ padding: '16px 36px', fontSize: '16px' }}
          >
            <Repeat size={20} />
            <span>I Recited This Ayah! (+1 Count)</span>
          </button>

          <button
            onClick={handleReset}
            className="btn-outline"
            style={{ padding: '16px 20px', fontSize: '14px' }}
            title="Reset repeat counter for this Surah"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {currentTarget.currentRepeats >= currentTarget.targetRepeats
            ? '🏆 Masha\'Allah! Target reached. Surah is locked in memory.'
            : '💡 Tip: Say it aloud from memory without looking at the screen.'}
        </span>
      </div>

      {/* Traditional 3-Pillar Method Card */}
      <div className="card" style={{ background: 'var(--gold-container)', color: 'var(--on-gold-container)' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '10px' }}>
          The Traditional 3-Pillar Hifz Methodology
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <strong>1. Sabaq (New Lesson):</strong>
            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.9 }}>
              Today's fresh verses. Read 15 times looking at the Mushaf, then recite to your teacher.
            </p>
          </div>
          <div>
            <strong>2. Sabqi (Recent Revision):</strong>
            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.9 }}>
              The last 5 to 10 pages memorized in the past 14 days. Recited each morning before new work.
            </p>
          </div>
          <div>
            <strong>3. Manzil (Old Memorization):</strong>
            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.9 }}>
              All previously memorized Juz. Cycles on a fixed routine to preserve lifelong retention.
            </p>
          </div>
        </div>
      </div>

      {/* Short Surahs Memorization Roster */}
      <div>
        <h3 className="section-title">Short Surahs Hifz Roster</h3>
        <p className="section-subtitle">Click any Surah below to set it as the active memorization target</p>

        <div className="grid-3">
          {hifzProgress.map((surah) => {
            const isSelected = selectedSurahNumber === surah.surahNumber;
            const isMastered = surah.currentRepeats >= surah.targetRepeats;
            return (
              <div
                key={surah.surahNumber}
                className="card"
                onClick={() => setSelectedSurahNumber(surah.surahNumber)}
                style={{
                  cursor: 'pointer',
                  border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--primary-container)' : 'var(--surface)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '16px' }}>
                    {surah.surahNumber}. {surah.surahName}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: isMastered ? '#E8F5E9' : 'var(--gold-container)',
                    color: isMastered ? 'var(--success)' : 'var(--on-gold-container)'
                  }}>
                    {isMastered ? 'Mastered ✅' : `${surah.currentRepeats}/${surah.targetRepeats}`}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {isMastered ? 'Locked in memory' : `${surah.targetRepeats - surah.currentRepeats} repeats remaining`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
