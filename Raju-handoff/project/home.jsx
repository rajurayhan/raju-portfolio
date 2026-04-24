// home.jsx — Home / landing page

function HomePage({ onNav }) {
  return (
    <React.Fragment>
      <TopBar current="home" onNav={onNav} />

      {/* HERO */}
      <div className="content" style={{ padding: '80px 40px 60px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 60, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>
              {'// File: portfolio/index — last touched 24.04.2026'}
            </div>

            <h1 className="display" style={{ fontSize: 112, margin: 0, color: 'var(--ink)' }}>
              I build <span style={{ color: 'var(--accent)' }}>quiet</span>,
              <br />
              <span style={{ fontStyle: 'italic' }}>well-made</span> software
              <br />
              for the messy <span style={{ fontStyle: 'italic', color: 'var(--sage)' }}>edges</span>
              <br />
              of AI.
            </h1>

            <div style={{ display: 'flex', gap: 14, marginTop: 38, flexWrap: 'wrap' }}>
              <button className="btn" onClick={() => onNav('contact')}>
                Start a conversation →
              </button>
              <button className="btn ghost" onClick={() => onNav('work')}>
                Read the casebook
              </button>
              <span style={{ fontSize: 11, color: 'var(--muted)', alignSelf: 'center', marginLeft: 8 }}>
                or press <span className="chip" style={{ padding: '2px 6px' }}>K</span> for the index
              </span>
            </div>
          </div>

          {/* Right column — spec sheet */}
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-soft)' }}>
            <div className="rule-ascii">────────────────────────</div>
            <div style={{ padding: '14px 0', display: 'grid', gap: 12 }}>
              <div>
                <div className="eyebrow" style={{ fontSize: 10 }}>Currently</div>
                <div>Head of Development</div>
                <div style={{ color: 'var(--muted)' }}>@ Sulus.ai (Apr 2026 →)</div>
              </div>
              <div>
                <div className="eyebrow" style={{ fontSize: 10 }}>Based</div>
                <div>Dhaka, BD · UTC+6</div>
              </div>
              <div>
                <div className="eyebrow" style={{ fontSize: 10 }}>Available for</div>
                <div>Fractional architecture,</div>
                <div>AI platform advisory,</div>
                <div>MCP / voice-AI builds</div>
              </div>
            </div>
            <div className="rule-ascii">────────────────────────</div>
          </div>
        </div>

        {/* margin note */}
        <Note rotate={2} style={{ position: 'absolute', top: 110, right: -30, width: 180 }}>
          Ten years of shipping. Mostly in the quiet hours before standup.
        </Note>
      </div>

      {/* Ticker */}
      <Ticker items={[
        'MCP server development', 'RAG & vector search', 'Voice AI infrastructure',
        'Multi-tenant SaaS', 'n8n orchestration', 'Claude & OpenAI APIs',
        'Team leadership', 'Laravel · Vue · NestJS', 'Supabase · Pinecone',
      ]} />

      {/* SELECTED WORK */}
      <div className="content" style={{ padding: '72px 40px 40px' }}>
        <SectionHead num="01" title="Selected work" meta="2019 — 2026" />
        <div className="grid grid-2">
          <FeaturedCard
            year="2023—26"
            title="Sulus.ai"
            kind="Platform architecture"
            desc="White-label, multi-tenant SaaS for AI voice agents. Reseller model, Pinecone KB, n8n orchestration, Claude API."
            tags={['Laravel', 'Vue', 'Pinecone', 'n8n', 'GHL']}
            stamp="case study"
            onClick={() => onNav('sulus')}
          />
          <FeaturedCard
            year="2019—23"
            title="eDP"
            kind="Government procurement"
            desc="Defense procurement platform for Bangladesh Ministry of Defense (DGDP). Microservices, high-security, Oracle DB."
            tags={['Java', 'Spring Boot', 'React', 'Oracle', 'Redis']}
            stamp="case study"
            onClick={() => onNav('edp')}
          />
          <FeaturedCard
            year="2024"
            title="The Hive"
            kind="Internal AI ops"
            desc="Meeting summaries, action items, scope generation. Yelp-webhook leads auto-answered by an AI agent."
            tags={['Laravel', 'NestJS', 'OpenAI', 'Slack', 'Yelp API']}
            stamp="case study"
            onClick={() => onNav('hive')}
          />
          <FeaturedCard
            year="2025"
            title="LearnWithAI.BD"
            kind="Personal project"
            desc="A Bangla-first AI programming mentor for Bangladeshi developers. Waitlist beta shipped."
            tags={['Laravel', 'Vue', 'Inertia', 'Claude API']}
            onClick={() => onNav('work')}
          />
        </div>

        <div style={{ marginTop: 28, textAlign: 'right' }}>
          <span className="arrow-link" onClick={() => onNav('work')}>
            Full project index
          </span>
        </div>
      </div>

      {/* WORKING WITH */}
      <div className="content" style={{ padding: '40px 40px 20px' }}>
        <SectionHead num="02" title="Working with" />
        <div className="grid grid-3">
          <div>
            <div className="accent-bar" />
            <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 24, marginBottom: 8 }}>
              Founders shipping AI
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              You have a working prototype and need it to survive real customers. I join for 3—6 months and leave the codebase
              sturdier than I found it.
            </div>
          </div>
          <div>
            <div className="accent-bar" />
            <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 24, marginBottom: 8 }}>
              Agencies & studios
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              White-label AI voice, MCP connectors, n8n orchestration for client work. I've shipped reseller SaaS end-to-end
              and know where the sharp edges are.
            </div>
          </div>
          <div>
            <div className="accent-bar" />
            <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 24, marginBottom: 8 }}>
              Teams of one-too-few
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Fractional Head of Development — architecture, code review, hiring, and the occasional on-call. Remote, calm,
              documented.
            </div>
          </div>
        </div>
      </div>

      {/* TERMINAL / ABOUT TEASE */}
      <div className="content" style={{ padding: '56px 40px 20px' }}>
        <SectionHead num="03" title="whoami" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36, alignItems: 'start' }}>
          <div className="term">
            <div><span className="c-prompt">raju@studio</span>:<span className="c-key">~</span>$ <span>whoami --long</span></div>
            <div style={{ marginTop: 10 }}>
              <span className="c-comment">{'// profile.txt'}</span><br />
              name        : <span className="c-key">Raju Rayhan</span><br />
              role        : <span className="c-key">Platform architect · AI engineer · team lead</span><br />
              experience  : <span className="c-ok">10+ years</span> production SaaS<br />
              focus_2026  : <span className="c-key">MCP servers, voice AI, RAG, multi-tenant SaaS</span><br />
              team        : distributed, async, document-first<br />
              <br />
              <span className="c-prompt">raju@studio</span>:<span className="c-key">~</span>$ <span>availability --next 90d</span><br />
              <span className="c-ok">✓ Taking 1 new engagement</span> · start Q3 2026
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--ink)' }}>
              I started writing software in 2016 on small business tools for clients I never met in person.
              A decade later I mostly build AI platforms — but the craft is the same.
              Get the boring bits right, and the clever bits get to shine.
            </div>
            <div style={{ marginTop: 24 }}>
              <span className="arrow-link" onClick={() => onNav('about')}>
                Read the long version
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

function FeaturedCard({ year, title, kind, desc, tags, stamp, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      {stamp && (
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <span className="stamp">{stamp}</span>
        </div>
      )}
      <div className="p-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>{kind}</div>
          <div className="p-title">{title}</div>
        </div>
        <div className="p-year">{year}</div>
      </div>
      <div className="p-desc">{desc}</div>
      <div className="p-tags">
        {tags.map((t) => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
}

Object.assign(window, { HomePage });
