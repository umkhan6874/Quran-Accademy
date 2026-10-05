import React, { useState } from 'react';
import { UserProfile, ClassBooking } from '../types';
import { Users, Calendar, Video, Clock, CheckCircle2, ArrowLeft, Plus, FileText, Award, Send } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface TeacherDashboardProps {
  onBack: () => void;
  bookings: ClassBooking[];
  onEnterClassroom: () => void;
  onAddBooking?: (booking: ClassBooking) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onBack,
  bookings,
  onEnterClassroom,
  onAddBooking
}) => {
  const [trialRequests, setTrialRequests] = useState([
    { id: 'req_1', student: 'Zaid Mansoor (Age 9)', track: 'Tajweed Makharij', slot: 'Tomorrow, 03:00 PM', approved: false },
    { id: 'req_2', student: 'Maryam Tariq (Age 11)', track: 'Hifz Juz Amma', slot: 'Friday, 06:30 PM', approved: false }
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('Hamza Ali');
  const [homeworkSubject, setHomeworkSubject] = useState('Review Lesson 4: Sukoon & Articulation');
  const [homeworkNote, setHomeworkNote] = useState('Listen to the Halqi throat letters and recite 5 times before next session.');
  const [homeworkAssignedNotice, setHomeworkAssignedNotice] = useState(false);

  const handleApprove = (req: { id: string; student: string; track: string; slot: string }) => {
    setTrialRequests(prev => prev.map(r => r.id === req.id ? { ...r, approved: true } : r));

    if (onAddBooking) {
      const parts = req.slot.split(', ');
      const newBooking: ClassBooking = {
        id: `booking_${Date.now()}`,
        teacherId: 't1',
        teacherName: 'Sheikh Ahmad Al-Masri',
        studentName: req.student.split(' (')[0],
        subject: req.track,
        date: parts[0] || 'Tomorrow',
        timeSlot: parts[1] || '03:00 PM',
        durationMinutes: 30,
        status: 'upcoming',
        homework: 'Initial orientation & articulation assessment.',
        teacherNotes: 'Welcome to Quran Tutor Academy! Excited to begin our lessons.',
        isTrial: true,
        createdAt: new Date().toISOString()
      };
      onAddBooking(newBooking);
    }
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAssignModal(false);
    setHomeworkAssignedNotice(true);
    setTimeout(() => setHomeworkAssignedNotice(false), 2500);
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
              Sheikh Ahmad Al-Masri • Quran & Tajweed Specialist
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="btn-primary"
          style={{ padding: '10px 18px', fontSize: '14px' }}
        >
          <FileText size={16} />
          <span>Assign Homework</span>
        </button>
      </div>

      {homeworkAssignedNotice && (
        <div className="card" style={{ background: '#E8F5E9', border: '1.5px solid var(--success)', color: 'var(--success)' }}>
          <strong>✅ Homework Assigned Successfully!</strong> Updated for {selectedStudent} and sent to the parent portal.
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid-3">
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '8px' }}><Users size={24} /></div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>24 Active</div>
          <div style={{ fontSize: '13px', fontWeight: 600 }}>Enrolled Students</div>
        </div>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ color: 'var(--gold)', marginBottom: '8px' }}><Calendar size={24} /></div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>{bookings.filter(b => b.status === 'upcoming').length} Sessions</div>
          <div style={{ fontSize: '13px', fontWeight: 600 }}>Scheduled in System</div>
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
                  onClick={() => handleApprove(req)}
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

      {/* Assign Homework Modal */}
      {showAssignModal && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '14px' }}>Assign Student Homework</h3>
            <form onSubmit={handleAssignSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Student</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)', background: 'var(--surface)', fontSize: '14px' }}
                >
                  <option value="Hamza Ali">Hamza Ali (Age 7)</option>
                  <option value="Aisha Tariq">Aisha Tariq (Age 10)</option>
                  <option value="Zaid Mansoor">Zaid Mansoor (Age 9)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Topic / Verse Target</label>
                <input
                  type="text"
                  value={homeworkSubject}
                  onChange={(e) => setHomeworkSubject(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)', background: 'var(--surface)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Instructions for Student & Parent</label>
                <textarea
                  value={homeworkNote}
                  onChange={(e) => setHomeworkNote(e.target.value)}
                  rows={3}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border)', background: 'var(--surface)', fontSize: '14px', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAssignModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Assign to Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
