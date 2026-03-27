import { useState } from 'react';
import { INTEL_ITEMS } from '../data';
import { FilterBtn } from '../components/UI';

const TYPE_COLORS  = { enacted: 'var(--accent)', draft: 'var(--amber)', alert: 'var(--red)', standard: 'var(--blue)' };
const TYPE_LABELS  = { enacted: 'Enacted', draft: 'Draft / Consultation', alert: 'Alert', standard: 'Standards Update' };

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Africa', label: 'Africa' },
  { id: 'Europe', label: 'Europe' },
  { id: 'Americas', label: 'Americas' },
  { id: 'Asia-Pacific', label: 'Asia-Pacific' },
  { id: 'International', label: 'International' },
  { id: 'enacted', label: 'Enacted' },
  { id: 'draft', label: 'Draft' },
  { id: 'alert', label: 'Alerts' },
  { id: 'standard', label: 'Standards' },
];

function IntelItem({ item }) {
  const [open, setOpen] = useState(false);
  const color = TYPE_COLORS[item.type] || 'var(--border)';
  const label = TYPE_LABELS[item.type] || item.type;

  return (
    <div style={{ background: 'white', border: '1px solid var(--border)', marginBottom: 16, borderLeft: `4px solid ${color}` }}>
      {/* Header */}
      <div style={{ padding: '18px 20px' }}>
        {/* Type row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, padding: '2px 7px', border: `1px solid ${color}`, color, textTransform: 'uppercase', letterSpacing: 1 }}>
            {label}
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'var(--text3)' }}>{item.country}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'var(--text3)' }}>{item.date}</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'var(--text3)' }}>{item.region}</span>
        </div>

        {/* Briefing — the intelligence layer */}
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 17, lineHeight: 1.5, marginBottom: 12, color: 'var(--text)' }}>
          {item.briefing}
        </div>

        {/* Sources toggle */}
        <button onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'var(--text3)', cursor: 'pointer', letterSpacing: '0.5px', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          {open ? '▼' : '▶'} {open ? 'Hide' : 'Show'} sources ({item.sources.length})
        </button>
      </div>

      {/* Sources — the evidence layer */}
      {open && (
        <div style={{ borderTop: '1px solid var(--surface2)', background: 'var(--surface)' }}>
          {item.sources.map((s, i) => (
            <div key={i} style={{ padding: '12px 20px', borderBottom: i < item.sources.length - 1 ? '1px solid var(--surface2)' : 'none' }}>
              <a href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--accent2)', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
                {s.title} ↗
              </a>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{s.url}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function IntelFeed() {
  const [filter, setFilter] = useState('all');

  const types = new Set(['enacted','draft','alert','standard']);

  const filtered = INTEL_ITEMS.filter(item => {
    if (filter === 'all') return true;
    if (types.has(filter)) return item.type === filter;
    return item.region === filter;
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Regulatory Intelligence Feed</h2>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>
          Synthesised analysis of what's changing in AI governance — with source news as supporting evidence. Intelligence first, sources on demand.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <FilterBtn key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</FilterBtn>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text3)', background: 'white', border: '1px solid var(--border)' }}>
          No intelligence items match this filter.
        </div>
      ) : (
        filtered.map((item, i) => <IntelItem key={i} item={item} />)
      )}
    </div>
  );
}
