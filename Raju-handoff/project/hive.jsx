// hive.jsx — The Hive case study

function HivePage({ onNav }) {
  return (
    <React.Fragment>
      <TopBar current="sulus" onNav={onNav} />

      <div style={{ borderBottom: '1px solid var(--rule)', padding: '12px 40px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        <div className="content" style={{ padding: 0 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNav('work')}>← work</span>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>the hive</span>
        </div>
      </div>

      <div className="detail-hero">
        <div className="content" style={{ padding: 0 }}>
          <div className="kicker">
            <span>Case 03</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>2024</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>Internal AI operations</span>
          </div>
          <h1>The <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Hive</span></h1>
          <div className="sub">
            An internal operations platform for Lighthouse Graphics. Meeting summaries, action items, and project
            scopes generated automatically. Yelp-inbound business leads answered autonomously by an AI agent.
            Slack, ClickUp, and GHL woven together so information stops falling between people.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {['Laravel', 'NestJS', 'React', 'OpenAI', 'Slack', 'ClickUp', 'GHL', 'Yelp API', 'n8n'].map((t) =>
              <span key={t} className="chip">{t}</span>
            )}
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '40px 40px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div className="metric"><div className="v">1d</div><div className="k">Avg. lead response → min</div></div>
          <div className="metric"><div className="v">4</div><div className="k">Systems stitched together</div></div>
          <div className="metric"><div className="v">0</div><div className="k">Action items lost to memory</div></div>
          <div className="metric"><div className="v">Σ</div><div className="k">Auto-summarized meetings</div></div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="01" title="The brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Context</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              A services agency runs on small, constant acts of coordination — recapping meetings, turning talk
              into tickets, answering inbound leads before they cool. The Hive was built to do those acts
              automatically so the humans could stay in the interesting parts of the job.
            </p>
            <div className="eyebrow" style={{ marginBottom: 8, marginTop: 22 }}>Constraints</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              <li>Had to slot into the existing Slack / ClickUp / GHL stack — no new surfaces for the team.</li>
              <li>Summaries had to be trustworthy enough that people stopped taking their own notes.</li>
              <li>Yelp-inbound leads needed human-quality replies within minutes, any hour.</li>
              <li>Everything auditable — who said what, what the AI said, what it did next.</li>
            </ul>
          </div>
          <div>
            <Note rotate={-1.5} style={{ width: '100%' }}>
              The Hive shouldn't feel like a bot. It should feel like a diligent
              junior who happens to never sleep, never forget, and always writes
              things down.
              <div style={{ marginTop: 12, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', fontStyle: 'normal' }}>
                — product principle, pinned
              </div>
            </Note>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="02" title="The architecture" meta="simplified" />
        <div className="ascii-box">{
`   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  Slack   │  │ ClickUp  │  │   GHL    │  │   Yelp   │
   │ webhooks │  │  tasks   │  │   CRM    │  │ webhooks │
   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
        │             │             │             │
        └─────────────┴──────┬──────┴─────────────┘
                             │
                    ┌────────▼─────────┐
                    │   NestJS gateway │   ← event bus · retries
                    └────────┬─────────┘
                             │
               ┌─────────────┼─────────────┐
               │             │             │
      ┌────────▼──┐  ┌───────▼────┐  ┌─────▼─────────┐
      │ Meeting   │  │ Lead       │  │ Scope         │
      │ summarizer│  │ responder  │  │ generator     │
      │ (OpenAI)  │  │ (OpenAI)   │  │ (OpenAI)      │
      └────────┬──┘  └───────┬────┘  └─────┬─────────┘
               │             │             │
               └─────────────┼─────────────┘
                             │
                    ┌────────▼─────────┐
                    │  Laravel core    │
                    │  · audit log     │
                    │  · humans in UI  │
                    └──────────────────┘`
        }</div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="03" title="A few decisions" />
        <div style={{ display: 'grid', gap: 0 }}>
          <Decision
            num="03.1"
            title="Agents own an outcome, not a feature"
            body="Rather than one monolithic AI brain, The Hive is a small fleet of focused agents — one writes meeting summaries, one handles Yelp leads, one drafts scope documents. Each has narrow permissions, its own prompts, its own evaluation set. When something regresses, we know exactly which agent to fix."
          />
          <Decision
            num="03.2"
            title="Humans stay in the loop on anything outbound"
            body="Internal artifacts (summaries, action items, tickets) post automatically. Anything going to a customer — even a Yelp reply — is drafted, routed into Slack for a one-click approve, then sent. Trust grows before autonomy does."
          />
          <Decision
            num="03.3"
            title="One write path to every tool, never two"
            body="Every system-of-record write goes through the Laravel core. Agents don't touch ClickUp or GHL directly — they hand off structured intent, the core validates and writes. The audit log tells you who asked, who approved, who executed."
          />
          <Decision
            num="03.4"
            title="Prompts live in the repo, versioned like code"
            body="Prompts aren't config — they're program text. They live in the monorepo, reviewed in PRs, with evaluation runs on change. 'Fixing the prompt' is a commit, not a Slack message someone forgot about."
          />
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="04" title="Outcomes" />
        <div className="grid grid-2">
          <div style={{ padding: 24, border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Before</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Meeting notes — when they existed — lived in someone's Notion</li>
              <li>Action items surfaced in standup two days late</li>
              <li>Yelp leads answered whenever someone happened to check</li>
              <li>Project scopes drafted from scratch, every time</li>
            </ul>
          </div>
          <div style={{ padding: 24, border: '1px solid var(--ink)', background: 'var(--paper)' }}>
            <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 10 }}>After</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Summaries and action items in Slack minutes after a call ends</li>
              <li>Tasks auto-created in ClickUp, assigned by heuristics + review</li>
              <li>Yelp leads answered within minutes, approved by a human first</li>
              <li>Scope drafts generated from call transcripts, ready to edit</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '48px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Next case</div>
            <div className="display" style={{ fontSize: 28, fontStyle: 'italic' }}>AalapAI — WhatsApp × AI</div>
          </div>
          <span className="arrow-link" onClick={() => onNav('aalap')}>Read next →</span>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { HivePage });
