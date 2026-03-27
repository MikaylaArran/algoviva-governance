import { useState, useMemo } from 'react';
import { LIBRARY } from '../data';
import { Tag, FilterBtn, SectionLabel } from '../components/UI';

const CAT_FILTERS = [
  { id: 'all',           label: 'All' },
  { id: 'enacted',       label: 'Enacted' },
  { id: 'draft',         label: 'Draft' },
  { id: 'standard',      label: 'Standards' },
  { id: 'Africa',        label: 'Africa' },
  { id: 'Europe',        label: 'Europe' },
  { id: 'Americas',      label: 'Americas' },
  { id: 'Asia-Pacific',  label: 'Asia-Pacific' },
  { id: 'International', label: 'International' },
];

export default function Library() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return LIBRARY.filter(r => {
      const matchCat = filter === 'all' ? true
        : ['enacted','draft','standard','guidelines'].includes(filter) ? r.status === filter
        : r.region === filter;
      const matchQ = !q
        || r.name.toLowerCase().includes(q)
        || r.country.toLowerCase().includes(q)
        || (r.themes || []).some(t => t.toLowerCase().includes(q))
        || (r.desc || '').toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, filter]);

  const thStyle = {
    padding: '10px 12px',
    textAlign: 'left',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--text3)',
    borderBottom: '2px solid var(--border)',
    background: 'var(--surface)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid var(--surface2)',
    verticalAlign: 'top',
    fontSize: 13,
  };

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(18px, 4vw, 22px)', marginBottom:6 }}>Regulation Library</h2>
        <p style={{ fontFamily:'var(--font)', color:'var(--text2)', fontSize:14 }}>All indexed AI laws, data protection acts, sectoral guidelines, and international standards.</p>
      </div>

      {/* Controls */}
      <div style={{ display:'flex', gap:6, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, country, theme…"
          style={{ flex:1, minWidth:180, maxWidth:320, padding:'9px 14px', border:'1.5px solid var(--border)', fontFamily:'var(--font)', fontSize:13, outline:'none', background:'white' }}
        />
        {CAT_FILTERS.map(f => (
          <FilterBtn key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</FilterBtn>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text3)', marginBottom:12 }}>
        Showing {filtered.length} of {LIBRARY.length} regulations
      </div>

      {/* Desktop table */}
      <div className="lib-table-wrap" style={{ border:'1px solid var(--border)', overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', background:'white', minWidth:600 }}>
            <thead>
              <tr>
                <th style={thStyle}>Regulation / Standard</th>
                <th style={thStyle}>Jurisdiction</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle }} className="lib-region-col">Region</th>
                <th style={thStyle}>Document</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ ...tdStyle, textAlign:'center', color:'var(--text3)', padding:32, fontFamily:'var(--font)' }}>
                    No regulations match this filter.
                  </td>
                </tr>
              ) : filtered.map((r, i) => (
                <tr key={i}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                  <td style={tdStyle}>
                    <div style={{ fontFamily:'var(--font)', fontWeight:600 }}>
                      {r.name} <span style={{ color:'var(--text3)', fontWeight:400 }}>({r.year})</span>
                    </div>
                    <div style={{ fontFamily:'var(--font)', fontSize:12, color:'var(--text2)', marginTop:4, lineHeight:1.5 }}>{r.desc}</div>
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginTop:6 }}>
                      {(r.themes || []).map(t => (
                        <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'2px 6px', background:'var(--surface2)', color:'var(--text3)', letterSpacing:'0.5px' }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, fontFamily:'var(--font)', color:'var(--text2)', whiteSpace:'nowrap' }}>{r.country}</td>
                  <td style={{ ...tdStyle, whiteSpace:'nowrap' }}><Tag status={r.status} small /></td>
                  <td style={{ ...tdStyle, fontFamily:'var(--font)', fontSize:12, color:'var(--text2)', whiteSpace:'nowrap' }} className="lib-region-col">{r.region}</td>
                  <td style={{ ...tdStyle, whiteSpace:'nowrap' }}>
                    {r.url
                      ? <a href={r.url} target="_blank" rel="noopener noreferrer"
                          style={{ color:'#4f8ef7', fontFamily:'var(--font-mono)', fontSize:11, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:3 }}>
                          ↗ Open
                        </a>
                      : <span style={{ color:'var(--text3)' }}>—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lib-region-col { display: none !important; }
        }
      `}</style>
    </div>
  );
}