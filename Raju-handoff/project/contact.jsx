// contact.jsx — Contact page

function ContactPage({ onNav }) {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '', email: '', company: '', budget: 'not-sure', engagement: 'fractional', message: '',
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <React.Fragment>
      <TopBar current="contact" onNav={onNav} />

      <div className="content" style={{ padding: '64px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* LEFT */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>§ Start a conversation</div>
            <h1 className="display" style={{ fontSize: 80, margin: 0, lineHeight: 0.95 }}>
              <span style={{ fontStyle: 'italic' }}>Let's</span> trade
              <br />
              a few <span style={{ color: 'var(--accent)' }}>emails</span>.
            </h1>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--ink-soft)', marginTop: 24, lineHeight: 1.55, maxWidth: 440 }}>
              I reply within two working days, in full sentences, from my actual keyboard.
            </div>

            <div style={{ marginTop: 40, borderTop: '1px solid var(--rule)', paddingTop: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Direct</div>
              <div style={{ fontSize: 13, lineHeight: 2 }}>
                <div>✉ <a className="inline" href="mailto:send2raju.bd@gmail.com">send2raju.bd@gmail.com</a></div>
                <div>☏ +880 1849 699001</div>
                <div>✦ Dhaka, Bangladesh — UTC+6</div>
              </div>
            </div>

            <div style={{ marginTop: 28, borderTop: '1px solid var(--rule)', paddingTop: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Good fits</div>
              <ul style={{ paddingLeft: 0, listStyle: 'none', fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)' }}>
                <li>+ AI platform / architecture reviews</li>
                <li>+ MCP server builds (Laravel-first, but flexible)</li>
                <li>+ Voice-AI infrastructure — Pipecat, Deepgram, 11Labs</li>
                <li>+ Fractional Head of Engineering (3—6 months)</li>
                <li>− Pure frontend / design work — not my strength</li>
                <li>− Sub-2-week sprints — I do thoughtful, not frantic</li>
              </ul>
            </div>

            <Note rotate={-2} style={{ marginTop: 36, width: 300 }}>
              P.S. If you're a founder, just send a one-paragraph sketch
              of the problem. No deck required. I'd rather read your messy thinking
              than a polished ask.
            </Note>
          </div>

          {/* RIGHT — form */}
          <div>
            {!sent ? (
              <div style={{ border: '1px solid var(--rule)', background: 'var(--paper-2)', padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div className="eyebrow">/form/new-engagement.md</div>
                  <div style={{ fontSize: 10.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                    <span className="status-dot" style={{ display: 'inline-block', marginRight: 6, verticalAlign: 'middle' }} />
                    encrypted · pgp available
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="form-field">
                    <label>Name</label>
                    <input value={form.name} onChange={set('name')} placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
                  </div>
                  <div className="form-field">
                    <label>Company (optional)</label>
                    <input value={form.company} onChange={set('company')} placeholder="Where you're writing from" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="form-field">
                      <label>Engagement</label>
                      <select value={form.engagement} onChange={set('engagement')}>
                        <option value="fractional">Fractional Head of Eng</option>
                        <option value="advisory">Architecture advisory</option>
                        <option value="build">Project build</option>
                        <option value="review">Platform / code review</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Budget range</label>
                      <select value={form.budget} onChange={set('budget')}>
                        <option value="not-sure">Not sure yet</option>
                        <option value="under-10k">Under $10k</option>
                        <option value="10-25k">$10k — $25k / mo</option>
                        <option value="25k-plus">$25k+ / mo</option>
                        <option value="retainer">Ongoing retainer</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>The situation</label>
                    <textarea value={form.message} onChange={set('message')} placeholder="What are you building? What's getting in the way?" required />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      <span className="prompt" style={{ fontSize: 11 }}>send --carefully</span>
                    </div>
                    <button type="submit" className="btn">Send message →</button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)', padding: 48, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 20 }}>
                  ✓ MESSAGE QUEUED
                </div>
                <div className="display" style={{ fontSize: 44, marginBottom: 16 }}>
                  Thanks, <span style={{ fontStyle: 'italic' }}>{form.name || 'friend'}</span>.
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--ink-soft)', marginBottom: 28, lineHeight: 1.5 }}>
                  I'll read it this evening over tea and write back from
                  <br />
                  <span style={{ color: 'var(--accent)' }}>send2raju.bd@gmail.com</span> within two working days.
                </div>
                <div className="term" style={{ textAlign: 'left', fontSize: 11.5 }}>
                  <div><span className="c-prompt">raju@studio</span>:~$ mail --queue</div>
                  <div className="c-ok">✓ 1 message pending · from: {form.email || 'you'}</div>
                  <div className="c-comment">{'// will reply by ' + new Date(Date.now() + 2 * 86400000).toDateString()}</div>
                </div>
                <button className="btn ghost" style={{ marginTop: 24 }} onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', budget: 'not-sure', engagement: 'fractional', message: '' }); }}>
                  Send another
                </button>
              </div>
            )}

            <div style={{ marginTop: 20, display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)' }}>
              <span>◆ reply window: &lt; 48h</span>
              <span>◆ working hours: 10 — 19 UTC+6</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

Object.assign(window, { ContactPage });
