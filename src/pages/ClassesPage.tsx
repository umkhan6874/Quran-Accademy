import React, { useState } from 'react';
import { ClassBooking } from '../types';
import { Calendar, Video, Clock, CheckCircle2, ArrowLeft, Plus, AlertCircle, FileText } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface ClassesPageProps {
  onBack: () => void;
  bookings: ClassBooking[];
  onJoinClassroom: (booking: ClassBooking) => void;
  onCancelBooking: (id: string) => void;
  onFindNewTeacher: () => void;
}

export const ClassesPage: React.FC<ClassesPageProps> = ({
  onBack,
  bookings,
  onJoinClassroom,
  onCancelBooking,
  onFindNewTeacher
}) => {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  const listToShow = tab === 'upcoming' ? upcomingBookings : completedBookings;

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
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>My Quran Classes</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              1-on-1 Sessions, Teacher Feedback & Assigned Homework
            </p>
          </div>
        </div>

        <button onClick={onFindNewTeacher} className="btn-primary" style={{ padding: '10px 18px', fontSize: '14px' }}>
          <Plus size={16} />
          <span>Book Free Class</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
        <button
          onClick={() => setTab('upcoming')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontWeight: tab === 'upcoming' ? 700 : 500,
            background: tab === 'upcoming' ? 'var(--primary-container)' : 'transparent',
            color: tab === 'upcoming' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '14px'
          }}
        >
          Upcoming Sessions ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setTab('completed')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontWeight: tab === 'completed' ? 700 : 500,
            background: tab === 'completed' ? 'var(--primary-container)' : 'transparent',
            color: tab === 'completed' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '14px'
          }}
        >
          Completed History ({completedBookings.length})
        </button>
      </div>

      {/* Classes List */}
      {listToShow.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--surface-variant)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <Calendar size={32} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
            {tab === 'upcoming' ? 'No Upcoming Classes Scheduled' : 'No Completed Sessions Yet'}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 20px auto' }}>
            {tab === 'upcoming'
              ? 'Choose a certified Quran instructor and schedule your free 1-on-1 trial class anytime.'
              : 'Once you attend a live session, teacher notes and homework will be archived here.'}
          </p>
          {tab === 'upcoming' && (
            <button onClick={onFindNewTeacher} className="btn-primary">
              Browse Verified Instructors
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {listToShow.map((booking) => (
            <div key={booking.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--primary-container)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}>
                    {booking.teacherName[0]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800 }}>{booking.teacherName}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {booking.date} at {booking.timeSlot} • {booking.durationMinutes} mins
                    </div>
                  </div>
                </div>

                <span style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: booking.status === 'upcoming' ? 'var(--primary-container)' : 'var(--gold-container)',
                  color: booking.status === 'upcoming' ? 'var(--on-primary-container)' : 'var(--on-gold-container)'
                }}>
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
                Subject: {booking.subject}
              </div>

              {/* Homework / Notes Box */}
              <div style={{
                background: 'var(--surface-variant)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>
                  <FileText size={14} />
                  <span>{booking.status === 'upcoming' ? 'Teacher Homework & Orientation:' : 'Teacher Feedback:'}</span>
                </div>
                <p style={{ color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {booking.status === 'upcoming' ? booking.homework : booking.teacherNotes}
                </p>
              </div>

              {booking.status === 'upcoming' && (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="btn-outline"
                    style={{ color: 'var(--danger)', borderColor: 'var(--border)' }}
                  >
                    Cancel Class
                  </button>
                  <button
                    onClick={() => onJoinClassroom(booking)}
                    className="btn-primary"
                  >
                    <Video size={16} />
                    <span>Enter Live Classroom</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
