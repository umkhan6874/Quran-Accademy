import React, { useState } from 'react';
import { UserProfile, ClassBooking } from '../types';
import { Users, Clock, CheckCircle2, Award, Calendar, BookOpen, ArrowLeft, Plus } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface ParentDashboardProps {
  onBack: () => void;
  bookings: ClassBooking[];
  onBookClass: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  onBack,
  bookings,
  onBookClass
}) => {
  const [selectedChild, setSelectedChild] = useState('Hamza (Age 7)');
  const [homeworkDone, setHomeworkDone] = useState(false);

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
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Parent Guardian Portal</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Child Learning Hours, Teacher Remarks & Attendance Overview
            </p>
          </div>
        </div>

        <button onClick={onBookClass} className="btn-primary" style={{ padding: '10px 18px', fontSize: '14px' }}>
          <Plus size={16} />
          <span>Book Free Class for Child</span>
        </button>
      </div>

      {/* Child Switcher */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['Hamza (Age 7)', 'Aisha (Age 10)'].map((child) => (
          <button
            key={child}
            onClick={() => setSelectedChild(child)}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontWeight: selectedChild === child ? 700 : 500,
              background: selectedChild === child ? 'var(--primary)' : 'var(--surface)',
              color: selectedChild === child ? '#FFFFFF' : 'var(--text-main)',
              border: `1.5px solid ${selectedChild === child ? 'var(--primary)' : 'var(--border)'}`,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={16} />
            <span>{child}</span>
          </button>
        ))}
      </div>

      {/* Weekly Progress Overview Cards */}
      <div className="grid-4">
        {[
          { label: 'Weekly Study Time', val: '4.5 hrs', sub: 'On track with 20m goal', icon: Clock, color: 'var(--primary)' },
          { label: 'Attendance Rate', val: '100%', sub: '3 of 3 sessions attended', icon: CheckCircle2, color: 'var(--success)' },
          { label: 'Qaida Lessons', val: '14 Done', sub: 'Mastered through Harakat', icon: BookOpen, color: 'var(--teal)' },
          { label: 'Stars Unlocked', val: '145 ⭐', sub: 'Active daily motivation', icon: Award, color: 'var(--gold)' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card" style={{ padding: '20px' }}>
              <div style={{ color: stat.color, marginBottom: '8px' }}>
                <Icon size={24} />
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800 }}>{stat.val}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{stat.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Teacher Remarks Feed */}
      <div>
        <h3 className="section-title">Teacher Lesson Notes</h3>
        <p className="section-subtitle">Direct observations and recommendations from tutors</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bookings.slice(0, 2).map((b) => (
            <div key={b.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <strong style={{ fontSize: '15px' }}>{b.teacherName}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>({b.subject})</span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.date}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                "{b.teacherNotes}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Homework Verification Card */}
      <div className="card" style={{ background: 'var(--gold-container)', color: 'var(--on-gold-container)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>
          Pending Homework for Next Session
        </h3>
        <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
          Please listen to {selectedChild.split(' ')[0]} recite Lesson 4 Harakat and practice Kasra with teacher feedback.
        </p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          <input
            type="checkbox"
            checked={homeworkDone}
            onChange={(e) => setHomeworkDone(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
          />
          <span>{homeworkDone ? 'Reviewed and verified with child ✅' : 'Mark as reviewed with child'}</span>
        </label>
      </div>
    </div>
  );
};
