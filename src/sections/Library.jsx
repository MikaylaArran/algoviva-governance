import { useState, useMemo } from 'react';
import { LIBRARY } from '../data';
import { Tag, FilterBtn, SectionLabel, Modal, Btn } from '../components/UI';

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

export default function Library({ isMobile }) {
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('all');
  const [selected, setSelected]   = useState(null);

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
        || (r.desc || '').toLowerCase().includes(q)
        || (r.summary || '').toLowerCase().includes(q);
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
        <p style={{ fontFamily:'var(--font)', color:'var(--text2)', fontSize:14 }}>
          All indexed AI laws, data protection acts, sectoral guidelines, and international standards. Click any row to read a summary.
        </p>
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
        Showing {filtered.length} of {LIBRARY.length} regulations — click any row to read summary
      </div>

      {/* Table */}
      <div style={{ border:'1px solid var(--border)', overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', background:'white', minWidth:600 }}>
            <thead>
              <tr>
                <th style={thStyle}>Regulation / Standard</th>
                <th style={thStyle}>Jurisdiction</th>
                <th style={thStyle}>Status</th>
                {!isMobile && <th style={thStyle}>Region</th>}
                <th style={thStyle}>Document</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={isMobile ? 4 : 5} style={{ ...tdStyle, textAlign:'center', color:'var(--text3)', padding:32, fontFamily:'var(--font)' }}>
                    No regulations match this filter.
                  </td>
                </tr>
              ) : filtered.map((r, i) => (
                <tr key={i}
                  onClick={() => setSelected(r)}
                  style={{ cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
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
                  {!isMobile && <td style={{ ...tdStyle, fontFamily:'var(--font)', fontSize:12, color:'var(--text2)', whiteSpace:'nowrap' }}>{r.region}</td>}
                  <td style={{ ...tdStyle, whiteSpace:'nowrap' }}>
                    {r.url
                      ? <a href={r.url} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
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

      {/* Detail Modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        subtitle={selected ? `${selected.country} · ${selected.year} · ${selected.status}` : ''}
        wide
      >
        {selected && (
          <div>
            {/* Tags */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              <Tag status={selected.status} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:10, padding:'3px 8px', background:'var(--surface2)', color:'var(--text3)' }}>{selected.region}</span>
              {(selected.themes || []).map(t => (
                <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'2px 6px', background:'var(--blue-light)', color:'var(--blue)', border:'1px solid var(--blue)', letterSpacing:'0.5px' }}>{t}</span>
              ))}
            </div>

            {/* Summary */}
            <div style={{ marginBottom:24 }}>
              <SectionLabel style={{ marginBottom:10 }}>Summary</SectionLabel>
              <p style={{ fontFamily:'var(--font)', fontSize:14, color:'var(--text)', lineHeight:1.8 }}>
                {selected.summary || selected.desc}
              </p>
            </div>

            {/* Key Provisions */}
            {selected.keyProvisions && selected.keyProvisions.length > 0 && (
              <div style={{ marginBottom:24 }}>
                <SectionLabel style={{ marginBottom:10 }}>Key Provisions</SectionLabel>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {selected.keyProvisions.map((p, i) => (
                    <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                      <div style={{ width:20, height:20, background:'var(--ink)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:9, flexShrink:0, marginTop:2 }}>
                        {i + 1}
                      </div>
                      <p style={{ fontFamily:'var(--font)', fontSize:13, color:'var(--text2)', lineHeight:1.6 }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applies To */}
            {selected.appliesTo && (
              <div style={{ marginBottom:24 }}>
                <SectionLabel style={{ marginBottom:8 }}>Who This Applies To</SectionLabel>
                <div style={{ background:'var(--amber-light)', borderLeft:'3px solid var(--amber)', padding:'12px 16px', fontFamily:'var(--font)', fontSize:13, color:'var(--text)', lineHeight:1.6 }}>
                  {selected.appliesTo}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ marginBottom:24, padding:'10px 14px', background:'var(--surface2)', fontFamily:'var(--font)', fontSize:11, color:'var(--text3)', lineHeight:1.6 }}>
              This summary is for informational purposes only and does not constitute legal advice. Consult a qualified legal professional for compliance guidance.
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              {selected.url && (
                <a href={selected.url} target="_blank" rel="noopener noreferrer"
                  style={{ padding:'10px 20px', background:'var(--ink)', color:'white', fontFamily:'var(--font)', fontSize:13, fontWeight:600, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8 }}>
                  ↗ Read Full Document
                </a>
              )}
              <a href={`mailto:advisory@algoviva.com?subject=Advisory - ${selected.name}`}
                style={{ padding:'10px 20px', background:'white', border:'1.5px solid var(--ink)', color:'var(--ink)', fontFamily:'var(--font)', fontSize:13, fontWeight:600, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8 }}>
                Book Advisory Call
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}