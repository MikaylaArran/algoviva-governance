import { useState, useMemo } from 'react';
import { COUNTRIES, STAGE_HINTS, STAGE_ORDER, CDB } from '../data';
import { Tag, Badge, SectionLabel, Btn, AdvisoryStrip, Modal, CiteLink } from '../components/UI';

const SECTORS = [
  { value: 'health', label: 'Health & Medical' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'education', label: 'Education' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'public', label: 'Public Sector / Government' },
  { value: 'general', label: 'General / Cross-Sector' },
];

const TOOL_TYPES = [
  { value: 'decision-support', label: 'Decision Support / Recommendation' },
  { value: 'diagnostic', label: 'Diagnostic / Assessment' },
  { value: 'generative', label: 'Generative AI / Content Creation' },
  { value: 'automation', label: 'Process Automation / Workflow' },
  { value: 'surveillance', label: 'Monitoring / Surveillance' },
  { value: 'nlp', label: 'NLP / Chatbot / Virtual Assistant' },
  { value: 'prediction', label: 'Predictive Analytics' },
  { value: 'other', label: 'Other' },
];

const STAGES = [
  { id: 'pre-concept', label: 'Pre-Concept', num: '01' },
  { id: 'planning',    label: 'Planning',    num: '02' },
  { id: 'building',    label: 'Building',    num: '03' },
  { id: 'testing',     label: 'Testing',     num: '04' },
  { id: 'deployed',    label: 'Deployed',    num: '05' },
];

const SECTOR_MAP = { health: 'health', finance: 'finance', education: 'general', agriculture: 'general', public: 'general', general: 'general' };

function select(style, rest) { return { width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', background: 'white', fontFamily: 'Syne, sans-serif', fontSize: 13, color: 'var(--text)', outline: 'none', appearance: 'none', ...style, ...rest }; }

function RegBlock({ reg, stageIdx, checked, onToggle, onCite }) {
  const [open, setOpen] = useState(true);

  const activeObs  = reg.obligations.filter(ob => STAGE_ORDER.indexOf(ob.stage_from) <= stageIdx);
  const upcomingObs = reg.obligations.filter(ob => STAGE_ORDER.indexOf(ob.stage_from) > stageIdx);

  return (
    <div style={{ border: '1px solid var(--border)', marginBottom: 12, background: 'white' }}>
      {/* Header */}
      <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', background: 'var(--surface)', userSelect: 'none' }}>
        <Tag status={reg.status} small />
        <div style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{reg.title}</div>
        {reg.url && (
          <a href={reg.url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ color: 'var(--accent2)', fontFamily: 'DM Mono, monospace', fontSize: 11, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            ↗ Full document
          </a>
        )}
        <span style={{ color: 'var(--text3)', fontSize: 12, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </div>

      {open && (
        <div style={{ padding: 16, borderTop: '1px solid var(--border)' }}>
          {/* Active obligations */}
          {activeObs.map(ob => (
            <div key={ob.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--surface2)' }}>
              <input type="checkbox" checked={!!checked[ob.id]} onChange={() => onToggle(ob.id)}
                style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0, accentColor: 'var(--accent2)', cursor: 'pointer' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, textDecoration: checked[ob.id] ? 'line-through' : 'none', color: checked[ob.id] ? 'var(--text3)' : 'var(--text)' }}>
                  <Badge severity={ob.severity} />
                  {ob.text}
                </div>
                {ob.cite_ref && (
                  <div style={{ marginTop: 3 }}>
                    <CiteLink citeRef={ob.cite_ref} citeText={ob.cite_text} onOpen={onCite} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Upcoming */}
          {upcomingObs.length > 0 && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)' }}>
              <SectionLabel style={{ marginBottom: 8, color: 'var(--text3)' }}>Upcoming requirements</SectionLabel>
              {upcomingObs.map(ob => (
                <div key={ob.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', opacity: 0.5, fontSize: 12, fontStyle: 'italic' }}>
                  <input type="checkbox" disabled style={{ width: 14, height: 14, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, padding: '1px 5px', background: 'var(--surface3)', marginRight: 6 }}>
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

  const stageVerb = { 'pre-concept': 'Know before you design', planning: 'Address before building', building: 'Implement now', testing: 'Resolve before launch', deployed: 'Active obligation — address now' };
  const currentStage = STAGE_ORDER[stageIdx];

  if (gaps.length === 0) {
    return (
      <div style={{ borderLeft: '3px solid var(--accent2)', background: 'var(--accent-light)', padding: '16px 20px', marginTop: 20 }}>
        <div style={{ color: 'var(--accent2)', fontWeight: 700, fontSize: 13 }}>✓ All MUST obligations addressed for this stage</div>
      </div>
    );
  }

  return (
    <div style={{ borderLeft: '3px solid var(--red)', background: 'var(--red-light)', padding: '16px 20px', marginTop: 20 }}>
      <div style={{ color: 'var(--red)', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>
        {stageVerb[currentStage]}: {gaps.length} unresolved MUST obligation{gaps.length !== 1 ? 's' : ''}
      </div>
      {gaps.map(g => (
        <div key={g.id} style={{ display: 'flex', gap: 8, fontSize: 12, marginBottom: 8, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--red)', flexShrink: 0 }}>→</span>
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
body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#111;}
h1{font-size:22px;margin-bottom:4px;}
.meta{color:#666;font-size:12px;margin-bottom:24px;}
table{width:100%;border-collapse:collapse;}
th{background:#0d0f12;color:white;padding:8px 12px;text-align:left;font-size:11px;font-family:monospace;}
td{padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;}
.done{text-decoration:line-through;color:#888;}
.must{color:#b33a2a;font-weight:bold;}
.should{color:#b87320;font-weight:bold;}
.footer{margin-top:32px;font-size:11px;color:#888;border-top:1px solid #eee;padding-top:12px;}
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
  <td style="font-family:monospace;font-size:11px;">${r.cite}</td>
</tr>`).join('')}
</tbody></table>
<div class="footer">
  This checklist is informational only and does not constitute legal advice.<br>
  Consult a qualified legal professional before deployment. Data updated monthly.<br>
  AlgoViva — advisory@algoviva.com
</div>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500); }
}

export default function BuildTrack() {
  const [stage, setStage] = useState('pre-concept');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [sector, setSector] = useState('');
  const [toolType, setToolType] = useState('');
  const [desc, setDesc] = useState('');
  const [results, setResults] = useState(null);
  const [checked, setChecked] = useState({});
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
    const sectorKey = SECTOR_MAP[sector] || 'general';
    const countryData = CDB[country] || CDB['default'];
    const sectorData = countryData[sectorKey] || countryData['general'] || CDB['default']['general'];
    setChecked({});
    setResults({
      country, sector, toolType, regulations: sectorData.regulations,
      hasDetailedData: !!CDB[country],
    });
  }

  // Counts for results header
  const counts = useMemo(() => {
    if (!results) return { must: 0, should: 0 };
    let must = 0, should = 0;
    results.regulations.forEach(reg => {
      reg.obligations.forEach(ob => {
        if (STAGE_ORDER.indexOf(ob.stage_from) <= stageIdx) {
          if (ob.severity === 'MUST') must++;
          else should++;
        }
      });
    });
    return { must, should };
  }, [results, stageIdx]);

  const doneCount = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const totalActive = counts.must + counts.should;
  const pct = totalActive > 0 ? Math.round((doneCount / totalActive) * 100) : 0;

  const sel = (id, value, onChange, placeholder, children) => (
    <div style={{ position: 'relative' }}>
      <select id={id} value={value} onChange={e => onChange(e.target.value)}
        style={{ ...select(), paddingRight: 32 }}>
        <option value="">{placeholder}</option>
        {children}
      </select>
      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text3)', fontSize: 10 }}>▼</span>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Build &amp; Track</h2>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>Complete your profile, run the compliance check, and track your obligations — all in one place.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24, alignItems: 'flex-start' }}>

        {/* ── FORM ── */}
        <div style={{ background: 'white', border: '1px solid var(--border)', padding: 24 }}>

          {/* Stage */}
          <SectionLabel style={{ marginBottom: 10 }}>Development Stage</SectionLabel>
          <div style={{ display: 'flex', border: '1.5px solid var(--border)', marginBottom: 12, overflow: 'hidden' }}>
            {STAGES.map(s => (
              <button key={s.id} onClick={() => { setStage(s.id); if (results) runCheck(); }}
                style={{ flex: 1, padding: '10px 4px', fontFamily: 'Syne, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.3px', textAlign: 'center', cursor: 'pointer', background: stage === s.id ? 'var(--ink)' : 'none', border: 'none', borderRight: '1px solid var(--border)', color: stage === s.id ? 'white' : 'var(--text3)', transition: 'all 0.15s', lineHeight: 1.4 }}>
                <span style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: 8, opacity: 0.6, marginBottom: 2 }}>{s.num}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Stage hint */}
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20, padding: 10, background: 'var(--surface2)', borderLeft: '3px solid var(--accent2)', fontStyle: 'italic', lineHeight: 1.5 }}>
            {STAGE_HINTS[stage]}
          </div>

          {/* Region */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Region</label>
            {sel('region', region, r => { setRegion(r); setCountry(''); }, '— Select region —',
              ['Africa','Europe','Asia-Pacific','Americas','Middle East'].map(r => <option key={r} value={r}>{r}</option>)
            )}
          </div>

          {/* Country */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Country / Jurisdiction</label>
            {sel('country', country, setCountry, '— Select country —',
              countryOptions.map(c => <option key={c} value={c}>{c}</option>)
            )}
          </div>

          {/* Sector */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Sector</label>
            {sel('sector', sector, setSector, '— Select sector —',
              SECTORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)
            )}
          </div>

          {/* Tool type */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>AI Tool Type</label>
            {sel('type', toolType, setToolType, '— Select type —',
              TOOL_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Describe your AI solution</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="Briefly describe what your AI tool does, who it serves, and the data it uses…"
              style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', fontFamily: 'Syne, sans-serif', fontSize: 13, color: 'var(--text)', outline: 'none', minHeight: 80, resize: 'vertical' }} />
          </div>

          <button onClick={runCheck}
            style={{ width: '100%', padding: '12px 20px', background: 'var(--accent)', color: 'white', border: 'none', fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            ▶ &nbsp;Run Compliance Check
          </button>
        </div>

        {/* ── RESULTS ── */}
        <div>
          {!results ? (
            <div style={{ background: 'white', border: '2px dashed var(--border)', padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⚖</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Your compliance brief will appear here</h3>
              <p style={{ color: 'var(--text2)', fontSize: 13 }}>Complete the form and run the check to see your tailored obligations, stage-by-stage requirements, and tracking checklist.</p>
            </div>
          ) : (
            <>
              {/* Result header */}
              <div style={{ background: 'var(--ink)', color: 'white', padding: '24px 28px', marginBottom: 0 }}>
                <h2 style={{ color: 'white', fontSize: 18, marginBottom: 4 }}>
                  {results.country} · {SECTORS.find(s => s.value === results.sector)?.label} · {STAGES.find(s => s.id === stage)?.label} Stage
                </h2>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  {results.toolType ? TOOL_TYPES.find(t => t.value === results.toolType)?.label + ' · ' : ''}
                  Compliance brief generated {new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>

                {/* KPIs */}
                <div style={{ display: 'flex', gap: 32, marginTop: 20 }}>
                  {[
                    { n: counts.must, l: 'MUST obligations' },
                    { n: counts.should, l: 'SHOULD obligations' },
                    { n: results.regulations.length, l: 'Regulations / Standards' },
                  ].map(k => (
                    <div key={k.l}>
                      <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, color: 'white', lineHeight: 1 }}>{k.n}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{k.l}</div>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                    <span>Compliance Progress</span>
                    <span>{pct}%</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.15)' }}>
                    <div style={{ height: '100%', background: '#3ecf6e', width: `${pct}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ paddingTop: 24 }}>
                {/* Non-detailed data notice */}
                {!results.hasDetailedData && (
                  <div style={{ marginBottom: 16, padding: '12px 16px', background: 'var(--amber-light)', borderLeft: '3px solid var(--amber)', fontSize: 13, lineHeight: 1.6 }}>
                    <strong>Note:</strong> Detailed sector-specific data for {results.country} is in development. Obligations shown reflect international standards baseline (ISO 42001, NIST AI RMF). <a href={`mailto:advisory@algoviva.com?subject=Advisory - ${results.country}`} style={{ color: 'var(--accent2)', fontWeight: 700 }}>Book a call with AlgoViva</a> for a tailored review.
                  </div>
                )}

                <SectionLabel style={{ marginBottom: 12 }}>Obligations by Regulation</SectionLabel>

                {results.regulations.map((reg, i) => (
                  <RegBlock key={i} reg={reg} stageIdx={stageIdx} checked={checked} onToggle={toggleObligation} onCite={(ref, text) => setCiteModal({ ref, text })} />
                ))}

                <GapPanel regulations={results.regulations} stageIdx={stageIdx} checked={checked} />

                {/* Download + Advisory */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                  <button onClick={() => downloadChecklist(results.country, results.sector, stage, results.regulations, checked, stageIdx)}
                    style={{ padding: '8px 16px', background: 'white', border: '1.5px solid var(--ink)', fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                    ↓ Download Checklist (Print / PDF)
                  </button>
                  <a href={`mailto:advisory@algoviva.com?subject=Advisory - ${results.country} / ${results.sector}`}
                    style={{ padding: '8px 16px', background: 'var(--ink)', color: 'white', fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    Book AlgoViva Advisory Call
                  </a>
                </div>

                <AdvisoryStrip country={results.country} sector={results.sector} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Citation Modal */}
      <Modal open={!!citeModal} onClose={() => setCiteModal(null)} title={citeModal?.ref} subtitle="Source Reference">
        {citeModal && (
          <>
            <div style={{ background: 'var(--surface2)', padding: 16, borderLeft: '3px solid var(--accent2)', fontFamily: 'Instrument Serif, serif', fontSize: 14, lineHeight: 1.7 }}>
              {citeModal.text}
            </div>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 12 }}>This is a summary of the referenced provision. Consult the full document for complete legal text.</p>
          </>
        )}
      </Modal>
    </div>
  );
}
