// edp.jsx — eDP Defense Procurement case study

function EdpPage({ onNav }) {
  return (
    <React.Fragment>
      <TopBar current="sulus" onNav={onNav} />

      <div style={{ borderBottom: '1px solid var(--rule)', padding: '12px 40px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
        <div className="content" style={{ padding: 0 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNav('work')}>← work</span>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--ink)' }}>edp — defense procurement</span>
        </div>
      </div>

      <div className="detail-hero">
        <div className="content" style={{ padding: 0 }}>
          <div className="kicker">
            <span>Case 02</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>2019 — 2023</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>Government platform</span>
          </div>
          <h1><span style={{ fontStyle: 'italic' }}>eDP</span> <span style={{ color: 'var(--accent)' }}>—</span> Defense Procurement</h1>
          <div className="sub">
            A national defense-procurement platform for the Bangladesh Directorate General of Defense Purchase
            (DGDP), Ministry of Defense. Live at edp.gov.bd. Architected as a Java Spring Boot microservices
            system with a React frontend and Oracle backbone — role-scoped, audit-logged, and built to survive
            procurement cycles measured in years.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {['Java', 'Spring Boot', 'Microservices', 'React', 'Oracle', 'Redis', 'Swagger', 'Docker'].map((t) =>
              <span key={t} className="chip">{t}</span>
            )}
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '40px 40px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <div className="metric"><div className="v">4y</div><div className="k">Architect · Team Lead</div></div>
          <div className="metric"><div className="v">12+</div><div className="k">Microservices shipped</div></div>
          <div className="metric"><div className="v">gov</div><div className="k">Production · edp.gov.bd</div></div>
          <div className="metric"><div className="v">∞</div><div className="k">Audit trail retention</div></div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="01" title="The brief" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Context</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              DGDP manages defense procurement for the Bangladesh Armed Forces. Tenders, bidders, contracts,
              amendments, deliveries, and audits — all of which had lived on paper, email, and a patchwork of
              legacy tools. The mandate: bring the whole pipeline online with the discipline the domain deserves.
            </p>
            <div className="eyebrow" style={{ marginBottom: 8, marginTop: 22 }}>Constraints</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              <li>High-security posture — every action is auditable, signed, and reviewable.</li>
              <li>Multi-role workflows — procurement officers, vendors, auditors, senior command.</li>
              <li>On-prem Oracle; no cloud-managed DB options on the table.</li>
              <li>Procurement regulations change by gazette, not by JIRA.</li>
            </ul>
          </div>
          <div>
            <Note rotate={2} style={{ width: '100%' }}>
              The hardest part wasn't writing the code. It was mapping a decades-old
              paper process into a schema that could survive the next decade without
              another rewrite.
              <div style={{ marginTop: 12, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)', fontStyle: 'normal' }}>
                — from the architecture notes
              </div>
            </Note>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="02" title="The architecture" meta="simplified" />
        <div className="ascii-box">{
`         ┌──────────────────────┐     ┌──────────────────────┐
         │  Officer Portal      │     │  Vendor Portal       │
         │  React · role-scoped │     │  React · KYC gated   │
         └──────────┬───────────┘     └──────────┬───────────┘
                    │                            │
                    └─────────────┬──────────────┘
                                  │
                     ┌────────────▼────────────┐
                     │      API Gateway        │
                     │  auth · routing · logs  │
                     └────────────┬────────────┘
                                  │
     ┌────────────────┬───────────┼───────────┬────────────────┐
     │                │           │           │                │
┌────▼────┐    ┌──────▼──────┐ ┌──▼───┐  ┌────▼─────┐   ┌──────▼──────┐
│ Tender  │    │  Bidder /   │ │ Doc  │  │ Contract │   │   Audit &   │
│ Service │    │  KYC        │ │ Vault│  │ Service  │   │  Notification│
└────┬────┘    └──────┬──────┘ └──┬───┘  └────┬─────┘   └──────┬──────┘
     │                │           │           │                │
     └────────────────┴────┬──────┴───────────┴────────────────┘
                           │
                   ┌───────▼────────┐       ┌───────────┐
                   │   Oracle DB    │◄──────┤   Redis   │
                   │ · partitioned  │       │ · sessions│
                   │ · audit-logged │       │ · queues  │
                   └────────────────┘       └───────────┘`
        }</div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="03" title="A few decisions" />
        <div style={{ display: 'grid', gap: 0 }}>
          <Decision
            num="03.1"
            title="Microservices along domain seams, not team seams"
            body="We split services by procurement lifecycle — tender, bidder, contract, audit, documents — so each piece could evolve at its own cadence as regulations changed. Team boundaries moved; service boundaries didn't have to."
          />
          <Decision
            num="03.2"
            title="Every mutation produces an audit event, always"
            body="The audit service was first-class, not bolted on. Every state transition across every service emitted a signed event consumed by a dedicated audit store. When the comptroller asked a question, we had an answer in one query — not a forensic expedition across logs."
          />
          <Decision
            num="03.3"
            title="Role-scoped views over permission flags"
            body="Instead of a tangle of boolean permissions, we modeled roles as composable scopes. An auditor saw a different UI from an officer from the same endpoint, because the endpoint shaped its response to the caller. Fewer bugs, fewer leaks."
          />
          <Decision
            num="03.4"
            title="Oracle is not Postgres — stop pretending"
            body="We leaned into Oracle's strengths — partitioned tables for tender archives, proper materialized views for dashboards, PL/SQL where it actually earned its keep — instead of writing the platform as if the DB were interchangeable."
          />
        </div>
      </div>

      <div className="content" style={{ padding: '36px 40px' }}>
        <SectionHead num="04" title="Outcomes" />
        <div className="grid grid-2">
          <div style={{ padding: 24, border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Before</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>Tender documents shuttled by hand between offices</li>
              <li>Bidder verification stretched over weeks, manually</li>
              <li>Audit trail reconstructed after the fact, if at all</li>
              <li>Amendments lost in email threads</li>
            </ul>
          </div>
          <div style={{ padding: 24, border: '1px solid var(--ink)', background: 'var(--paper)' }}>
            <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 10 }}>After</div>
            <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <li>End-to-end procurement online at edp.gov.bd</li>
              <li>Digital KYC + role-scoped bidder onboarding</li>
              <li>Every action signed, every state change audit-logged</li>
              <li>Amendments versioned, diffed, and traceable</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content" style={{ padding: '48px 40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px dashed var(--rule)', borderBottom: '1px dashed var(--rule)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Next case</div>
            <div className="display" style={{ fontSize: 28, fontStyle: 'italic' }}>The Hive — Internal AI ops</div>
          </div>
          <span className="arrow-link" onClick={() => onNav('hive')}>Read next →</span>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { EdpPage });
