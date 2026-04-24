// sulus.jsx — Sulus.ai case study (deep dive)

function SulusPage({ onNav }) {
  return (
    <React.Fragment>
      <TopBar current="sulus" onNav={onNav} />

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '12px 40px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        <div className="content" style={{ padding: 0 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNav('work')}>← work</span>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>sulus.ai</span>
        </div>
      </div>

      {/* HERO */}
      <div className="detail-hero">
        <div className="content" style={{ padding: 0 }}>
          <div className="kicker">
            <span>Case 01</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>2023 — 2026</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>Platform architecture</span>
          </div>
          <h1>Sulus<span style={{ color: 'var(--accent)' }}>.ai</span></h1>
          <div className="sub">
            A white-label, multi-tenant SaaS platform where resellers deploy voice AI agents
            for their own customers. Built from blank repo to production over three years as
            the founding architect and engineering lead.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {['Laravel', 'Vue.js', 'Supabase', 'Pinecone', 'n8n', 'GHL', 'Claude API', 'OpenAI', 'ElevenLabs', 'Deepgram', 'Pipecat'].map((t) =>
              <span key={t} className="chip">{t}</span>
            )}
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="content" style={{ padding: '40px 40px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div className="metric"><div className="v">3y</div><div className="k">Lead architect</div></div>
          <div className="metric"><div className="v">N×</div><div className="k">Reseller tenants</div></div>
          <div className="metric"><div className="v">1536</div><div className="k">Dim vectors · cosine</div></div>
          <div className="metric"><div className="v">∞</div><div className="k">Voice minutes routed</div></div>
        </div>
      </div>

      {/* THE BRIEF */}
      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="01" title="The brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Context</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              Lighthouse Graphics needed a way to sell AI voice receptionists to their own customers —
              and, later, to sell the selling. A white-label platform where agencies could onboard
              their own sub-tenants, rebrand the UI, and plug in their CRM of choice.
            </p>
            <div className="eyebrow" style={{ marginBottom: 8, marginTop: 22 }}>Constraints</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              <li>Tenant isolation — per-reseller, per-customer, no leakage.</li>
              <li>Voice infrastructure had to be swappable (Pipecat / direct providers).</li>
              <li>Non-technical users had to configure agents in plain English.</li>
              <li>GHL as the default CRM, but pluggable.</li>
            </ul>
          </div>
          <div>
            <Note rotate={1.5} style={{ width: '100%' }}>
              "Make it so the reseller can demo the platform to a prospect
              in under five minutes, and have them place a real call."
              <div style={{ marginTop: 12, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', fontStyle: 'normal' }}>
                — the brief, paraphrased
              </div>
            </Note>
          </div>
        </div>
      </div>

      {/* ARCHITECTURE */}
      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="02" title="The architecture" meta="simplified" />
        <div className="ascii-box">{
`                    ┌──────────────────────┐
                    │   Reseller · Tenant  │    ← white-label UI, Vue 3
                    └──────────┬───────────┘
                               │
                      ┌────────┴────────┐
                      │   Laravel API   │    ← Sanctum · role-scoped
                      └───┬─────┬───────┘
                          │     │
            ┌─────────────┘     └────────────────┐
            │                                    │
   ┌────────▼─────────┐              ┌───────────▼──────────┐
   │   Supabase (pg)  │              │     n8n workflows    │
   │ · tenants        │              │ · agent config (LLM) │
   │ · agents         │              │ · GHL sync           │
   │ · call_logs      │              │ · webhooks           │
   └────────┬─────────┘              └───────────┬──────────┘
            │                                    │
   ┌────────▼─────────┐              ┌───────────▼──────────┐
   │   Pinecone KB    │              │   Voice (Pipecat)    │
   │ · 1536-d cosine  │              │ · Deepgram + 11Labs  │
   │ · reseller scope │              │ · Claude / OpenAI    │
   └──────────────────┘              └──────────────────────┘`
        }</div>
      </div>

      {/* DECISIONS */}
      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="03" title="A few decisions" />
        <div style={{ display: 'grid', gap: 24 }}>
          <Decision
            num="03.1"
            title="Per-reseller Pinecone namespaces, not per-tenant"
            body="A per-tenant namespace was the textbook answer — but the number of resellers was bounded while tenants per reseller were not. Reseller-scoped namespaces with tenant filters gave us cheaper indexing and simpler cache invalidation, without leaking data between resellers (the actual trust boundary)."
          />
          <Decision
            num="03.2"
            title="n8n as the orchestration layer, not a bespoke engine"
            body="Writing a task-graph engine is a whole product. n8n was close enough, had the integrations we needed on day one, and let non-engineers ship automations. We wrote a thin MCP layer (later open-sourced) so Claude could drive n8n workflows directly."
          />
          <Decision
            num="03.3"
            title="Configure by conversation, not by form"
            body="Agency owners don't want to fill out 40 fields to set up a voice agent. We built a meta-agent that interviews them in chat and writes the agent config as it goes. Faster than any form — and it doubled as onboarding."
          />
          <Decision
            num="03.4"
            title="Swappable voice infra"
            body="We built the voice layer behind an interface the rest of the code couldn't see past — providers could be swapped per tenant without the app knowing the difference. Pipecat became the default for accounts that wanted tighter control over the call pipeline."
          />
        </div>
      </div>

      {/* BEFORE / AFTER */}
      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="04" title="Outcomes" />
        <div className="grid grid-2">
          <div style={{ padding: 24, border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Before</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Voice agents configured by hand, per customer, per channel</li>
              <li>GHL sync brittle; data drifted within a day</li>
              <li>Onboarding a new reseller took a week of custom work</li>
              <li>No shared knowledge base across an agent family</li>
            </ul>
          </div>
          <div style={{ padding: 24, border: '1px solid var(--ink)', background: 'var(--paper)' }}>
            <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 10 }}>After</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Conversational setup — minutes, not meetings</li>
              <li>Event-driven GHL sync via webhooks, idempotent</li>
              <li>New reseller tenancy in a single command</li>
              <li>Pinecone KB with reseller-scoped namespaces, tenant filters</li>
            </ul>
          </div>
        </div>
      </div>

      {/* HAND-OFF */}
      <div className="content" style={{ padding: '36px 40px 12px' }}>
        <SectionHead num="05" title="Hand-off" />
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--ink)', maxWidth: 720 }}>
          In April 2026, Sulus spun out as its own company and I came with it as Head of Development.
          The platform is now the product — and the team has grown around it.
        </div>
      </div>

      {/* NEXT */}
      <div className="content" style={{ padding: '48px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Next case</div>
            <div className="display" style={{ fontSize: 28, fontStyle: 'italic' }}>eDP — Defense Procurement</div>
          </div>
          <span className="arrow-link" onClick={() => onNav('edp')}>Read next →</span>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

function Decision({ num, title, body }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 18, padding: '20px 0', borderTop: '1px solid var(--rule)' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', paddingTop: 4 }}>{num}</div>
      <div>
        <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 24, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 720 }}>
          {body}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SulusPage });
