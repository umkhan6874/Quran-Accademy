import React, { useState } from 'react';
import { tajweedRulesData } from '../data/quranData';
import { TajweedRule } from '../types';
import { Award, BookOpen, Volume2, ArrowLeft, CheckCircle2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface TajweedPageProps {
  onBack: () => void;
}

export const TajweedPage: React.FC<TajweedPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedRule, setExpandedRule] = useState<string | null>('noon_izhar');

  const categories = ['All', 'Noon Saakin & Tanween', 'Articulation Rules', 'Nasal Rules'];

  const filteredRules = tajweedRulesData.filter(r =>
    selectedCategory === 'All' || r.category === selectedCategory
  );

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
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Tajweed Rules Master</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Master the science of authentic Quranic recitation with color-coded examples
            </p>
          </div>
        </div>
      </div>

      {/* Intro Banner */}
      <div className="card" style={{
        background: 'var(--primary-container)',
        color: 'var(--on-primary-container)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Award size={26} />
        </div>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Give Every Letter Its Sacred Right</h2>
          <p style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>
            Tajweed literally means "improvement" or "making excellent." It ensures the Quran is recited exactly as revealed to Prophet Muhammad ﷺ.
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: selectedCategory === c ? 700 : 500,
              background: selectedCategory === c ? 'var(--primary)' : 'var(--surface)',
              color: selectedCategory === c ? '#FFFFFF' : 'var(--text-main)',
              border: `1px solid ${selectedCategory === c ? 'var(--primary)' : 'var(--border)'}`,
              whiteSpace: 'nowrap'
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Rules Accordion Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredRules.map((rule) => {
          const isExpanded = expandedRule === rule.id;
          return (
            <div
              key={rule.id}
              className="card"
              style={{
                border: `2px solid ${isExpanded ? 'var(--primary)' : 'var(--border)'}`,
                padding: '20px'
              }}
            >
              <div
                onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {rule.category}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>
                    {rule.title} • <span className="arabic-text" style={{ fontSize: '18px' }}>{rule.titleArabic}</span>
                  </h3>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-main)', marginBottom: '18px' }}>
                    {rule.explanation}
                  </p>

                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                    Examples in the Holy Quran:
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {rule.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--surface-variant)',
                          padding: '14px 16px',
                          borderRadius: 'var(--radius-md)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--primary)' }}>
                            {ex.transliteration}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {ex.explanation}
                          </div>
                        </div>

                        <div className="arabic-text" style={{
                          fontSize: '26px',
                          fontWeight: 800,
                          color: 'var(--text-main)'
                        }}>
                          {ex.arabic}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
