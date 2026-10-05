import React, { useState } from 'react';
import { UserProfile, ClassBooking } from '../types';
import { Users, Clock, CheckCircle2, Award, Calendar, BookOpen, ArrowLeft, Plus, MessageSquare, Send } from 'lucide-react';
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
  const [selectedChild, setSelectedChild] = useState<'Hamza' | 'Aisha'>('Hamza');
  const [homeworkDone, setHomeworkDone] = useState(false);
  const [parentNote, setParentNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  const childrenData = {
    Hamza: {
      name: 'Hamza (Age 7)',
      track: 'Noorani Qaida & Makharij Articulation',
      weeklyHours: '4.5 hrs',
      attendance: '100% (3/3)',
      progress: '14 Lessons Mastered',
      stars: 145,
      homework: 'Please review Lesson 4 Sukoon & Halqi throat letters before tomorrow\'s session.',
      teacherRemarks: 'Masha\'Allah, Hamza is showing great enthusiasm and clear distinction between letters Baa and Taa.'
    },
    Aisha: {
      name: 'Aisha (Age 10)',
      track: 'Nazra Reading & Surah Al-Mulk Tajweed',
      weeklyHours: '6.2 hrs',
      attendance: '100% (4/4)',
      progress: 'Juz 30 Fluent Reader',
      stars: 230,
      homework: 'Recite verses 1 to 5 of Surah Al-Mulk with proper 2-count Ghunnah on Noon Mushaddadah.',
      teacherRemarks: 'Aisha has mastered Noon Saakin rules (Izhar & Idgham). Encouraged to focus on smooth breath control.'
    }
  };

  const currentChild = childrenData[selectedChild];

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentNote.trim()) return;
    setNoteSent(true);
    setParentNote('');
    setTimeout(() => setNoteSent(false), 2500);
  };

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
        {(['Hamza', 'Aisha'] as const).map((childKey) => (
          <button
            key={childKey}
            onClick={() => {
              setSelectedChild(childKey);
              setHomeworkDone(false);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontWeight: selectedChild === childKey ? 700 : 500,
              background: selectedChild === childKey ? 'var(--primary)' : 'var(--surface)',
              color: selectedChild === childKey ? '#FFFFFF' : 'var(--text-main)',
              border: `1.5px solid ${selectedChild === childKey ? 'var(--primary)' : 'var(--border)'}`,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={16} />
            <span>{childrenData[childKey].name}</span>
          </button>
        ))}
      </div>

      {/* Weekly Progress Overview Cards */}
      <div className="grid-4">
        {[
          { label: 'Weekly Study Time', val: currentChild.weeklyHours, sub: 'Target: 20 min/day', icon: Clock, color: 'var(--primary)' },
          { label: 'Attendance Rate', val: currentChild.attendance, sub: 'All sessions attended', icon: CheckCircle2, color: 'var(--success)' },
          { label: 'Current Level', val: currentChild.progress, sub: currentChild.track, icon: BookOpen, color: 'var(--teal)' },
          { label: 'Stars Unlocked', val: `${currentChild.stars} ⭐`, sub: 'Motivation points', icon: Award, color: 'var(--gold)' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card" style={{ padding: '20px' }}>
              <div style={{ color: stat.color, marginBottom: '8px' }}>
                <Icon size={24} />
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800 }}>{stat.val}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{stat.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {stat.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Teacher Remarks Feed */}
      <div>
        <h3 className="section-title">Teacher Lesson Notes for {selectedChild}</h3>
        <p className="section-subtitle">Direct observations and recommendations from tutors</p>

        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <strong style={{ fontSize: '15px' }}>Sheikh Ahmad Al-Masri</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>({currentChild.track})</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Yesterday's Session</span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.6' }}>
            "{currentChild.teacherRemarks}"
          </p>
        </div>
      </div>

      {/* Homework Verification Card */}
      <div className="card" style={{ background: 'var(--gold-container)', color: 'var(--on-gold-container)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>
          Pending Homework for Next Session
        </h3>
        <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
          {currentChild.homework}
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

      {/* Send Note to Tutor */}
      <div className="card">
        <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>Send Note / Question to {selectedChild}'s Instructor</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Share scheduling adjustments, learning pace feedback, or special requests directly with the teacher.
        </p>

        <form onSubmit={handleSendNote} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={parentNote}
            onChange={(e) => setParentNote(e.target.value)}
            placeholder={`Message for ${selectedChild}'s tutor...`}
            style={{
              flex: 1,
              minWidth: '240px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border)',
              fontSize: '14px'
            }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
            <Send size={16} />
            <span>Send Note</span>
          </button>
        </form>

        {noteSent && (
          <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--success)', fontWeight: 700 }}>
            Message sent to teacher successfully! They will review it before the next session.
          </div>
        )}
      </div>
    </div>
  );
};
