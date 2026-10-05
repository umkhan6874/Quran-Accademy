import React, { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Mic, MicOff, Video, VideoOff, Hand, Send, CheckCircle, Clock, School, Award, Sparkles } from 'lucide-react';
import { ayahsDataMap } from '../../data/quranData';

interface LiveClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteClass: () => void;
  teacherName?: string;
  studentName?: string;
}

export const LiveClassroomModal: React.FC<LiveClassroomModalProps> = ({
  isOpen,
  onClose,
  onCompleteClass,
  teacherName = 'Sheikh Ahmad Al-Masri',
  studentName = 'Hamza Ali'
}) => {
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [activeAyah, setActiveAyah] = useState(1);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: teacherName, text: 'Assalamu Alaikum! Welcome to today\'s Tajweed recitation lesson.', time: '10:00 AM' },
    { sender: 'System', text: `${studentName} entered the virtual classroom.`, time: '10:01 AM' },
    { sender: teacherName, text: 'Let us recite Surah Al-Fatihah together. Watch my highlighter on the screen.', time: '10:02 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [classFinished, setClassFinished] = useState(false);

  const ayahs = ayahsDataMap[1] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'You', text: chatInput, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: teacherName, text: 'Ahsant! Very clear pronunciation. Notice the Sukoon on the letter Noon.', time: 'Just now' }
      ]);
    }, 1200);
  };

  const handleEndClass = () => {
    setClassFinished(true);
  };

  const handleConfirmFinish = () => {
    onCompleteClass();
    setClassFinished(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="900px" title="">
      {classFinished ? (
        <div style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--gold-container)',
            color: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <Award size={40} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Class Successfully Completed!</h3>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 20px auto' }}>
            Masha'Allah! You practiced 30 minutes of live 1-on-1 Quran tutoring with {teacherName}.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary-container)',
            color: 'var(--on-primary-container)',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            marginBottom: '24px'
          }}>
            <Sparkles size={18} />
            <span>+25 Stars Earned for Today's Quran Journey!</span>
          </div>
          <div>
            <button onClick={handleConfirmFinish} className="btn-primary" style={{ padding: '14px 28px' }}>
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10B981',
                animation: 'pulse 1.5s infinite'
              }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Live Virtual Classroom</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{teacherName} & {studentName}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--primary)'
              }}>
                <Clock size={16} />
                <span>28:15 Remaining</span>
              </div>
              <button
                onClick={handleEndClass}
                style={{
                  background: 'var(--danger)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: 700
                }}
              >
                End Session
              </button>
            </div>
          </div>

          {/* Videos Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px'
          }}>
            {/* Teacher Video Tile */}
            <div style={{
              background: '#07382E',
              borderRadius: 'var(--radius-md)',
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.6)',
                color: 'var(--gold-light)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                TUTOR • LIVE
              </span>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <School size={24} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>{teacherName}</div>
              <div style={{ fontSize: '11px', color: 'var(--gold-light)' }}>🎙️ Speaking (Tajweed Guide)</div>
            </div>

            {/* Student Video Tile */}
            <div style={{
              background: 'var(--surface-variant)',
              borderRadius: 'var(--radius-md)',
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              border: '1px solid var(--border)'
            }}>
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'var(--primary-container)',
                color: 'var(--on-primary-container)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                STUDENT
              </span>
              {handRaised && (
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'var(--gold)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  ✋ Hand Raised
                </span>
              )}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: cameraOn ? 'var(--primary)' : 'var(--text-muted)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                {cameraOn ? studentName[0] : <VideoOff size={22} />}
              </div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>{studentName}</div>
              <div style={{ fontSize: '11px', color: micMuted ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                {micMuted ? 'Muted' : 'Microphone Active'}
              </div>
            </div>
          </div>

          {/* Shared Mushaf Whiteboard Screen */}
          <div style={{
            background: 'var(--surface)',
            border: '2px solid var(--primary-container)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px' }}>
                SHARED WHITEBOARD & MUSHAF
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Click any verse to discuss with teacher
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {ayahs.slice(0, 4).map((ayah) => {
                const isHighlight = ayah.ayahNumber === activeAyah;
                return (
                  <div
                    key={ayah.ayahNumber}
                    onClick={() => setActiveAyah(ayah.ayahNumber)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isHighlight ? 'var(--gold-container)' : 'transparent',
                      border: isHighlight ? '1.5px solid var(--gold)' : '1px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '11px', color: isHighlight ? 'var(--on-gold-container)' : 'var(--text-muted)', fontWeight: 600 }}>
                      {isHighlight ? '👉 Teacher Focus' : `Ayah ${ayah.ayahNumber}`}
                    </span>
                    <span className="arabic-text" style={{ fontSize: '18px', fontWeight: 700, color: isHighlight ? 'var(--on-gold-container)' : 'var(--text-main)' }}>
                      {ayah.arabicText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Chat & Controls */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Audio & Media Controls */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setMicMuted(!micMuted)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: micMuted ? 'var(--danger)' : 'var(--primary-container)',
                  color: micMuted ? '#FFFFFF' : 'var(--on-primary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                {micMuted ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{micMuted ? 'Unmute' : 'Mute'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCameraOn(!cameraOn)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: !cameraOn ? 'var(--danger)' : 'var(--primary-container)',
                  color: !cameraOn ? '#FFFFFF' : 'var(--on-primary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                {cameraOn ? <Video size={16} /> : <VideoOff size={16} />}
                <span>{cameraOn ? 'Camera On' : 'Camera Off'}</span>
              </button>

              <button
                type="button"
                onClick={() => setHandRaised(!handRaised)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: handRaised ? 'var(--gold)' : 'var(--surface-variant)',
                  color: handRaised ? '#FFFFFF' : 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                <Hand size={16} />
                <span>{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
              </button>
            </div>

            {/* Chat Box */}
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{
                maxHeight: '90px',
                overflowY: 'auto',
                padding: '8px',
                background: 'var(--surface-variant)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '12px'
              }}>
                {messages.slice(-3).map((m, i) => (
                  <div key={i}>
                    <strong>{m.sender}: </strong>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message to your teacher..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    fontSize: '13px'
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 12px' }}>
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
