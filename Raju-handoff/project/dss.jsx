// dss.jsx — DSS HRMS case study

function DssPage({ onNav }) {
  return (
    <React.Fragment>
      <TopBar current="sulus" onNav={onNav} />

      <div style={{ borderBottom: '1px solid var(--rule)', padding: '12px 40px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        <div className="content" style={{ padding: 0 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNav('work')}>← work</span>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>dss hrms</span>
        </div>
      </div>

      <div className="detail-hero">
        <div className="content" style={{ padding: 0 }}>
          <div className="kicker">
            <span>Case 06</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>2022</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>Government HRMS</span>
          </div>
          <h1>DSS <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>HRMS</span></h1>
          <div className="sub">
            A full-suite human resources management system for the Department of Social Services,
            Government of Bangladesh. Payroll, attendance, leave, and loan modules wired into a
            single, role-scoped platform serving a nationwide civil-service workforce.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {['Laravel', 'Angular', 'MySQL', 'Redis', 'Docker', 'REST APIs'].map((t) =>
              <span key={t} className="chip">{t}</span>
            )}
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '40px 40px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div className="metric"><div className="v">4</div><div className="k">Modules · payroll→loans</div></div>
          <div className="metric"><div className="v">gov</div><div className="k">DSS · Bangladesh</div></div>
          <div className="metric"><div className="v">N×</div><div className="k">District offices covered</div></div>
          <div className="metric"><div className="v">∞</div><div className="k">Audit retention</div></div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="01" title="The brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Context</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              The Department of Social Services runs welfare programs across every district of Bangladesh.
              Its workforce was managed across ledgers, spreadsheets, and a handful of loosely-connected
              tools. The brief was to replace all of it with one HRMS that an officer in Dhaka and a clerk
              in a district office could both trust.
            </p>
            <div className="eyebrow" style={{ marginBottom: 8, marginTop: 22 }}>Constraints</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              <li>Government-grade auditability — every payroll cycle had to be reproducible years later.</li>
              <li>Role hierarchy mirrored the civil-service org chart — not a generic RBAC model.</li>
              <li>Spotty connectivity at the edges; the UI had to survive a bad line.</li>
              <li>Bangla and English side-by-side, including in printable artefacts.</li>
            </ul>
          </div>
          <div>
            <Note rotate={-1.5} style={{ width: '100%' }}>
              In government software, the interesting work isn't the features —
              it's making the boring parts (payroll, leave, loan repayments)
              behave identically every month, forever.
              <div style={{ marginTop: 12, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', fontStyle: 'normal' }}>
                — lesson from cycle one
              </div>
            </Note>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="02" title="The architecture" meta="simplified" />
        <div className="ascii-box">{
`           ┌──────────────────────────────────────────┐
           │   Angular SPA · role-scoped dashboards   │
           │   (officer · clerk · auditor · admin)    │
           └────────────────────┬─────────────────────┘
                                │
                    ┌───────────▼────────────┐
                    │   Laravel REST API     │
                    │   · session + policy   │
                    │   · bilingual renderer │
                    └───┬───┬───┬───┬────────┘
                        │   │   │   │
            ┌───────────┘   │   │   └────────────┐
            │               │   │                │
   ┌────────▼──────┐ ┌──────▼─┐ ┌────▼──────┐ ┌──▼────────┐
   │  Payroll      │ │Attend. │ │  Leave    │ │   Loan    │
   │ · cycles      │ │ · shift│ │ · balance │ │ · schedule│
   │ · deductions  │ │ · bio- │ │ · routing │ │ · repay-  │
   │ · bank file   │ │  metric│ │   workflow│ │   ments   │
   └────────┬──────┘ └──┬─────┘ └────┬──────┘ └──┬────────┘
            │           │            │           │
            └───────────┴────┬───────┴───────────┘
                             │
                    ┌────────▼────────┐    ┌──────────┐
                    │     MySQL       │◄───┤  Redis   │
                    │  · partitioned  │    │ · cache  │
                    │  · audit table  │    │ · queues │
                    └─────────────────┘    └──────────┘`
        }</div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="03" title="A few decisions" />
        <div style={{ display: 'grid', gap: 0 }}>
          <Decision
            num="03.1"
            title="Payroll as an immutable ledger, not an editable table"
            body="Each payroll cycle was written once and never mutated. Corrections happened as explicit reversal + re-issue entries. Three years in, when an auditor asked why a 2022 cycle looked the way it did, we could replay it byte-for-byte — including the bugs we'd since fixed."
          />
          <Decision
            num="03.2"
            title="Role hierarchy mirrored the org chart"
            body="Rather than building abstract roles and wiring permissions into them, we modeled the actual DSS civil-service hierarchy as a first-class graph. A district officer's view was derived from their position in the graph, not from a hand-maintained permission list."
          />
          <Decision
            num="03.3"
            title="Offline-tolerant submissions, explicit sync state"
            body="Attendance clerks in weak-signal districts needed forms to submit reliably. The client queued submissions locally, surfaced sync state to the user honestly ('3 entries pending · last synced 11:42'), and refused to silently lose anything."
          />
          <Decision
            num="03.4"
            title="Bilingual artefacts, not bilingual UI"
            body="The app UI was English; printable artefacts — pay slips, leave orders, loan agreements — were always rendered with both Bangla and English side-by-side, from the same templating layer. One source of truth, two audiences."
          />
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="04" title="Outcomes" />
        <div className="grid grid-2">
          <div style={{ padding: 24, border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Before</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Payroll across spreadsheets, reconciled by hand every month</li>
              <li>Leave requests moving on paper, with weeks of lag</li>
              <li>Loan repayment schedules tracked in parallel systems</li>
              <li>Attendance data fragmented across district offices</li>
            </ul>
          </div>
          <div style={{ padding: 24, border: '1px solid var(--ink)', background: 'var(--paper)' }}>
            <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 10 }}>After</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>One HRMS across payroll, attendance, leave, and loans</li>
              <li>Reproducible payroll cycles — every run auditable</li>
              <li>Leave workflows digital, routed by org hierarchy</li>
              <li>District offices online, offline-tolerant, honestly sync-aware</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '48px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Back to</div>
            <div className="display" style={{ fontSize: 28, fontStyle: 'italic' }}>The Casebook</div>
          </div>
          <span className="arrow-link" onClick={() => onNav('work')}>All projects →</span>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { DssPage });
