// learnwithai.jsx — LearnWithAI.BD case study

function LearnWithAIPage({ onNav }) {
  return (
    <React.Fragment>
      <TopBar current="sulus" onNav={onNav} />

      <div style={{ borderBottom: '1px solid var(--rule)', padding: '12px 40px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        <div className="content" style={{ padding: 0 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNav('work')}>← work</span>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>learnwithai.bd</span>
        </div>
      </div>

      <div className="detail-hero">
        <div className="content" style={{ padding: 0 }}>
          <div className="kicker">
            <span>Case 05</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>2025</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>Personal SaaS · ed-tech</span>
          </div>
          <h1>LearnWith<span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>AI</span>.BD</h1>
          <div className="sub">
            A Bangla-first AI programming mentor built for Bangladeshi developers. Waitlist beta shipped —
            Claude drives a tutor loop that teaches, reviews, and nudges in the language learners actually think in.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {['Laravel', 'Vue.js', 'Inertia.js', 'Claude API', 'Tailwind', 'PostgreSQL'].map((t) =>
              <span key={t} className="chip">{t}</span>
            )}
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '40px 40px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div className="metric"><div className="v">BD</div><div className="k">Bangla-first UX</div></div>
          <div className="metric"><div className="v">β</div><div className="k">Waitlist beta · live</div></div>
          <div className="metric"><div className="v">1:1</div><div className="k">Tutor-per-learner</div></div>
          <div className="metric"><div className="v">∞</div><div className="k">Patient loop</div></div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="01" title="The brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Context</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              Most programming education online is in English — and most Bangladeshi developers think, struggle,
              and ask first questions in Bangla. LearnWithAI.BD is the version I wish I'd had when I started:
              a patient tutor that speaks your language, reads your code, and doesn't flinch at the messy parts.
            </p>
            <div className="eyebrow" style={{ marginBottom: 8, marginTop: 22 }}>Constraints</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              <li>Bangla explanations had to feel native — not translated.</li>
              <li>The tutor had to handle real code, not toy snippets.</li>
              <li>Had to run cheaply enough that students, not their parents, could pay.</li>
              <li>Personal project — simple, honest, no investor deck theatrics.</li>
            </ul>
          </div>
          <div>
            <Note rotate={-1.5} style={{ width: '100%' }}>
              Good tutors ask the next question. Great ones notice what you
              almost said — and ask that one instead.
              <div style={{ marginTop: 12, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', fontStyle: 'normal' }}>
                — product principle
              </div>
            </Note>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="02" title="The architecture" meta="simplified" />
        <div className="ascii-box">{
`                  ┌────────────────────────┐
                  │   Learner (browser)    │
                  │   Vue · Inertia · BN   │
                  └───────────┬────────────┘
                              │
                  ┌───────────▼────────────┐
                  │    Laravel / Inertia   │
                  │  · lesson state         │
                  │  · code sandbox shim    │
                  │  · progress graph       │
                  └───────────┬────────────┘
                              │
             ┌────────────────┼─────────────────┐
             │                │                 │
      ┌──────▼──────┐  ┌──────▼──────┐  ┌───────▼─────────┐
      │   Claude    │  │ PostgreSQL  │  │  Sandbox runner │
      │  (tutor     │  │ · lessons   │  │ (code eval)     │
      │   loop)     │  │ · progress  │  │                 │
      └─────────────┘  └─────────────┘  └─────────────────┘`
        }</div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="03" title="A few decisions" />
        <div style={{ display: 'grid', gap: 0 }}>
          <Decision
            num="03.1"
            title="Bangla-first, not bilingual"
            body="Every prompt, every explanation, every error message was designed in Bangla first, then translated outward. The tutor's voice reads like a real Bangla-speaking mentor, not an English tutor wearing a Bangla costume."
          />
          <Decision
            num="03.2"
            title="The tutor runs the code before it answers"
            body="When a learner shares code, the sandbox runs it and the tutor sees the actual output before it replies. No hallucinated errors, no confident wrong answers — the feedback is grounded in what actually happened."
          />
          <Decision
            num="03.3"
            title="Progress as a graph, not a bar"
            body="Learning isn't linear. The progress view is a knowledge graph — what you've touched, what you've shown mastery on, what depends on what. Motivation comes from seeing the graph light up, not from a percentage creeping up."
          />
          <Decision
            num="03.4"
            title="Cheap to run, cheap to use"
            body="Claude handles the heavy reasoning; smaller models handle the boilerplate. Caching is aggressive for static curriculum content. The price per learner per month has to survive a student budget — and it does."
          />
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="04" title="Outcomes" />
        <div className="grid grid-2">
          <div style={{ padding: 24, border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Before</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Learners translating English tutorials in their heads</li>
              <li>Stuck on a bug for days with no patient ear</li>
              <li>No tutor who could read their actual code, in their actual language</li>
            </ul>
          </div>
          <div style={{ padding: 24, border: '1px solid var(--ink)', background: 'var(--paper)' }}>
            <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 10 }}>After</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Bangla tutor on tap, with code awareness</li>
              <li>Waitlist beta live — learners logging in daily</li>
              <li>Progress graph, grounded feedback, patient loops</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '48px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Back to</div>
            <div className="display" style={{ fontSize: 28, fontStyle: 'italic' }}>DSS HRMS — Gov HR platform</div>
          </div>
          <span className="arrow-link" onClick={() => onNav('dss')}>Read next →</span>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { LearnWithAIPage });
