// work.jsx — Work index / casebook

function WorkPage({ onNav }) {
  const [filter, setFilter] = React.useState('All');
  const projects = [
    {
      id: 'sulus',
      year: '2023—26',
      title: 'Sulus.ai',
      kind: 'Platform architecture · AI voice',
      client: 'Lighthouse Graphics',
      desc: 'Multi-tenant SaaS for AI voice agents. Resellers brand their own tenants; each tenant spins up voice assistants configured in plain English.',
      tags: ['Laravel', 'Vue.js', 'Supabase', 'Pinecone', 'GHL', 'n8n'],
      cats: ['Platform', 'AI / Voice'],
      link: true,
      linkTo: 'sulus',
    },
    {
      id: 'edp',
      year: '2019—23',
      title: 'eDP — Defense Procurement',
      kind: 'Government platform',
      client: 'Bangladesh Ministry of Defense (DGDP)',
      desc: 'A multi-module procurement platform — tenders, bidders, contracts, audit — running on Spring Boot microservices, Oracle, and React. High-security, multi-role workflows.',
      tags: ['Java', 'Spring Boot', 'React', 'Oracle', 'Redis'],
      cats: ['Platform', 'Government'],
      link: true,
      linkTo: 'edp',
    },
    {
      id: 'hive',
      year: '2024',
      title: 'The Hive',
      kind: 'Internal AI operations',
      client: 'Lighthouse Graphics',
      desc: 'Meeting summaries, action-item extraction, scope docs — all auto-generated and threaded back into Slack, ClickUp, and GHL. Yelp-webhook leads answered autonomously by an AI agent.',
      tags: ['Laravel', 'NestJS', 'React', 'OpenAI', 'Slack', 'Yelp'],
      cats: ['Platform', 'AI / Voice'],
      link: true,
      linkTo: 'hive',
    },
    {
      id: 'learnwithai',
      year: '2025',
      title: 'LearnWithAI.BD',
      kind: 'Personal SaaS',
      client: 'Self-initiated',
      desc: 'A Bangla-first AI programming mentor aimed at Bangladeshi developers. Waitlist beta is live — Claude drives the tutor loop.',
      tags: ['Laravel', 'Vue', 'Inertia', 'Claude API'],
      cats: ['Personal', 'AI / Voice'],
      link: true,
      linkTo: 'learnwithai',
    },
    {
      id: 'aalap',
      year: '2024',
      title: 'AalapAI',
      kind: 'Personal SaaS',
      client: 'Self-initiated',
      desc: 'Bridges WhatsApp Business numbers to AI agents so small businesses can automate customer conversations on the channel they already use.',
      tags: ['Laravel', 'MySQL', 'OpenAI'],
      cats: ['Personal', 'AI / Voice'],
      link: true,
      linkTo: 'aalap',
    },
    {
      id: 'dss',
      year: '2022',
      title: 'DSS HRMS',
      kind: 'Enterprise HR',
      client: 'SIMEC System Ltd.',
      desc: 'Full HR suite — payroll, attendance, leave, and loan modules — for distributed South Asian employers.',
      tags: ['Laravel', 'Angular', 'MySQL'],
      cats: ['Platform', 'Government'],
      link: true,
      linkTo: 'dss',
    },
  ];

  const oss = [
    { name: 'laravel-n8n-mcp-server', desc: '54-tool MCP server bridging Laravel & n8n workflows', stars: '214' },
    { name: 'laravel-quickbooks-mcp-server', desc: '49-tool QuickBooks MCP — OAuth 2.0, multi-tenant', stars: '138' },
    { name: 'laravel-notion-mcp-server', desc: 'Notion integration via Laravel', stars: '72' },
    { name: 'Larastreamer', desc: 'Laravel video streaming package', stars: '51' },
    { name: 'Laravel-EWS-Mail-Server', desc: 'Email via Exchange Web Server', stars: '28' },
    { name: 'GHL WP Bridge', desc: 'WordPress GoHighLevel plugin', stars: '17' },
  ];

  const filters = ['All', 'Platform', 'AI / Voice', 'Government', 'Personal', 'Open source'];
  const showProjects = filter !== 'Open source';
  const showOss = filter === 'All' || filter === 'Open source';
  const visibleProjects = projects.filter((p) =>
    filter === 'All' || filter === 'Open source' ? true : (p.cats || []).includes(filter)
  );

  return (
    <React.Fragment>
      <TopBar current="work" onNav={onNav} />

      {/* Hero */}
      <div className="content" style={{ padding: '64px 40px 40px' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>§ The Casebook · {projects.length} entries</div>
        <h1 className="display" style={{ fontSize: 84, margin: 0 }}>
          <span style={{ fontStyle: 'italic' }}>Work</span>, in chronological
          <br />
          <span style={{ color: 'var(--accent)' }}>disobedience.</span>
        </h1>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--ink-soft)', marginTop: 22, maxWidth: 620, lineHeight: 1.5 }}>
          A selection of shipped work — enterprise platforms, AI systems, personal
          experiments, and the open-source tools that came out of them.
        </div>
      </div>

      {/* Filters row */}
      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', padding: '12px 40px', background: 'var(--paper-2)' }}>
        <div className="content" style={{ padding: 0, display: 'flex', gap: 10, alignItems: 'center', fontSize: 11, color: 'var(--muted)', flexWrap: 'wrap' }}>
          <span className="eyebrow" style={{ marginRight: 8 }}>Filter</span>
          {filters.map((f) => {
            const active = f === filter;
            return (
              <span key={f} className="chip"
                    onClick={() => setFilter(f)}
                    style={{
                      cursor: 'pointer',
                      userSelect: 'none',
                      background: active ? 'var(--ink)' : 'transparent',
                      color: active ? 'var(--paper)' : 'var(--ink-soft)',
                      borderColor: active ? 'var(--ink)' : 'var(--rule)',
                      transition: 'all .15s',
                    }}>
                {f}
              </span>
            );
          })}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)' }}>
            <span style={{ color: 'var(--accent)' }}>◆</span>&nbsp;
            {filter === 'All'
              ? `${projects.length} projects · ${oss.length} repos`
              : filter === 'Open source'
                ? `${oss.length} repos`
                : `${visibleProjects.length} of ${projects.length}`}
          </span>
        </div>
      </div>

      {/* Project list — ledger style */}
      {showProjects && (
        <div className="content" style={{ padding: '40px 40px 20px' }}>
          {visibleProjects.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center', border: '1px dashed var(--rule)', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 12 }}>
              <div style={{ fontSize: 28, fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 10 }}>
                Nothing under “{filter}.”
              </div>
              <div>Try another category, or <span onClick={() => setFilter('All')} style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }}>show everything</span>.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 0 }}>
              {visibleProjects.map((p, i) => (
                <ProjectRow key={p.id} project={p} idx={i} onNav={onNav} last={i === visibleProjects.length - 1} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Open source */}
      {showOss && (
      <div className="content" style={{ padding: '48px 40px 20px' }}>
        <SectionHead num="02" title="Open source" meta="github.com/rajurayhan" />
        <div className="grid grid-2">
          {oss.map((o) => (
            <div key={o.name} className="project-card" style={{ padding: '18px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                  {o.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>★</span> {o.stars}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{o.desc}</div>
            </div>
          ))}
        </div>
      </div>
      )}

      <div className="content" style={{ padding: '40px 40px 0' }}>
        <div style={{ textAlign: 'center', padding: '32px 0', borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 32, marginBottom: 8 }}>
            Have a thorny platform?
          </div>
          <div style={{ color: 'var(--ink-soft)', marginBottom: 18 }}>I'll read it honestly and tell you where the load-bearing walls are.</div>
          <button className="btn" onClick={() => onNav('contact')}>Book a diagnostic call →</button>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

function ProjectRow({ project, idx, onNav, last }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => project.link && onNav(project.linkTo || 'sulus')}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 130px 1fr 110px',
        gap: 24,
        padding: '28px 0',
        borderBottom: last ? 'none' : '1px solid var(--rule)',
        cursor: project.link ? 'pointer' : 'default',
        transition: 'background .15s',
        background: hover && project.link ? 'var(--paper-2)' : 'transparent',
        alignItems: 'start',
      }}
    >
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', paddingTop: 6 }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em' }}>{project.year}</div>
        <div style={{ fontSize: 10.5, color: 'var(--accent)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {project.kind.split('·')[0].trim()}
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <div className="display" style={{ fontSize: 32, color: 'var(--ink)' }}>{project.title}</div>
          {project.link && (
            <span className="stamp" style={{ fontSize: 9, padding: '2px 8px', transform: 'rotate(-3deg)' }}>
              case study
            </span>
          )}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2, marginBottom: 10 }}>
          for {project.client}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 620 }}>
          {project.desc}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
      <div style={{ textAlign: 'right', paddingTop: 6, fontSize: 11, color: hover && project.link ? 'var(--accent)' : 'var(--muted)' }}>
        {project.link ? (hover ? 'read it →' : 'available') : 'archived'}
      </div>
    </div>
  );
}

Object.assign(window, { WorkPage });
