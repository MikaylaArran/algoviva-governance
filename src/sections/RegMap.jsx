import { useState } from 'react';
import { COUNTRIES } from '../data';
import { Tag, FilterBtn, SectionLabel, Btn, Modal } from '../components/UI';

const REGIONS = ['Africa', 'Europe', 'Asia-Pacific', 'Americas', 'Middle East'];
const STATUSES = ['enacted', 'draft', 'guidelines'];

export default function RegMap({ onNav }) {
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filtered = COUNTRIES.filter(c => {
    if (regionFilter !== 'all' && c.region !== regionFilter) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    return true;
  });

  const borderColors = {
    enacted: 'var(--accent)',
    draft: 'var(--amber)',
    guidelines: 'var(--blue)',
    'not-tracked': 'var(--border)',
  };

  function toggleStatus(s) {
    setStatusFilter(prev => prev === s ? null : s);
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Global AI Regulatory Map</h2>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>Click any country to see its regulatory profile and jump to a compliance check.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <FilterBtn active={regionFilter === 'all'} onClick={() => setRegionFilter('all')}>All Regions</FilterBtn>
        {REGIONS.map(r => (
          <FilterBtn key={r} active={regionFilter === r} onClick={() => setRegionFilter(r)}>{r}</FilterBtn>
        ))}
        <div style={{ width: 1, background: 'var(--border)', margin: '0 4px' }} />
        {STATUSES.map(s => (
          <FilterBtn key={s} active={statusFilter === s} onClick={() => toggleStatus(s)}>{s}</FilterBtn>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {filtered.map(c => (
          <div key={c.name} onClick={() => setSelectedCountry(c)}
            style={{ background: 'white', border: '1px solid var(--border)', borderLeft: `3px solid ${borderColors[c.status] || 'var(--border)'}`, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'var(--text3)', marginBottom: 8 }}>{c.region}</div>
            <div style={{ marginBottom: 8 }}><Tag status={c.status} small /></div>
            <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>
              {(c.regs || []).slice(0, 2).map((r, i) => <div key={i}>· {r}</div>)}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', padding: 40, textAlign: 'center', color: 'var(--text3)' }}>No countries match this filter.</div>
        )}
      </div>

      {/* Country Modal */}
      <Modal open={!!selectedCountry} onClose={() => setSelectedCountry(null)}
        title={selectedCountry?.name}
        subtitle={selectedCountry?.region}>
        {selectedCountry && (
          <>
            <div style={{ marginBottom: 20 }}>
              <Tag status={selectedCountry.status} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <SectionLabel style={{ marginBottom: 8 }}>Key Regulations & Frameworks</SectionLabel>
              {(selectedCountry.regs || []).map((r, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--surface2)', fontSize: 13 }}>· {r}</div>
              ))}
            </div>
            <div style={{ marginBottom: 24 }}>
              <SectionLabel style={{ marginBottom: 8 }}>Context</SectionLabel>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{selectedCountry.notes || 'Regulatory data for this jurisdiction is being compiled.'}</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn onClick={() => { setSelectedCountry(null); onNav('buildtrack'); }}>Run Compliance Check →</Btn>
              <Btn variant="outline" href={`mailto:advisory@algoviva.com?subject=Advisory - ${selectedCountry.name}`}>Book Advisory Call</Btn>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
