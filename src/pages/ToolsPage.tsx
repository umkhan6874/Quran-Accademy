import React, { useState } from 'react';
import { dailyDuasData, hadithsData } from '../data/quranData';
import { Compass, RotateCcw, Clock, BookOpen, ArrowLeft, Heart, Sparkles, Quote } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface ToolsPageProps {
  onBack: () => void;
  tasbeehCount: number;
  onUpdateTasbeehCount: (count: number) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  onBack,
  tasbeehCount,
  onUpdateTasbeehCount
}) => {
  const [activeTab, setActiveTab] = useState<'tasbeeh' | 'duas' | 'prayers' | 'hadith'>('tasbeeh');
  const [tasbeehTarget, setTasbeehTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState('سُبْحَانَ اللَّهِ (SubhanAllah)');

  const dhikrOptions = [
    { label: 'سُبْحَانَ اللَّهِ (SubhanAllah)', target: 33 },
    { label: 'الْحَمْدُ لِلَّهِ (Alhamdulillah)', target: 33 },
    { label: 'اللَّهُ أَكْبَرُ (Allahu Akbar)', target: 34 },
    { label: 'أَسْتَغْفِرُ اللَّهَ (Astaghfirullah)', target: 100 },
    { label: 'لَا إِلَٰهَ إِلَّا اللَّهُ (La ilaha illallah)', target: 100 }
  ];

  const handleTasbeehTap = () => {
    const next = tasbeehCount + 1;
    onUpdateTasbeehCount(next);
    if ('vibrate' in navigator) {
      navigator.vibrate(next % tasbeehTarget === 0 ? [50, 50, 50] : 20);
    }
  };

  const handleReset = () => {
    onUpdateTasbeehCount(0);
  };

  const prayerTimes = [
    { name: 'Fajr (Dawn)', time: '05:12 AM' },
    { name: 'Sunrise', time: '06:35 AM' },
    { name: 'Dhuhr (Noon)', time: '12:45 PM' },
    { name: 'Asr (Afternoon)', time: '04:15 PM' },
    { name: 'Maghrib (Sunset)', time: '06:58 PM', isNext: true },
    { name: 'Isha (Night)', time: '08:20 PM' }
  ];

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
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Islamic Tools & Library</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Digital Tasbeeh, Daily Duas, Prayer Times & Prophetic Hadiths
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
        {[
          { id: 'tasbeeh', label: 'Digital Tasbeeh' },
          { id: 'duas', label: 'Daily Duas & Azkar' },
          { id: 'prayers', label: 'Prayer Times & Qibla' },
          { id: 'hadith', label: '40 Hadith Collection' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontWeight: activeTab === t.id ? 700 : 500,
              background: activeTab === t.id ? 'var(--primary-container)' : 'transparent',
              color: activeTab === t.id ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Tasbeeh */}
      {activeTab === 'tasbeeh' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          {/* Dhikr Selector */}
          <div className="card" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
            <div className="arabic-text" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>
              {selectedDhikr.split('(')[0]}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {selectedDhikr.split('(')[1]?.replace(')', '') || ''}
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {dhikrOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => {
                    setSelectedDhikr(opt.label);
                    setTasbeehTarget(opt.target);
                    onUpdateTasbeehCount(0);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: selectedDhikr === opt.label ? 700 : 500,
                    background: selectedDhikr === opt.label ? 'var(--primary)' : 'var(--surface-variant)',
                    color: selectedDhikr === opt.label ? '#FFFFFF' : 'var(--text-main)',
                    border: '1px solid var(--border)'
                  }}
                >
                  {opt.label.split('(')[0]} ({opt.target})
                </button>
              ))}
            </div>
          </div>

          {/* Large Tap Button */}
          <div
            onClick={handleTasbeehTap}
            style={{
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, var(--surface) 0%, var(--surface-variant) 100%)',
              border: '8px solid var(--primary-container)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'transform 0.1s ease',
              transform: 'scale(1)'
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <span style={{ fontSize: '64px', fontWeight: 900, color: 'var(--primary)', lineHeight: '1' }}>
              {tasbeehCount}
            </span>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>
              Target: {tasbeehTarget}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 700, letterSpacing: '1px', marginTop: '4px' }}>
              TAP TO COUNT
            </span>
          </div>

          <button onClick={handleReset} className="btn-outline">
            <RotateCcw size={16} />
            <span>Reset Counter</span>
          </button>
        </div>
      )}

      {/* Tab 2: Duas */}
      {activeTab === 'duas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {dailyDuasData.map((dua) => (
            <div key={dua.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{dua.title}</h3>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  background: 'var(--primary-container)',
                  color: 'var(--on-primary-container)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  {dua.category}
                </span>
              </div>
              <div className="arabic-text" style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                {dua.arabic}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                {dua.transliteration}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '8px' }}>
                {dua.translation}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 600 }}>
                📖 {dua.reference}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Prayer Times */}
      {activeTab === 'prayers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ background: 'var(--primary)', color: '#FFFFFF' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: 'var(--gold-light)' }}>
              NEXT PRAYER IN 1H 42M
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '6px 0' }}>Maghrib (06:58 PM)</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--primary-container)' }}>
              <Compass size={16} />
              <span>Qibla Direction: 68° East from North • Kaaba Mecca</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {prayerTimes.map((p) => (
              <div
                key={p.name}
                className="card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: p.isNext ? 'var(--primary-container)' : 'var(--surface)',
                  border: `1.5px solid ${p.isNext ? 'var(--primary)' : 'var(--border)'}`
                }}
              >
                <span style={{ fontWeight: p.isNext ? 700 : 500 }}>{p.name}</span>
                <span style={{ fontWeight: 800, fontSize: '15px', color: p.isNext ? 'var(--primary)' : 'var(--text-main)' }}>
                  {p.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Hadith */}
      {activeTab === 'hadith' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {hadithsData.map((h, i) => (
            <div key={i} className="card" style={{ borderLeft: '4px solid var(--gold)' }}>
              <div className="arabic-text" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                {h.arabic}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '8px' }}>
                "{h.translation}"
              </p>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                — {h.reference}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
