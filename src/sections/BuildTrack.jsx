import { useState, useMemo } from 'react';
import { COUNTRIES, STAGE_HINTS, STAGE_ORDER, CDB } from '../data';
import { Tag, Badge, SectionLabel, Btn, AdvisoryStrip, Modal, CiteLink } from '../components/UI';

const SECTORS = [
  { value: 'health',      label: 'Health & Medical' },
  { value: 'finance',     label: 'Financial Services' },
  { value: 'education',   label: 'Education' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'public',      label: 'Public Sector / Government' },
  { value: 'general',     label: 'General / Cross-Sector' },
];

const TOOL_TYPES = [
  { value: 'decision-support', label: 'Decision Support / Recommendation' },
  { value: 'diagnostic',       label: 'Diagnostic / Assessment' },
  { value: 'generative',       label: 'Generative AI / Content Creation' },
  { value: 'automation',       label: 'Process Automation / Workflow' },
  { value: 'surveillance',     label: 'Monitoring / Surveillance' },
  { value: 'nlp',              label: 'NLP / Chatbot / Virtual Assistant' },
  { value: 'prediction',       label: 'Predictive Analytics' },
  { value: 'other',            label: 'Other' },
];

const STAGES = [
  { id: 'pre-concept', label: 'Pre-Concept', num: '01' },
  { id: 'planning',    label: 'Planning',    num: '02' },
  { id: 'building',    label: 'Building',    num: '03' },
  { id: 'testing',     label: 'Testing',     num: '04' },
  { id: 'deployed',    label: 'Deployed',    num: '05' },
];

const SECTOR_MAP = {
  health: 'health', finance: 'finance', education: 'general',
  agriculture: 'general', public: 'general', general: 'general',
};

function RegBlock({ reg, stageIdx, checked, onToggle, onCite }) {
  const [open, setOpen] = useState(true);
  const activeObs   = reg.obligations.filter(ob => STAGE_ORDER.indexOf(ob.stage_from) <= stageIdx);
  const upcomingObs = reg.obligations.filter(ob => STAGE_ORDER.indexOf(ob.stage_from) > stageIdx);

  return (
    <div style={{ border:'1px solid var(--border)', marginBottom:12, background:'white' }}>
      <div onClick={() => setOpen(o => !o)}
        style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', cursor:'pointer', background:'var(--surface)', userSelect:'none', flexWrap:'wrap' }}>
        <Tag status={reg.status} small />
        <div style={{ fontFamily:'var(--font)', fontWeight:600, fontSize:13, flex:1, minWidth:120 }}>{reg.title}</div>
        {reg.url && (
          <a href={reg.url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ color:'#4f8ef7', fontFamily:'var(--font-mono)', fontSize:11, textDecoration:'none', whiteSpace:'nowrap' }}>
            ↗ Full document
          </a>
        )}
        <span style={{ color:'var(--text3)', fontSize:11, transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </div>

      {open && (
        <div style={{ padding:14, borderTop:'1px solid var(--border)' }}>
          {activeObs.map(ob => (
            <div key={ob.id} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 0', borderBottom:'1px solid var(--surface2)' }}>
              <input type="checkbox" checked={!!checked[ob.id]} onChange={() => onToggle(ob.id)}
                style={{ width:15, height:15, marginTop:2, flexShrink:0, accentColor:'#4f8ef7', cursor:'pointer' }} />
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'var(--font)', fontSize:13, lineHeight:1.5, textDecoration: checked[ob.id] ? 'line-through' : 'none', color: checked[ob.id] ? 'var(--text3)' : 'var(--text)' }}>
                  <Badge severity={ob.severity} />
                  {ob.text}
                </div>
                {ob.cite_ref && (
                  <div style={{ marginTop:4 }}>
                    <CiteLink citeRef={ob.cite_ref} citeText={ob.cite_text} onOpen={onCite} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {upcomingObs.length > 0 && (
            <div style={{ marginTop:12, paddingTop:12, borderTop:'1px dashed var(--border)' }}>
              <SectionLabel style={{ marginBottom:8, color:'var(--text3)' }}>Upcoming requirements</SectionLabel>
              {upcomingObs.map(ob => (
                <div key={ob.id} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'7px 0', opacity:0.5 }}>
                  <input type="checkbox" disabled style={{ width:14, height:14, marginTop:2, flexShrink:0 }} />
                  <div style={{ fontFamily:'var(--font)', fontSize:12, fontStyle:'italic', color:'var(--text2)' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:9, padding:'1px 5px', background:'var(--surface3)', marginRight:6 }}>
                      From: {ob.stage_from}
                    </span>
                    {ob.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GapPanel({ regulations, stageIdx, checked }) {
  const gaps = useMemo(() => {
    const all = [];
    regulations.forEach(reg => {
      reg.obligations.forEach(ob => {
        if (STAGE_ORDER.indexOf(ob.stage_from) <= stageIdx && ob.severity === 'MUST' && !checked[ob.id]) {
          all.push(ob);
        }
      });
    });
    return all;
  }, [regulations, stageIdx, checked]);

  const stageVerb = {
    'pre-concept': 'Know before you design',
    planning:      'Address before building',
    building:      'Implement now',
    testing:       'Resolve before launch',
    deployed:      'Active obligation — address now',
  };

  if (gaps.length === 0) {
    return (
      <div style={{ borderLeft:'3px solid #2d5c42', background:'#e6f0ea', padding:'16px 20px', marginTop:20 }}>
        <div style={{ fontFamily:'var(--font)', color:'#2d5c42', fontWeight:600, fontSize:13 }}>
          ✓ All MUST obligations addressed for this stage
        </div>
      </div>
    );
  }

  return (
    <div style={{ borderLeft:'3px solid #c0392b', background:'#fdf0ee', padding:'16px 20px', marginTop:20 }}>
      <div style={{ fontFamily:'var(--font)', color:'#c0392b', fontWeight:600, fontSize:13, marginBottom:12 }}>
        {stageVerb[STAGE_ORDER[stageIdx]]}: {gaps.length} unresolved MUST obligation{gaps.length !== 1 ? 's' : ''}
      </div>
      {gaps.map(g => (
        <div key={g.id} style={{ display:'flex', gap:8, fontFamily:'var(--font)', fontSize:12, marginBottom:8, alignItems:'flex-start', lineHeight:1.5 }}>
          <span style={{ color:'#c0392b', flexShrink:0 }}>→</span>
          {g.text}
        </div>
      ))}
    </div>
  );
}

function downloadChecklist(country, sector, stage, regulations, checked, stageIdx) {
  const rows = [];
  regulations.forEach(reg => {
    reg.obligations.forEach(ob => {
      if (STAGE_ORDER.indexOf(ob.stage_from) <= stageIdx) {
        rows.push({ done: !!checked[ob.id], severity: ob.severity, text: ob.text, cite: ob.cite_ref || '' });
      }
    });
  });

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>AlgoViva Compliance Checklist — ${country}</title>
<style>
body{font-family:'Inter',sans-serif;max-width:720px;margin:40px auto;color:#111;font-size:14px;}
h1{font-size:20px;font-weight:700;margin-bottom:4px;}
.meta{color:#666;font-size:12px;margin-bottom:28px;}
table{width:100%;border-collapse:collapse;}
th{background:#0f1729;color:white;padding:10px 14px;text-align:left;font-size:11px;letter-spacing:0.05em;}
td{padding:10px 14px;border-bottom:1px solid #eee;font-size:13px;vertical-align:top;}
.done{text-decoration:line-through;color:#999;}
.must{color:#c0392b;font-weight:600;}
.should{color:#b45309;font-weight:600;}
.footer{margin-top:32px;font-size:11px;color:#888;border-top:1px solid #eee;padding-top:16px;line-height:1.7;}
</style></head><body>
<h1>AlgoViva — AI Compliance Checklist</h1>
<div class="meta">${country} · ${sector} · ${stage} stage · Generated ${new Date().toLocaleDateString()}</div>
<table>
<thead><tr><th>Status</th><th>Severity</th><th>Obligation</th><th>Reference</th></tr></thead>
<tbody>
${rows.map(r => `<tr>
  <td>${r.done ? '✅ Done' : '☐ Pending'}</td>
  <td class="${r.severity.toLowerCase()}">${r.severity}</td>
  <td class="${r.done ? 'done' : ''}">${r.text}</td>
  <td style="font-family:monospace;font-size:11px;color:#666;">${r.cite}</td>
</tr>`).join('')}
</tbody></table>
<div class="footer">
  This checklist is informational only and does not constitute legal advice.<br>
  Consult a qualified legal professional before deployment. Data updated monthly.<br>
  <strong>AlgoViva</strong> — advisory@algoviva.com
</div>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500); }
}

export default function BuildTrack() {
  const [stage, setStage]         = useState('pre-concept');
  const [region, setRegion]       = useState('');
  const [country, setCountry]     = useState('');
  const [sector, setSector]       = useState('');
  const [toolType, setToolType]   = useState('');
  const [desc, setDesc]           = useState('');
  const [results, setResults]     = useState(null);
  const [checked, setChecked]     = useState({});
  const [citeModal, setCiteModal] = useState(null);

  const stageIdx = STAGE_ORDER.indexOf(stage);

  const countryOptions = useMemo(() => {
    if (!region) return [];
    return COUNTRIES.filter(c => c.region === region).map(c => c.name).sort();
  }, [region]);

  function toggleObligation(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function runCheck() {
    if (!country || !sector) { alert('Please select a country and sector.'); return; }
    const sectorKey   = SECTOR_MAP[sector] || 'general';
    const countryData = CDB[country] || CDB['default'];
    const sectorData  = countryData[sectorKey] || countryData['general'] || CDB['default']['general'];
    setChecked({});
    setResults({ country, sector, toolType, regulations: sectorData.regulations, hasDetailedData: !!CDB[country] });
  }

  const counts = useMemo(() => {
    if (!results) return { must: 0, should: 0 };
    let must = 0, should = 0;
    results.regulations.forEach(reg => {
      reg.obligations.forEach(ob => {
        if (STAGE_ORDER.indexOf(ob.stage_from) <= stageIdx) {
          if (ob.severity === 'MUST') must++; else should++;
        }
      });
    });
    return { must, should };
  }, [results, stageIdx]);

  const doneCount   = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const totalActive = counts.must + counts.should;
  const pct         = totalActive > 0 ? Math.round((doneCount / totalActive) * 100) : 0;

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '1.5px solid var(--border)',
    background: 'white',
    fontFamily: 'var(--font)', fontSize: 13, color: 'var(--text)',
    outline: 'none', appearance: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font)', fontSize: 11, fontWeight: 600,
    letterSpacing: '0.05em', textTransform: 'uppercase',
    color: 'var(--text2)', marginBottom: 6,
  };

  function SelectField({ value, onChange, placeholder, children }) {
    return (
      <div style={{ position: 'relative' }}>
        <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, paddingRight: 32 }}>
          <option value="">{placeholder}</option>
          {children}
        </select>
        <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'var(--text3)', fontSize:10 }}>▼</span>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:22, marginBottom:6 }}>Build &amp; Track</h2>
        <p style={{ fontFamily:'var(--font)', color:'var(--text2)', fontSize:14 }}>Complete your profile, run the compliance check, and track your obligations — all in one place.</p>
      </div>

      <div className="bt-layout" style={{ display:'grid', gridTemplateColumns:'360px 1fr', gap:24, alignItems:'flex-start' }}>

        {/* ── FORM ── */}
        <div style={{ background:'white', border:'1px solid var(--border)', padding:24 }}>

          <SectionLabel style={{ marginBottom:10 }}>Development Stage</SectionLabel>
          <div style={{ display:'flex', border:'1.5px solid var(--border)', marginBottom:12, overflow:'hidden' }}>
            {STAGES.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)}
                style={{ flex:1, padding:'10px 2px', fontFamily:'var(--font)', fontSize:9, fontWeight:600, textAlign:'center', cursor:'pointer', background: stage === s.id ? 'var(--ink)' : 'none', border:'none', borderRight:'1px solid var(--border)', color: stage === s.id ? 'white' : 'var(--text3)', transition:'all 0.15s', lineHeight:1.4 }}>
                <span style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:8, opacity:0.6, marginBottom:2 }}>{s.num}</span>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ fontFamily:'var(--font)', fontSize:12, color:'var(--text3)', marginBottom:20, padding:10, background:'var(--surface2)', borderLeft:'3px solid #4f8ef7', fontStyle:'italic', lineHeight:1.6 }}>
            {STAGE_HINTS[stage]}
          </div>

          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>Region</label>
            <SelectField value={region} onChange={r => { setRegion(r); setCountry(''); }} placeholder="— Select region —">
              {['Africa','Europe','Asia-Pacific','Americas','Middle East'].map(r => <option key={r} value={r}>{r}</option>)}
            </SelectField>
          </div>

          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>Country / Jurisdiction</label>
            <SelectField value={country} onChange={setCountry} placeholder="— Select country —">
              {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </SelectField>
          </div>

          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>Sector</label>
            <SelectField value={sector} onChange={setSector} placeholder="— Select sector —">
              {SECTORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </SelectField>
          </div>

          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>AI Tool Type</label>
            <SelectField value={toolType} onChange={setToolType} placeholder="— Select type —">
              {TOOL_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </SelectField>
          </div>

          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>Describe your AI solution</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="Briefly describe what your AI tool does, who it serves, and the data it uses…"
              style={{ ...inputStyle, minHeight:80, resize:'vertical' }} />
          </div>

          <button onClick={runCheck} style={{ width:'100%', padding:'12px 20px', background:'var(--ink)', color:'white', border:'none', fontFamily:'var(--font)', fontSize:13, fontWeight:600, cursor:'pointer', letterSpacing:'0.02em', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            ▶ &nbsp;Run Compliance Check
          </button>
        </div>

        {/* ── RESULTS ── */}
        <div>
          {!results ? (
            <div style={{ background:'white', border:'2px dashed var(--border)', padding:'clamp(24px, 5vw, 48px)', textAlign:'center' }}>
              <div style={{ fontSize:36, marginBottom:12 }}>⚖</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, marginBottom:8 }}>Your compliance brief will appear here</h3>
              <p style={{ fontFamily:'var(--font)', color:'var(--text2)', fontSize:13, lineHeight:1.6 }}>Complete the form and run the check to see your tailored obligations, stage-by-stage requirements, and tracking checklist.</p>
            </div>
          ) : (
            <>
              <div style={{ background:'var(--ink)', color:'white', padding:'24px 28px' }}>
                <h2 style={{ fontFamily:'var(--font-display)', color:'white', fontSize:'clamp(15px, 3vw, 18px)', fontWeight:700, marginBottom:4 }}>
                  {results.country} · {SECTORS.find(s => s.value === results.sector)?.label} · {STAGES.find(s => s.id === stage)?.label} Stage
                </h2>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(255,255,255,0.5)' }}>
                  {results.toolType ? TOOL_TYPES.find(t => t.value === results.toolType)?.label + ' · ' : ''}
                  Generated {new Date().toLocaleDateString('en-ZA', { day:'numeric', month:'long', year:'numeric' })}
                </div>

                <div style={{ display:'flex', gap:'clamp(16px, 3vw, 32px)', marginTop:20, flexWrap:'wrap' }}>
                  {[
                    { n: counts.must,                l: 'MUST obligations' },
                    { n: counts.should,              l: 'SHOULD obligations' },
                    { n: results.regulations.length, l: 'Regulations / Standards' },
                  ].map(k => (
                    <div key={k.l}>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px, 4vw, 32px)', fontWeight:800, color:'white', lineHeight:1 }}>{k.n}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:1 }}>{k.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop:20 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(255,255,255,0.5)', marginBottom:6 }}>
                    <span>Compliance Progress</span>
                    <span>{pct}%</span>
                  </div>
                  <div style={{ height:4, background:'rgba(255,255,255,0.15)' }}>
                    <div style={{ height:'100%', background:'#4f8ef7', width:`${pct}%`, transition:'width 0.5s' }} />
                  </div>
                </div>
              </div>

              <div style={{ paddingTop:24 }}>
                {!results.hasDetailedData && (
                  <div style={{ marginBottom:16, padding:'12px 16px', background:'#fef3e2', borderLeft:'3px solid #b45309', fontFamily:'var(--font)', fontSize:13, lineHeight:1.6 }}>
                    <strong>Note:</strong> Detailed sector-specific data for {results.country} is in development. Obligations shown reflect the international standards baseline (ISO 42001, NIST AI RMF).{' '}
                    <a href={`mailto:advisory@algoviva.com?subject=Advisory - ${results.country}`} style={{ color:'#4f8ef7', fontWeight:600 }}>Book a call with AlgoViva</a> for a tailored review.
                  </div>
                )}

                <SectionLabel style={{ marginBottom:12 }}>Obligations by Regulation</SectionLabel>

                {results.regulations.map((reg, i) => (
                  <RegBlock key={i} reg={reg} stageIdx={stageIdx} checked={checked} onToggle={toggleObligation} onCite={(ref, text) => setCiteModal({ ref, text })} />
                ))}

                <GapPanel regulations={results.regulations} stageIdx={stageIdx} checked={checked} />

                <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:20 }}>
                  <button onClick={() => downloadChecklist(results.country, results.sector, stage, results.regulations, checked, stageIdx)}
                    style={{ padding:'8px 16px', background:'white', border:'1.5px solid var(--ink)', fontFamily:'var(--font)', fontSize:12, fontWeight:600, cursor:'pointer' }}>
                    ↓ Download Checklist (Print / PDF)
                  </button>
                  <a href={`mailto:advisory@algoviva.com?subject=Advisory - ${results.country} / ${results.sector}`}
                    style={{ padding:'8px 16px', background:'var(--ink)', color:'white', fontFamily:'var(--font)', fontSize:12, fontWeight:600, textDecoration:'none', display:'inline-flex', alignItems:'center' }}>
                    Book AlgoViva Advisory Call
                  </a>
                </div>

                <AdvisoryStrip country={results.country} sector={results.sector} />
              </div>
            </>
          )}
        </div>
      </div>

      <Modal open={!!citeModal} onClose={() => setCiteModal(null)} title={citeModal?.ref} subtitle="Source Reference">
        {citeModal && (
          <>
            <div style={{ background:'var(--surface2)', padding:16, borderLeft:'3px solid #4f8ef7', fontFamily:'var(--font)', fontSize:13, lineHeight:1.7 }}>
              {citeModal.text}
            </div>
            <p style={{ fontFamily:'var(--font)', fontSize:11, color:'var(--text3)', marginTop:12 }}>
              This is a summary of the referenced provision. Consult the full document for complete legal text.
            </p>
          </>
        )}
      </Modal>

      <style>{`
        @media (max-width: 768px) {
          .bt-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}