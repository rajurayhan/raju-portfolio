// about.jsx — About page

function AboutPage({ onNav }) {
  const timeline = [
    {
      when: 'Apr 2026 — present',
      role: 'Head of Development',
      co: 'Sulus.ai · Full-time',
      bullets: [
        'Appointed Head of Development at Sulus.ai after its spin-out from Lighthouse Graphics.',
        'Overseeing engineering, product architecture, and technical strategy across the platform.',
      ],
      current: true,
    },
    {
      when: 'May 2023 — Apr 2026',
      role: 'Software Development Lead',
      co: 'Lighthouse Graphics · Remote',
      bullets: [
        'Architected & led development of Sulus.ai — multi-tenant SaaS for AI voice agents.',
        'Published MCP server packages bridging Laravel with n8n and QuickBooks.',
        'Built a conversational AI agent system for runtime voice-assistant configuration.',
        'Architected a Pinecone-backed KB with full tenant isolation by reseller.',
        'Built The Hive — internal ops platform integrating OpenAI, Slack, ClickUp & GHL.',
      ],
    },
    {
      when: 'Oct 2019 — May 2023',
      role: 'Sr. Software Engineer & Team Lead',
      co: 'SIMEC System Limited',
      bullets: [
        'Architected eDP — a defense procurement platform for Bangladesh DGDP.',
        'Java Spring Boot microservices · React · Oracle.',
        'Delivered e-commerce, HR, and school-management systems alongside.',
      ],
    },
    {
      when: 'Jun 2018 — Oct 2019',
      role: 'Software Engineer',
      co: 'Gugu Corporation, Japan · Remote · Part-time',
      bullets: [
        'Built SaaS-based, test-driven web applications to Japanese quality standards.',
      ],
    },
    {
      when: 'Aug 2018 — Nov 2019',
      role: 'Software Engineer',
      co: 'Adbox Bangladesh',
      bullets: [
        'Integrated telecom billing & VAS products for Robi and Banglalink.',
        'Maintained Telco VAS and wired up bKash payments.',
      ],
    },
    {
      when: 'Jan 2016 — Mar 2018',
      role: 'Web Developer',
      co: 'Krazy IT · Bangladesh Wing',
      bullets: [
        'Built data-driven web apps for Australian clients; backend APIs for mobile.',
        'Shipped an Inventory Management System plus custom business apps.',
      ],
    },
  ];

  const skills = {
    'Backend': ['PHP', 'Laravel', 'Node.js', 'NestJS', 'Python', 'Java', 'Spring Boot', 'CodeIgniter'],
    'Frontend': ['Vue.js', 'React', 'Angular', 'jQuery', 'HTML/CSS'],
    'AI & Voice': ['Claude API', 'OpenAI API', 'MCP', 'RAG / Vector DB', 'Pinecone', 'ElevenLabs', 'Deepgram', 'Pipecat'],
    'Automation': ['n8n', 'GoHighLevel', 'Twilio', 'Stripe', 'Yelp API', 'Slack', 'HubSpot', 'Zoho', 'ClickUp'],
    'Databases': ['MySQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Redis', 'Oracle', 'SQL Server'],
    'DevOps & Testing': ['Docker', 'Jest', 'Cypress', 'Swagger'],
  };

  return (
    <React.Fragment>
      <TopBar current="about" onNav={onNav} />

      <div className="content" style={{ padding: '64px 40px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>§ About · /etc/raju.conf</div>
            <h1 className="display" style={{ fontSize: 72, margin: 0, lineHeight: 0.95 }}>
              A decade of
              <br />
              <span style={{ color: 'var(--accent)' }}>shipping</span> <span style={{ fontStyle: 'italic' }}>things</span>
              <br />
              that had to work.
            </h1>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1.55, marginTop: 28, maxWidth: 620 }}>
              I'm Raju — a platform architect and full-stack lead based in Dhaka.
              I've spent the last ten years shipping production SaaS systems,
              most recently in voice AI and intelligent automation.
              I like tidy abstractions, honest documentation, and small teams that trust each other.
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <button className="btn" onClick={() => onNav('contact')}>Work with me →</button>
              <button className="btn ghost">Download resume (PDF)</button>
            </div>
          </div>
          <div>
            <div className="avatar">
              <div className="avatar-initials">R</div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)', marginTop: 10, letterSpacing: '0.06em' }}>
              [ upload a headshot — the placeholder is a friend ]
            </div>
          </div>
        </div>
      </div>

      {/* STRENGTHS STRIP */}
      <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="content" style={{ padding: '24px 40px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, fontSize: 12 }}>
          {[
            'AI platform architecture',
            'System design & scalability',
            'Team leadership & mentoring',
            'Business-to-technical analysis',
            'Async / remote collaboration',
          ].map((s, i) => (
            <div key={s}>
              <div style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 10.5, marginBottom: 6 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="content" style={{ padding: '56px 40px 20px' }}>
        <SectionHead num="01" title="A working timeline" meta="2016 — present" />
        <div className="timeline" style={{ marginLeft: 8, marginTop: 12 }}>
          {timeline.map((t, i) => (
            <div key={i} className={'t-item' + (t.current ? ' current' : '')}>
              <div className="t-when">{t.when}</div>
              <div className="t-role">{t.role}</div>
              <div className="t-co">{t.co}</div>
              <ul>
                {t.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className="content" style={{ padding: '36px 40px 20px' }}>
        <SectionHead num="02" title="Tools in the shop" />
        <div className="grid grid-2">
          {Object.entries(skills).map(([k, v]) => (
            <div key={k} className="skill-group" style={{ border: '1px solid var(--rule)', padding: '18px 20px', background: 'var(--paper-2)' }}>
              <div className="g-label">{k}</div>
              <div className="tags">
                {v.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION + ELSEWHERE */}
      <div className="content" style={{ padding: '36px 40px 20px' }}>
        <div className="grid grid-2">
          <div>
            <SectionHead num="03" title="Education" />
            <div style={{ padding: '20px 0', borderTop: '1px solid var(--rule)' }}>
              <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink)' }}>
                BSc. Computer Science & Engineering
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
                Northern University Bangladesh · 2017
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--mono)' }}>
                CGPA 3.30 / 4.00
              </div>
            </div>
          </div>
          <div>
            <SectionHead num="04" title="Elsewhere" />
            <div style={{ padding: '20px 0', borderTop: '1px solid var(--rule)', fontSize: 13, lineHeight: 2 }}>
              <div>→ <a className="inline" href="#">github.com/rajurayhan</a></div>
              <div>→ <a className="inline" href="#">linkedin.com/in/rajurayhan</a></div>
              <div>→ <a className="inline" href="#">send2raju.bd@gmail.com</a></div>
              <div>→ +880 1849 699001</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { AboutPage });
