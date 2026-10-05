import React, { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Mail, Lock, User, Check, Sparkles } from 'lucide-react';
import { FreeBadge } from '../../components/FreeBadge';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('Hamza Ali');
  const [email, setEmail] = useState('hamza@example.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess(name || 'Learner', email || 'learner@quranacademy.org');
    onClose();
  };

  const handleGuest = () => {
    onAuthSuccess('Guest Learner', 'guest@quranacademy.org');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isSignUp ? 'Create Free Account' : 'Sign In to Academy'}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--primary-container)',
          fontSize: '12px',
          color: 'var(--on-primary-container)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} />
          <span>100% Free Forever. No credit card, no subscription, no hidden charges.</span>
        </div>

        {isSignUp && (
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zayd Mansoor"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text-main)',
                  fontSize: '14px'
                }}
              />
              <User size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
            </div>
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
            Email Address
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              style={{
                width: '100%',
                padding: '12px 14px 12px 38px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-main)',
                fontSize: '14px'
              }}
            />
            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 14px 12px 38px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-main)',
                fontSize: '14px'
              }}
            />
            <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            🔒 Safe simulation: Passwords are never stored in browser storage.
          </span>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '6px' }}>
          {isSignUp ? 'Create Free Account' : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={handleGuest}
          className="btn-outline"
          style={{ width: '100%', padding: '12px' }}
        >
          Continue as Guest
        </button>

        <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account yet? "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up Free'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
