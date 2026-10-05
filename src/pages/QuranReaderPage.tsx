import React, { useState, useEffect } from 'react';
import { surahsData, ayahsDataMap } from '../data/quranData';
import { Surah, Ayah, Bookmark } from '../types';
import { Play, Pause, RotateCw, Bookmark as BookmarkIcon, BookmarkCheck, ArrowLeft, ChevronDown, Info, Sliders, Volume2, Sparkles } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface QuranReaderPageProps {
  onBack: () => void;
  bookmarks: Bookmark[];
  onToggleBookmark: (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => void;
  quranFontSize: number;
  onUpdateFontSize: (size: number) => void;
}

export const QuranReaderPage: React.FC<QuranReaderPageProps> = ({
  onBack,
  bookmarks,
  onToggleBookmark,
  quranFontSize,
  onUpdateFontSize
}) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah>(surahsData[0]);
  const [activeAyahNumber, setActiveAyahNumber] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState<1 | 3 | 5 | 10>(1);
  const [showTafsirMap, setShowTafsirMap] = useState<Record<number, boolean>>({});

  const ayahs = ayahsDataMap[selectedSurah.number] || [];

  // Speech recitation simulation
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      const currentAyah = ayahs.find(a => a.ayahNumber === activeAyahNumber);
      if (currentAyah && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentAyah.arabicText);
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }

      timer = setTimeout(() => {
        if (activeAyahNumber < ayahs.length) {
          setActiveAyahNumber(prev => prev + 1);
        } else {
          setActiveAyahNumber(1);
          setIsPlaying(false);
        }
      }, 4200);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => clearTimeout(timer);
  }, [isPlaying, activeAyahNumber, ayahs]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const cycleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 1) return 3;
      if (prev === 3) return 5;
      if (prev === 5) return 10;
      return 1;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn-outline" style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800 }}>Quran Reader & Nazra</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Clear Arabic Uthmani Script, Audio Reciter & Word Meaning
            </p>
          </div>
        </div>

        {/* Font Size & Surah Picker Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '4px 8px' }}>
            <button
              onClick={() => onUpdateFontSize(Math.max(20, quranFontSize - 2))}
              style={{ padding: '4px 8px', fontWeight: 700, fontSize: '13px' }}
            >
              A-
            </button>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{quranFontSize}px</span>
            <button
              onClick={() => onUpdateFontSize(Math.min(42, quranFontSize + 2))}
              style={{ padding: '4px 8px', fontWeight: 700, fontSize: '15px' }}
            >
              A+
            </button>
          </div>

          <select
            value={selectedSurah.number}
            onChange={(e) => {
              const s = surahsData.find(x => x.number === Number(e.target.value));
              if (s) {
                setSelectedSurah(s);
                setActiveAyahNumber(1);
                setIsPlaying(false);
              }
            }}
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-main)',
              fontWeight: 700,
              fontSize: '14px'
            }}
          >
            {surahsData.map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. {s.nameEnglish} ({s.nameArabic})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Persistent Audio Bar */}
      <div className="card" style={{
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        padding: '16px 20px',
        borderLeft: '5px solid var(--primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={togglePlay}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '2px' }} />}
          </button>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>
              {selectedSurah.nameEnglish} • Ayah {activeAyahNumber} of {ayahs.length}
            </div>
            <div style={{ fontSize: '12px', color: isPlaying ? 'var(--primary)' : 'var(--text-muted)' }}>
              {isPlaying ? 'Reciting now (Listen & Repeat)...' : 'Audio recitation paused'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={cycleRepeat}
            className="btn-outline"
            style={{ padding: '8px 12px', fontSize: '13px' }}
          >
            <RotateCw size={15} />
            <span>Repeat {repeatMode}x</span>
          </button>

          <button
            onClick={() => setActiveAyahNumber(Math.max(1, activeAyahNumber - 1))}
            className="btn-outline"
            style={{ padding: '8px 12px', fontSize: '13px' }}
          >
            Prev
          </button>
          <button
            onClick={() => setActiveAyahNumber(Math.min(ayahs.length, activeAyahNumber + 1))}
            className="btn-outline"
            style={{ padding: '8px 12px', fontSize: '13px' }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Surah Bismillah Card */}
      <div className="card" style={{
        background: 'var(--primary-container)',
        textAlign: 'center',
        padding: '24px',
        color: 'var(--on-primary-container)'
      }}>
        <h2 className="arabic-text" style={{ fontSize: `${quranFontSize + 4}px`, fontWeight: 800, marginBottom: '6px' }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h2>
        <p style={{ fontSize: '13px', opacity: 0.9 }}>
          In the name of Allah, the Entirely Merciful, the Especially Merciful
        </p>
      </div>

      {/* Ayahs Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ayahs.map((ayah) => {
          const isActive = ayah.ayahNumber === activeAyahNumber;
          const isBookmarked = bookmarks.some(
            b => b.surahNumber === selectedSurah.number && b.ayahNumber === ayah.ayahNumber
          );
          const showTafsir = showTafsirMap[ayah.ayahNumber];

          return (
            <div
              key={ayah.ayahNumber}
              className="card"
              onClick={() => setActiveAyahNumber(ayah.ayahNumber)}
              style={{
                border: `2px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                background: isActive ? 'var(--surface-hover)' : 'var(--surface)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Ayah Header Tools */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--primary)' : 'var(--surface-variant)',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px'
                }}>
                  {ayah.ayahNumber}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTafsirMap(prev => ({ ...prev, [ayah.ayahNumber]: !prev[ayah.ayahNumber] }));
                    }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: showTafsir ? 'var(--primary-container)' : 'var(--surface-variant)',
                      color: showTafsir ? 'var(--primary)' : 'var(--text-muted)',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Info size={14} />
                    <span>Tafsir</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark({
                        surahNumber: selectedSurah.number,
                        surahName: selectedSurah.nameEnglish,
                        ayahNumber: ayah.ayahNumber,
                        arabicText: ayah.arabicText
                      });
                    }}
                    style={{
                      padding: '6px',
                      borderRadius: '50%',
                      color: isBookmarked ? 'var(--gold)' : 'var(--text-muted)'
                    }}
                  >
                    {isBookmarked ? <BookmarkCheck size={20} /> : <BookmarkIcon size={20} />}
                  </button>
                </div>
              </div>

              {/* Arabic Calligraphy Verse */}
              <div className="arabic-text" style={{
                fontSize: `${quranFontSize}px`,
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '12px',
                padding: '6px 0'
              }}>
                {ayah.arabicText}
              </div>

              {/* Transliteration */}
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--primary)',
                marginBottom: '6px',
                lineHeight: '1.5'
              }}>
                {ayah.transliteration}
              </div>

              {/* Translation */}
              <div style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: '1.6'
              }}>
                {ayah.translation}
              </div>

              {/* Tafsir Accordion */}
              {showTafsir && ayah.tafsir && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-variant)',
                  fontSize: '13px',
                  color: 'var(--text-main)',
                  borderLeft: '4px solid var(--gold)'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '11px', color: 'var(--gold-hover)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Tafsir Insight & Context
                  </div>
                  {ayah.tafsir}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
