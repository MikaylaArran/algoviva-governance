const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'map', label: 'Regulatory Map' },
  { id: 'buildtrack', label: 'Build & Track' },
  { id: 'library', label: 'Regulation Library' },
  { id: 'intel', label: 'Intelligence Feed' },
];

export default function Header({ activeSection, onNav }) {
  return (
    <>
      <header style={{ background:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', height:60, position:'sticky', top:0, zIndex:100, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontWeight:800, fontSize:18, letterSpacing:'-0.3px', color:'white' }}>
          <div style={{ width:28, height:28, background:'var(--accent2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'white', flexShrink:0 }}>AV</div>
          AlgoViva
          <span style={{ color:'rgba(255,255,255,0.4)', fontWeight:400, fontSize:13, marginLeft:8 }}>AI Governance Platform</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'rgba(255,255,255,0.4)', fontFamily:'DM Mono, monospace' }}>
          <div style={{ width:6, height:6, background:'#3ecf6e', borderRadius:'50%', animation:'pulse 2s infinite' }} />
          Data updated monthly &nbsp;|&nbsp; Not legal advice
        </div>
      </header>

      <nav style={{ background:'var(--ink2)', display:'flex', padding:'0 32px', borderBottom:'1px solid rgba(255,255,255,0.05)', overflowX:'auto' }}>
        {NAV_ITEMS.map(s => (
          <button key={s.id} onClick={() => onNav(s.id)} style={{
            background:'none', border:'none',
            color: activeSection === s.id ? 'white' : 'rgba(255,255,255,0.45)',
            fontSize:12, fontWeight:600, letterSpacing:'0.8px', textTransform:'uppercase',
            padding:'14px 20px', cursor:'pointer', whiteSpace:'nowrap',
            borderBottom: activeSection === s.id ? '2px solid var(--accent2)' : '2px solid transparent',
            transition:'all 0.2s',
          }}>{s.label}</button>
        ))}
      </nav>
    </>
  );
}
