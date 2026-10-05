import React, { useState } from 'react';
import { AiChatMessage } from '../types';
import { Sparkles, Send, Mic, Info, ArrowLeft, Bot, User, CheckCircle2 } from 'lucide-react';
import { FreeBadge } from '../components/FreeBadge';

interface AiTutorPageProps {
  onBack: () => void;
  isKidsMode: boolean;
  onToggleKidsMode: () => void;
}

export const AiTutorPage: React.FC<AiTutorPageProps> = ({
  onBack,
  isKidsMode,
  onToggleKidsMode
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'm1',
      sender: 'ustadhi',
      text: 'Assalamu Alaikum! I am your AI Quran Tutor. How can I assist your Quran journey today? Ask me about Tajweed rules, letter articulation points (Makharij), or verse meanings.',
      arabicQuote: 'رَّبِّ زِدْنِي عِلْمًا',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [recitationPracticeActive, setRecitationPracticeActive] = useState(false);

  const presetChips = [
    'Explain Qalqalah letters with examples',
    'What does Ikhfa mean in Tajweed?',
    'How do I pronounce letter ع (Ain) vs ء (Hamza)?',
    'Explain meaning of Surah Al-Fatiha',
    'Best daily routine for memorizing Quran'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: AiChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const reply = generateAiResponse(q, isKidsMode);
      setMessages(prev => [...prev, reply]);
      setIsThinking(false);
    }, 1000);
  };

  const generateAiResponse = (query: string, kids: boolean): AiChatMessage => {
    const lower = query.toLowerCase();

    if (lower.includes('qalqalah') || lower.includes('echo')) {
      return {
        id: `ust_${Date.now()}`,
        sender: 'ustadhi',
        text: kids
          ? 'Imagine bouncing a colorful rubber ball on the floor! Qalqalah makes a joyful echoing bounce sound on 5 special letters: Qaf (ق), Taa (ط), Baa (ب), Jeem (ج), Daal (د). Remember the secret phrase: "Qutb Jad" (قُطْبُ جَدّ)! When you stop on them, make them bounce!'
          : 'Qalqalah (القلقلة) refers to an echoing or bouncing resonance when releasing one of the 5 Qalqalah letters (grouped as Qutb Jad: ق، ط، ب، ج، د) when they carry a Sukoon or when pausing at verse end. There is Qalqalah Sughra (light bounce in the middle of a word) and Kubra (strong bounce at the end of an ayah).',
        arabicQuote: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        timestamp: 'Just now'
      };
    }

    if (lower.includes('ikhfa') || lower.includes('hide')) {
      return {
        id: `ust_${Date.now()}`,
        sender: 'ustadhi',
        text: kids
          ? 'Ikhfa is like playing friendly hide-and-seek with the letter Noon! Instead of saying "N" loudly, we tuck it softly inside our nose for 2 counts before saying the next letter. Try it with "Min Qablu"!'
          : 'Ikhfa (الإخفاء) literally means "concealment". In Tajweed, when a Noon Saakin or Tanween is followed by any of the 15 Ikhfa letters (ت، ث، ج، د، ذ، ز...), we pronounce the Noon between Izhar and Idgham with a gentle 2-count nasal tone (Ghunnah).',
        arabicQuote: 'مِن قَبْلُ',
        timestamp: 'Just now'
      };
    }

    if (lower.includes('ain') || lower.includes('ayn') || lower.includes('hamza')) {
      return {
        id: `ust_${Date.now()}`,
        sender: 'ustadhi',
        text: 'Hamzah (ء) comes from the deepest bottom of your throat (vocal cords) with an abrupt, crisp stop. In contrast, \'Ayn (ع) comes from the middle of the throat (Adna al-Halq); gently squeeze the middle of your throat as if savoring a warm sip of water to achieve that authentic classical resonance.',
        arabicQuote: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        timestamp: 'Just now'
      };
    }

    if (lower.includes('fatiha') || lower.includes('meaning')) {
      return {
        id: `ust_${Date.now()}`,
        sender: 'ustadhi',
        text: 'Surah Al-Fatihah is known as "Umm al-Kitab" (Mother of the Book) and "The Seven Oft-Repeated Verses". It encapsulates Allah\'s praise, His supreme mercy, the reality of the Day of Judgment, our pledge of monotheistic worship, and our plea for divine guidance on the Straight Path.',
        arabicQuote: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        timestamp: 'Just now'
      };
    }

    return {
      id: `ust_${Date.now()}`,
      sender: 'ustadhi',
      text: 'That is a blessed area of study. With steady daily practice, sincerity, and proper articulation, Allah opens every door. Remember the Prophet ﷺ said: "The one who recites the Quran beautifully is with the noble angels, and the one who stutters and finds it difficult gets double the reward!"',
      arabicQuote: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      timestamp: 'Just now'
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 180px)', minHeight: '520px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn-outline" style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800 }}>Ustadhi AI Quran Tutor</h1>
              <FreeBadge />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Ask Tajweed, pronunciation, vocabulary & verse meaning questions
            </p>
          </div>
        </div>

        <button
          onClick={onToggleKidsMode}
          className="btn-outline"
          style={{
            padding: '8px 14px',
            fontSize: '13px',
            background: isKidsMode ? 'var(--gold-container)' : 'var(--surface)',
            color: isKidsMode ? 'var(--on-gold-container)' : 'var(--text-main)',
            borderColor: isKidsMode ? 'var(--gold)' : 'var(--border)'
          }}
        >
          <span>{isKidsMode ? '🌟 Kids Mode Active' : 'Switch to Kids Mode'}</span>
        </button>
      </div>

      {/* Educational Scope Notice */}
      <div style={{
        background: 'var(--primary-container)',
        padding: '10px 14px',
        borderRadius: 'var(--radius-md)',
        fontSize: '12px',
        color: 'var(--on-primary-container)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Info size={16} style={{ flexShrink: 0 }} />
        <span>
          Ustadhi AI is an educational study tool for Tajweed and phonetics. For formal fatwas or Islamic rulings, please consult verified scholars.
        </span>
      </div>

      {/* Chat Messages Stream */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '8px'
      }}>
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {!isUser && (
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{
                background: isUser ? 'var(--primary)' : 'var(--surface)',
                color: isUser ? '#FFFFFF' : 'var(--text-main)',
                border: isUser ? 'none' : '1px solid var(--border)',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {!isUser && m.arabicQuote && (
                  <div className="arabic-text" style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    background: 'var(--primary-container)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '10px',
                    textAlign: 'center'
                  }}>
                    {m.arabicQuote}
                  </div>
                )}
                <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{m.text}</p>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
            <Sparkles size={16} className="animate-spin" />
            <span>Ustadhi AI is reviewing Tajweed rules...</span>
          </div>
        )}
      </div>

      {/* Recitation Simulator Modal Preview */}
      {recitationPracticeActive && (
        <div className="card" style={{ border: '2px solid var(--gold)', background: 'var(--gold-container)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontWeight: 800, fontSize: '15px' }}>🎤 Recitation Practice Coach</h4>
            <button onClick={() => setRecitationPracticeActive(false)} style={{ fontSize: '12px', fontWeight: 600 }}>Close</button>
          </div>
          <div className="arabic-text" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)', textAlign: 'center', marginBottom: '8px' }}>
            قُلْ هُوَ اللَّهُ أَحَدٌ
          </div>
          <p style={{ fontSize: '12px', color: 'var(--on-gold-container)' }}>
            🎙️ AI Pronunciation Assessment: 96% Accuracy. Excellent Qalqalah bounce on the letter Daal (د).
          </p>
        </div>
      )}

      {/* Preset Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {presetChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap'
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
      >
        <button
          type="button"
          onClick={() => setRecitationPracticeActive(true)}
          className="btn-outline"
          style={{ padding: '12px', borderRadius: 'var(--radius-md)' }}
          title="Recitation Practice"
        >
          <Mic size={18} />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Tajweed, letters, or verses..."
          style={{
            flex: 1,
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text-main)',
            fontSize: '14px'
          }}
        />

        <button type="submit" className="btn-primary" style={{ padding: '14px 20px' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
