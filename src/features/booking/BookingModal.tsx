import React, { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Teacher, ClassBooking } from '../../types';
import { Calendar, Clock, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FreeBadge } from '../../components/FreeBadge';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  onConfirmBooking: (booking: ClassBooking) => void;
  studentName: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onConfirmBooking,
  studentName
}) => {
  if (!teacher) return null;

  const dates = ['Today', 'Tomorrow', 'Saturday', 'Sunday', 'Monday'];
  const [selectedDate, setSelectedDate] = useState(dates[1]);
  const [selectedSlot, setSelectedSlot] = useState(teacher.availableSlots[0] || '10:00 AM');
  const [selectedSubject, setSelectedSubject] = useState(teacher.subjects[0] || 'Quran Recitation');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleBooking = () => {
    const newBooking: ClassBooking = {
      id: `booking_${Date.now()}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      studentName: studentName,
      subject: selectedSubject,
      date: selectedDate,
      timeSlot: selectedSlot,
      durationMinutes: 30,
      status: 'upcoming',
      homework: 'Prepare your Mushaf or digital reader for orientation.',
      teacherNotes: 'Welcome to your trial class! Looking forward to reviewing Makharij together.',
      isTrial: true,
      createdAt: new Date().toISOString()
    };
    onConfirmBooking(newBooking);
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 1800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={confirmed ? 'Booking Confirmed! 🎉' : `Book Free 1-on-1 Session`}>
      {confirmed ? (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary-container)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>Masha'Allah! You are scheduled</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Your 1-on-1 session with <strong>{teacher.name}</strong> is set for <strong>{selectedDate} at {selectedSlot}</strong>.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
            Redirecting to your classes dashboard...
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Teacher Summary Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            background: 'var(--surface-variant)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              {teacher.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{teacher.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{teacher.title}</div>
            </div>
            <FreeBadge />
          </div>

          {/* Select Date */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
              Select Date:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {dates.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13px',
                    fontWeight: selectedDate === d ? 700 : 500,
                    border: `1.5px solid ${selectedDate === d ? 'var(--primary)' : 'var(--border)'}`,
                    background: selectedDate === d ? 'var(--primary-container)' : 'var(--surface)',
                    color: selectedDate === d ? 'var(--on-primary-container)' : 'var(--text-main)'
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Select Time Slot */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
              Available Time Slots:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {teacher.availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13px',
                    fontWeight: selectedSlot === slot ? 700 : 500,
                    border: `1.5px solid ${selectedSlot === slot ? 'var(--primary)' : 'var(--border)'}`,
                    background: selectedSlot === slot ? 'var(--primary-container)' : 'var(--surface)',
                    color: selectedSlot === slot ? 'var(--on-primary-container)' : 'var(--text-main)'
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Focus */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
              Learning Subject:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {teacher.subjects.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubject(sub)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    fontWeight: selectedSubject === sub ? 700 : 500,
                    border: `1.5px solid ${selectedSubject === sub ? 'var(--gold)' : 'var(--border)'}`,
                    background: selectedSubject === sub ? 'var(--gold-container)' : 'var(--surface)',
                    color: selectedSubject === sub ? 'var(--on-gold-container)' : 'var(--text-main)'
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Cost breakdown guarantee */}
          <div style={{
            padding: '12px 14px',
            background: 'var(--primary-container)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            color: 'var(--on-primary-container)'
          }}>
            <ShieldCheck size={20} />
            <span>
              <strong>Total Cost: $0.00</strong> (100% Free Forever supported by Waqf endowment).
            </span>
          </div>

          <button
            onClick={handleBooking}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '16px' }}
          >
            Confirm Free Class Session
          </button>
        </div>
      )}
    </Modal>
  );
};
