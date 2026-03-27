import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'map',        label: 'Regulatory Map' },
  { id: 'buildtrack', label: 'Build & Track' },
  { id: 'library',    label: 'Regulation Library' },
  { id: 'intel',      label: 'Intelligence Feed' },
];

export default function Header({ activeSection, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(id) {
    onNav(id);
    setMenuOpen(false);
  }

  return (
    <>
      <header style={{
        background: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 64,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src="/algoviva-logo.png"
            alt="AlgoViva"
            style={{ height: 30, width: 'auto', objectFit: 'contain' }}
          />
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)' }} />
          <span className="header-subtitle" style={{
            fontFamily: 'var(--font)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
          }}>
            AI Governance Platform
          </span>
        </div>

        {/* Right — desktop */}
        <div className="header-right" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.02em',
        }}>
          <div style={{
            width: 6, height: 6,
            background: '#34d399',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
          }} />
          Data updated monthly &nbsp;·&nbsp; Not legal advice
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: 22,
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1,
          }}
          className="hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Desktop nav */}
      <nav style={{
        background: 'var(--ink2)',
        display: 'flex',
        padding: '0 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflowX: 'auto',
      }}
        className="desktop-nav"
      >
        {NAV_ITEMS.map(s => (
          <button
            key={s.id}
            onClick={() => handleNav(s.id)}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === s.id ? 'white' : 'rgba(255,255,255,0.42)',
              fontFamily: 'var(--font)',
              fontSize: 12,
              fontWeight: activeSection === s.id ? 600 : 500,
              letterSpacing: '0.02em',
              padding: '0 18px',
              height: 44,
              cursor: 'pointer',
              borderBottom: activeSection === s.id ? '2px solid #4f8ef7' : '2px solid transparent',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          background: 'var(--ink)',
          zIndex: 99,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          animation: 'fadeIn 0.2s ease',
        }}>
          {NAV_ITEMS.map(s => (
            <button
              key={s.id}
              onClick={() => handleNav(s.id)}
              style={{
                display: 'block',
                width: '100%',
                padding: '16px 24px',
                background: activeSection === s.id ? 'var(--ink2)' : 'none',
                border: 'none',
                borderLeft: activeSection === s.id ? '3px solid #4f8ef7' : '3px solid transparent',
                color: activeSection === s.id ? 'white' : 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font)',
                fontSize: 14,
                fontWeight: activeSection === s.id ? 600 : 400,
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {s.label}
            </button>
          ))}
          <div style={{
            padding: '14px 24px',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{ width: 6, height: 6, background: '#34d399', borderRadius: '50%' }} />
            Data updated monthly · Not legal advice
          </div>
        </div>
      )}

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: block !important; }
          .desktop-nav { display: none !important; }
          .header-subtitle { display: none !important; }
          .header-right { display: none !important; }
        }
      `}</style>
    </>
  );
}