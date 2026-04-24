// aalap.jsx — AalapAI case study

function AalapPage({ onNav }) {
  return (
    <React.Fragment>
      <TopBar current="sulus" onNav={onNav} />

      <div style={{ borderBottom: '1px solid var(--rule)', padding: '12px 40px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        <div className="content" style={{ padding: 0 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNav('work')}>← work</span>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>aalapai.com</span>
        </div>
      </div>

      <div className="detail-hero">
        <div className="content" style={{ padding: 0 }}>
          <div className="kicker">
            <span>Case 04</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>2024</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>Personal SaaS</span>
          </div>
          <h1><span style={{ fontStyle: 'italic' }}>Aalap</span><span style={{ color: 'var(--accent)' }}>AI</span></h1>
          <div className="sub">
            A personal SaaS that connects WhatsApp Business numbers to AI agents so small businesses can automate
            customer conversations on the channel they already use. Built solo, evenings and weekends.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {['Laravel', 'MySQL', 'OpenAI API', 'WhatsApp Business API', 'Stripe', 'Redis'].map((t) =>
              <span key={t} className="chip">{t}</span>
            )}
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '40px 40px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div className="metric"><div className="v">1</div><div className="k">Developer · solo build</div></div>
          <div className="metric"><div className="v">BD</div><div className="k">Primary market</div></div>
          <div className="metric"><div className="v">24/7</div><div className="k">Customer coverage</div></div>
          <div className="metric"><div className="v">WA</div><div className="k">WhatsApp-native</div></div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="01" title="The brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Context</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              In Bangladesh, small businesses live on WhatsApp. Orders, questions, complaints — all of it
              happens in DMs, at all hours, from a phone that's usually in the owner's pocket. The people who
              could benefit most from AI can't afford to hire a team to wire it up. So I built the wiring.
            </p>
            <div className="eyebrow" style={{ marginBottom: 8, marginTop: 22 }}>Constraints</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              <li>Zero ops overhead — setup in under 10 minutes, no developer required.</li>
              <li>WhatsApp Business API rules are strict; templates, opt-in, windows must all be honored.</li>
              <li>Multi-lingual — Bangla and English in the same conversation, sometimes in the same sentence.</li>
              <li>Pricing had to fit a shopkeeper's budget, not an enterprise's.</li>
            </ul>
          </div>
          <div>
            <Note rotate={2} style={{ width: '100%' }}>
              The owner shouldn't have to learn what an "LLM" is. They should
              paste their FAQ, connect their number, and walk away.
              <div style={{ marginTop: 12, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', fontStyle: 'normal' }}>
                — design principle
              </div>
            </Note>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="02" title="The architecture" meta="simplified" />
        <div className="ascii-box">{
`    ┌───────────────────┐           ┌───────────────────┐
    │  Customer's       │           │  Business owner   │
    │  WhatsApp         │           │  dashboard (Vue)  │
    └─────────┬─────────┘           └─────────┬─────────┘
              │                               │
              ▼                               ▼
    ┌────────────────────┐          ┌──────────────────────┐
    │ WhatsApp Business  │          │  Laravel app         │
    │ API · webhooks     │─────────►│ · knowledge base     │
    └────────────────────┘          │ · conversation state │
                                    │ · billing (Stripe)   │
                                    └──────────┬───────────┘
                                               │
                              ┌────────────────┼────────────────┐
                              ▼                ▼                ▼
                        ┌──────────┐     ┌──────────┐     ┌──────────┐
                        │ OpenAI   │     │  MySQL   │     │  Redis   │
                        │ (reply)  │     │ (owner   │     │ (rate +  │
                        │          │     │  data)   │     │  cache)  │
                        └──────────┘     └──────────┘     └──────────┘`
        }</div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="03" title="A few decisions" />
        <div style={{ display: 'grid', gap: 0 }}>
          <Decision
            num="03.1"
            title="Knowledge base as a pasted document, not a schema"
            body="Owners don't want to model their business. They want to paste the FAQ they already have — in their voice, with their typos — and trust that the agent will figure it out. A lightweight RAG layer parses and chunks; a nightly evaluation catches drift."
          />
          <Decision
            num="03.2"
            title="Hand-off to a human, cleanly"
            body="When the agent isn't confident, it says so — and drops a summary into the owner's inbox with the conversation and a one-tap 'I'll take it from here' button. Trust goes up when the bot knows its limits."
          />
          <Decision
            num="03.3"
            title="Bilingual by default, not by flag"
            body="Bangla-English code-switching is normal. The agent detects on a per-message basis, not per-conversation. Replies match the language of the latest customer message, not a setting the owner forgot to flip."
          />
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="04" title="Outcomes" />
        <div className="grid grid-2">
          <div style={{ padding: 24, border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Before</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Owners answering DMs at midnight</li>
              <li>FAQs repeated until the owner memorized their own business</li>
              <li>Missed messages meant missed sales</li>
            </ul>
          </div>
          <div style={{ padding: 24, border: '1px solid var(--ink)', background: 'var(--paper)' }}>
            <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 10 }}>After</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>First reply in seconds, any hour</li>
              <li>Owner only reads conversations that actually need them</li>
              <li>FAQ pasted once, answered forever — in the right language</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '48px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Next case</div>
            <div className="display" style={{ fontSize: 28, fontStyle: 'italic' }}>LearnWithAI.BD</div>
          </div>
          <span className="arrow-link" onClick={() => onNav('learnwithai')}>Read next →</span>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { AalapPage });
