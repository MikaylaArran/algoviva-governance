// ── MODAL ──
export function Modal({ id, open, onClose, title, subtitle, children, wide }) {
  if (!open) return null;
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ display:'flex', position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:1000, alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'white', width:'100%', maxWidth: wide ? 700 : 560, maxHeight:'85vh', overflowY:'auto', boxShadow:'var(--shadow-lg)', animation:'slideUp 0.25s ease' }}>
        <div style={{ background:'var(--ink)', color:'white', padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            {subtitle && <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:4 }}>{subtitle}</div>}
            <h2 style={{ color:'white', fontSize:18, fontWeight:700, fontFamily:'var(--font-display)' }}>{title}</h2>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', fontSize:20, cursor:'pointer', marginTop:-4, flexShrink:0, lineHeight:1 }}>✕</button>
        </div>
        <div style={{ padding:28 }}>{children}</div>
      </div>
    </div>
  );
}

// ── TAG ──
const TAG_STYLES = {
  enacted:    { color:'#1a3a2a', background:'#e6f0ea' },
  draft:      { color:'#b45309', background:'#fef3e2' },
  guidelines: { color:'#1e3a5f', background:'#e8eef6' },
  standard:   { color:'#1e3a5f', background:'#e8eef6' },
  alert:      { color:'#c0392b', background:'#fdf0ee' },
  none:       { color:'#888',    background:'#ebebeb' },
};

export function Tag({ status, small }) {
  const s = TAG_STYLES[status] || TAG_STYLES.none;
  return (
    <span style={{ display:'inline-block', fontFamily:'var(--font-mono)', fontSize: small ? 9 : 10, fontWeight:500, letterSpacing:1, textTransform:'uppercase', padding: small ? '2px 6px' : '3px 8px', border:'1px solid currentColor', color:s.color, background:s.background }}>
      {status}
    </span>
  );
}

// ── BADGE ──
const BADGE_BG = { MUST:'#c0392b', SHOULD:'#b45309', CONSIDER:'#1e3a5f' };
export function Badge({ severity }) {
  return (
    <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1, padding:'2px 6px', color:'white', background: BADGE_BG[severity] || '#888', marginRight:6 }}>
      {severity}
    </span>
  );
}

// ── SECTION LABEL ──
export function SectionLabel({ children, style }) {
  return (
    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, fontWeight:500, letterSpacing:2, textTransform:'uppercase', color:'var(--text3)', marginBottom:6, ...style }}>
      {children}
    </div>
  );
}

// ── BUTTON ──
export function Btn({ children, onClick, variant='primary', size='md', href, style }) {
  const base = { display:'inline-flex', alignItems:'center', gap:8, fontFamily:'var(--font)', fontWeight:600, letterSpacing:'0.01em', cursor:'pointer', border:'none', transition:'all 0.2s', textDecoration:'none', ...style };
  const sizes = { sm:{ padding:'6px 14px', fontSize:12 }, md:{ padding:'10px 20px', fontSize:13 } };
  const variants = {
    primary: { background:'var(--ink)',  color:'white' },
    outline: { background:'transparent', border:'1.5px solid var(--ink)', color:'var(--ink)' },
    dark:    { background:'var(--ink)',  color:'white' },
  };
  const props = { style:{ ...base, ...sizes[size], ...variants[variant] }, onClick };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    : <button {...props}>{children}</button>;
}

// ── FILTER BTN ──
export function FilterBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 14px',
      background: active ? 'var(--ink)' : 'white',
      border: active ? '1.5px solid var(--ink)' : '1.5px solid var(--border)',
      color: active ? 'white' : 'var(--text)',
      fontFamily: 'var(--font)',
      fontSize: 12,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.15s',
    }}>
      {children}
    </button>
  );
}

// ── ADVISORY STRIP ──
export function AdvisoryStrip({ country, sector }) {
  const subject = encodeURIComponent(`Advisory Request — ${country || 'General'}${sector ? ' / ' + sector : ''}`);
  return (
    <div style={{
      background: 'var(--ink)',
      color: 'white',
      padding: '20px 24px',
      marginTop: 20,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
      borderLeft: '4px solid #4f8ef7',
    }}>
      <p style={{ fontSize:13, color:'rgba(255,255,255,0.7)', lineHeight:1.6, maxWidth:540, fontFamily:'var(--font)' }}>
        <strong style={{ color:'white' }}>Need a tailored compliance review?</strong> AlgoViva provides contextually grounded advisory for AI builders in Africa and emerging markets — integrating legal, ethical, and technical dimensions specific to your jurisdiction and sector.
      </p>
      <div style={{ textAlign:'right', flexShrink:0 }}>
        <a href={`mailto:advisory@algoviva.com?subject=${subject}`} style={{ color:'#4f8ef7', textDecoration:'none', fontWeight:600, fontSize:13, display:'block', marginBottom:4, fontFamily:'var(--font)' }}>
          Book a call with AlgoViva →
        </a>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:'var(--font-mono)', lineHeight:1.5 }}>
          Informational only — not legal advice.<br />Consult a qualified lawyer before deployment.
        </div>
      </div>
    </div>
  );
}

// ── CITE LINK ──
export function CiteLink({ citeRef, citeText, onOpen }) {
  return (
    <button onClick={() => onOpen(citeRef, citeText)} style={{
      color: '#4f8ef7',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      cursor: 'pointer',
      borderBottom: '1px dashed #4f8ef7',
      background: 'none',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: 0,
      lineHeight: 1.4,
    }}>
      {citeRef}
    </button>
  );
}