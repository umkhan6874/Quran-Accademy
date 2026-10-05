import React, { useState } from 'react';
import { UserProfile, ClassBooking } from '../types';
import { Users, Calendar, Video, Clock, CheckCircle2, ArrowLeft, Plus, FileText, Award } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface TeacherDashboardProps {
  onBack: () => void;
  bookings: ClassBooking[];
  onEnterClassroom: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onBack,
  bookings,
  onEnterClassroom
}) => {
  const [trialRequests, setTrialRequests] = useState([
    { id: 'req_1', student: 'Zaid Mansoor (Age 9)', track: 'Tajweed Makharij', slot: 'Tomorrow, 03:00 PM', approved: false },
    { id: 'req_2', student: 'Maryam Tariq (Age 11)', track: 'Hifz Juz Amma', slot: 'Friday, 06:30 PM', approved: false }
  ]);

  const handleApprove = (id: string) => {
    setTrialRequests(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
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
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Teacher Instructor Studio</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Sheikh Ahmad Al-Masri • Al-Azhar Certified Instructor
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-3">
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '8px' }}><Users size={24} /></div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>24 Active</div>
          <div style={{ fontSize: '13px', fontWeight: 600 }}>Enrolled Students</div>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ color: 'var(--gold)', marginBottom: '8px' }}><Calendar size={24} /></div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>4 Sessions</div>
          <div style={{ fontSize: '13px', fontWeight: 600 }}>Scheduled Today</div>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ color: 'var(--teal)', marginBottom: '8px' }}><Award size={24} /></div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>4.95 Rating</div>
          <div style={{ fontSize: '13px', fontWeight: 600 }}>184 Student Reviews</div>
        </div>
      </div>

      {/* Today's Schedule Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Today's Teaching Schedule</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Upcoming 1-on-1 virtual Quran lessons</p>
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-container)',
            color: 'var(--on-primary-container)'
          }}>
            NEXT SESSION IN 15 MINS
          </span>
        </div>

        <div style={{
          padding: '16px',
          background: 'var(--surface-variant)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '16px' }}>Hamza Ali (Age 7)</div>
            <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>
              05:00 PM • Noorani Qaida & Tajweed Review
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Lesson Plan: Review Lesson 4 Sukoon & Al-Halq articulation
            </div>
          </div>

          <button onClick={onEnterClassroom} className="btn-primary" style={{ padding: '10px 20px' }}>
            <Video size={16} />
            <span>Launch Virtual Classroom</span>
          </button>
        </div>
      </div>

      {/* Trial Requests Queue */}
      <div>
        <h3 className="section-title">New Free Trial Class Requests</h3>
        <p className="section-subtitle">Students seeking introductory assessment and guidance</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {trialRequests.map((req) => (
            <div
              key={req.id}
              className="card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{req.student}</div>
                <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>{req.track}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{req.slot}</div>
              </div>

              {req.approved ? (
                <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: '13px' }}>
                  Approved & Added to Roster ✅
                </span>
              ) : (
                <button
                  onClick={() => handleApprove(req.id)}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Approve Free Trial Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
