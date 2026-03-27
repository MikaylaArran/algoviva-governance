import { REGION_STATS, INTEL_ITEMS } from '../data';
import { SectionLabel } from '../components/UI';

const COLORS = {
  enacted:     '#1a3a2a',
  draft:       '#b87320',
  guidelines:  '#1e3a5f',
  not_tracked: '#d4cfc8',
};

function DonutChart({ label, data }) {
  const notTracked = Math.max(0, data.total - data.enacted - data.draft - data.guidelines);
  const slices = [
    { val: data.enacted,    color: COLORS.enacted },
    { val: data.draft,      color: COLORS.draft },
    { val: data.guidelines, color: COLORS.guidelines },
    { val: notTracked,      color: COLORS.not_tracked },
  ];
  const r = 40, cx = 50, cy = 50;
  let offset = 0;
  const paths = [];
  slices.forEach((s, i) => {
    if (s.val <= 0) return;
    const angle = (s.val / data.total) * 2 * Math.PI;
    const x1 = cx + r * Math.sin(offset);
    const y1 = cy - r * Math.cos(offset);
    offset += angle;
    const x2 = cx + r * Math.sin(offset);
    const y2 = cy - r * Math.cos(offset);
    const large = angle > Math.PI ? 1 : 0;
    paths.push(<path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`} fill={s.color} />);
  });

  return (
    <div style={{ background:'white', border:'1px solid var(--border)', padding:20, textAlign:'center' }}>
      <div style={{ fontWeight:700, fontSize:13, marginBottom:16 }}>{label}</div>
      <div style={{ position:'relative', width:100, height:100, margin:'0 auto 12px' }}>
        <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          {paths}
          <circle cx={cx} cy={cy} r={24} fill="white" />
        </svg>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
          <div style={{ fontFamily:'Instrument Serif, serif', fontSize:22, lineHeight:1 }}>{data.total}</div>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:9, color:'var(--text3)' }}>countries</div>
        </div>
      </div>
      <div style={{ textAlign:'left' }}>
        {[
          { label:`Enacted (${data.enacted})`,    color:COLORS.enacted },
          { label:`Draft (${data.draft})`,        color:COLORS.draft },
          { label:`Guidelines (${data.guidelines})`, color:COLORS.guidelines },
          { label:`Not Tracked (${notTracked})`,  color:COLORS.not_tracked },
        ].map(l => (
          <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--text2)', marginBottom:3 }}>
            <div style={{ width:8, height:8, background:l.color, flexShrink:0 }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const TYPE_COLORS = { enacted:'var(--accent)', draft:'var(--amber)', alert:'var(--red)', standard:'var(--blue)' };

export default function Overview({ onNav }) {
  // Aggregate global stats
  const global = Object.values(REGION_STATS).reduce(
    (acc, r) => ({ enacted: acc.enacted + r.enacted, draft: acc.draft + r.draft, guidelines: acc.guidelines + r.guidelines, total: acc.total + r.total }),
    { enacted: 0, draft: 0, guidelines: 0, total: 0 }
  );

  return (
    <div>
      {/* Hero */}
      <div style={{ background:'var(--ink)', color:'white', padding:48, marginBottom:32, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-50%', right:'-10%', width:500, height:500, background:'radial-gradient(circle, rgba(45,92,66,0.3) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, letterSpacing:3, textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:16 }}>AlgoViva — AI Governance Intelligence</div>
        <h1 style={{ fontFamily:'Instrument Serif, serif', fontSize:42, fontWeight:400, lineHeight:1.15, letterSpacing:'-0.5px', color:'white', maxWidth:560, marginBottom:16 }}>
          Know your obligations before you build.
        </h1>
        <p style={{ color:'rgba(255,255,255,0.6)', maxWidth:520, fontSize:15, lineHeight:1.7 }}>
          The AI regulatory landscape is accelerating. AlgoViva maps every jurisdiction, interprets every framework, and generates a tailored compliance brief for your product — so you ship with confidence, not guesswork.
        </p>
        <div style={{ display:'flex', gap:48, marginTop:40, paddingTop:32, borderTop:'1px solid rgba(255,255,255,0.1)' }}>
          {[
            { num:'54', label:'African Countries Mapped' },
            { num:'28', label:'Jurisdictions with Checklists' },
            { num:'35+', label:'Regulations Indexed' },
            { num:'6', label:'Sectors Covered' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily:'Instrument Serif, serif', fontSize:40, color:'white', lineHeight:1 }}>{s.num}</div>
              <div style={{ fontFamily:'DM Mono, monospace', fontSize:10, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <SectionLabel style={{ marginBottom:12 }}>Regulatory Maturity by Region</SectionLabel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:16, marginBottom:32 }}>
        <DonutChart label="Global" data={global} />
        {Object.entries(REGION_STATS).map(([region, data]) => (
          <DonutChart key={region} label={region} data={data} />
        ))}
      </div>

      {/* Feed + Quick Actions */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div>
          <SectionLabel style={{ marginBottom:12 }}>Latest Regulatory Moves</SectionLabel>
          <div style={{ background:'white', border:'1px solid var(--border)', padding:'0 24px' }}>
            {INTEL_ITEMS.slice(0, 5).map((item, i) => (
              <div key={i} style={{ display:'flex', gap:16, padding:'16px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', alignItems:'flex-start' }}>
                <div style={{ width:4, alignSelf:'stretch', background: TYPE_COLORS[item.type] || 'var(--border)', flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontFamily:'DM Mono, monospace', fontSize:10, color:'var(--text3)' }}>{item.country} · {item.date}</span>
                    <span style={{ fontFamily:'DM Mono, monospace', fontSize:9, padding:'2px 6px', border:'1px solid currentColor', color: TYPE_COLORS[item.type], textTransform:'uppercase', letterSpacing:1 }}>{item.type}</span>
                  </div>
                  <div style={{ fontWeight:600, fontSize:13 }}>{item.briefing.split('.')[0]}.</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel style={{ marginBottom:12 }}>Quick Actions</SectionLabel>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              { id:'buildtrack', color:'var(--accent2)', label:'Most Used', title:'Run a Compliance Check', desc:'Select your market, sector, and development stage to get a tailored obligation checklist.' },
              { id:'library',   color:'var(--blue)',    label:'Reference',  title:'Browse the Regulation Library', desc:'35+ indexed regulations, standards, and frameworks searchable by country, sector, and theme.' },
              { id:'intel',     color:'var(--amber)',   label:'Intelligence', title:'Read the Intelligence Feed', desc:"Synthesised regulatory intelligence with source news — what's changing and what it means for you." },
            ].map(q => (
              <div key={q.id} onClick={() => onNav(q.id)} style={{ background:'white', border:'1px solid var(--border)', borderLeft:`3px solid ${q.color}`, padding:20, cursor:'pointer', transition:'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow='var(--shadow)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
                <SectionLabel style={{ color:q.color }}>{q.label}</SectionLabel>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{q.title}</div>
                <div style={{ fontSize:13, color:'var(--text2)' }}>{q.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
