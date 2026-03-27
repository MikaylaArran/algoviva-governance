const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'map',        label: 'Regulatory Map' },
  { id: 'buildtrack', label: 'Build & Track' },
  { id: 'library',    label: 'Regulation Library' },
  { id: 'intel',      label: 'Intelligence Feed' },
];

export default function Header({ activeSection, onNav }) {
  return (
    <>
      <header style={{
        background: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: 64,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img
            src="/algoviva-logo.png"
            alt="AlgoViva"
            style={{ height: 32, width: 'auto', objectFit: 'contain' }}
          />
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)' }} />
          <span style={{
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

        <div style={{
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
      </header>

      <nav style={{
        background: 'var(--ink2)',
        display: 'flex',
        padding: '0 32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflowX: 'auto',
      }}>
        {NAV_ITEMS.map(s => (
          <button
            key={s.id}
            onClick={() => onNav(s.id)}
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
              borderBottom: activeSection === s.id ? '2px solid var(--accent2)' : '2px solid transparent',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </>
  );
}