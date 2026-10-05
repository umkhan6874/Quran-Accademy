import React, { useState } from 'react';
import { teachersData } from '../data/quranData';
import { Teacher } from '../types';
import { Search, Star, ShieldCheck, Calendar, ArrowLeft, CheckCircle, Video, Award } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface TeachersPageProps {
  onBack: () => void;
  onSelectTeacherForBooking: (teacher: Teacher) => void;
}

export const TeachersPage: React.FC<TeachersPageProps> = ({
  onBack,
  onSelectTeacherForBooking
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedProfileTeacher, setSelectedProfileTeacher] = useState<Teacher | null>(null);

  const filters = ['All', 'Male', 'Female', 'Tajweed', 'Noorani Qaida', 'Hifz'];

  const filteredTeachers = teachersData.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.qualification.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = filter === 'All' ? true :
      filter === 'Male' ? t.gender === 'male' :
      filter === 'Female' ? t.gender === 'female' :
      filter === 'Tajweed' ? t.subjects.some(s => s.includes('Tajweed')) :
      filter === 'Noorani Qaida' ? t.subjects.some(s => s.includes('Qaida')) :
      filter === 'Hifz' ? t.subjects.some(s => s.includes('Hifz')) : true;

    return matchesSearch && matchesFilter;
  });

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
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Verified Quran Tutors</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              100% Free 1-on-1 Personalized Quran Lessons with Certified Scholars
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by instructor name, university, or subject..."
            style={{
              width: '100%',
              padding: '14px 16px 14px 44px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border)',
              background: 'var(--surface)',
              fontSize: '15px'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: filter === f ? 700 : 500,
                background: filter === f ? 'var(--primary)' : 'var(--surface)',
                color: filter === f ? '#FFFFFF' : 'var(--text-main)',
                border: `1.5px solid ${filter === f ? 'var(--primary)' : 'var(--border)'}`,
                whiteSpace: 'nowrap'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid-2">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header profile info */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: teacher.gender === 'male' ? 'var(--primary-container)' : 'var(--teal-container)',
                  color: teacher.gender === 'male' ? 'var(--primary)' : 'var(--teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  flexShrink: 0
                }}>
                  {teacher.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>{teacher.name}</h3>
                    <ShieldCheck size={18} color="var(--primary)" />
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{teacher.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', fontSize: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: 'var(--gold)' }}>
                      <Star size={14} fill="var(--gold)" /> {teacher.rating} ({teacher.reviewsCount})
                    </span>
                    <span>• {teacher.experienceYears} Years Exp</span>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>• Available Today</span>
                  </div>
                </div>
              </div>

              {/* Ijazah Badge */}
              <div style={{
                background: 'var(--gold-container)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                color: 'var(--on-gold-container)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Award size={15} color="var(--gold-hover)" />
                <span style={{ fontWeight: 600 }}>{teacher.ijazah}</span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '14px' }}>
                {teacher.bio}
              </p>

              {/* Subjects & Languages Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {teacher.subjects.map((sub, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'var(--surface-variant)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    {sub}
                  </span>
                ))}
                {teacher.languages.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'var(--primary-container)',
                      color: 'var(--on-primary-container)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    🗣️ {l}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => setSelectedProfileTeacher(teacher)}
                className="btn-outline"
                style={{ flex: 1, padding: '10px' }}
              >
                Profile & Bio
              </button>
              <button
                onClick={() => onSelectTeacherForBooking(teacher)}
                className="btn-primary"
                style={{ flex: 1.4, padding: '10px' }}
              >
                <Calendar size={16} />
                <span>Book Free Trial</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Detail Dialog */}
      {selectedProfileTeacher && (
        <div className="modal-overlay" onClick={() => setSelectedProfileTeacher(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{selectedProfileTeacher.name}</h3>
            <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '16px' }}>
              {selectedProfileTeacher.qualification}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-main)' }}>
              <div><strong>Ijazah Chain:</strong> {selectedProfileTeacher.ijazah}</div>
              <div><strong>Teaching Methodology:</strong> {selectedProfileTeacher.bio}</div>
              <div><strong>Languages:</strong> {selectedProfileTeacher.languages.join(', ')}</div>
              <div><strong>Available Hours:</strong> {selectedProfileTeacher.availableSlots.join(', ')}</div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedProfileTeacher(null)} className="btn-outline">Close</button>
              <button
                onClick={() => {
                  const t = selectedProfileTeacher;
                  setSelectedProfileTeacher(null);
                  onSelectTeacherForBooking(t);
                }}
                className="btn-primary"
              >
                Book Free Trial with {selectedProfileTeacher.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
