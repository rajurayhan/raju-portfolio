// shared.jsx — shared page chrome (topbar, footer, marginalia)

function TopBar({ current, onNav }) {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'sulus', label: 'Case Study' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <div className="topbar">
      <div className="brand" onClick={() => onNav && onNav('home')} style={{ cursor: 'pointer' }}>
        <div className="brand-mark">R</div>
        <div>
          <div style={{ lineHeight: 1 }}>Raju Rayhan</div>
          <div style={{ fontSize: 10.5, color: 'var(--muted)', fontWeight: 400, marginTop: 2, letterSpacing: '0.04em' }}>
            Head of Development · AI Platform Architect
          </div>
        </div>
      </div>
      <nav>
        {items.map((it) => (
          <a key={it.id}
             className={current === it.id ? 'active' : ''}
             onClick={() => onNav && onNav(it.id)}>
            {String(items.indexOf(it) + 1).padStart(2, '0')} · {it.label}
          </a>
        ))}
      </nav>
      <div className="status">
        <span className="status-dot" />
        <span>Available · Q3 2026</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div>
        <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>
          Raju Rayhan
        </div>
        <div>Dhaka, Bangladesh · UTC+6</div>
        <div style={{ marginTop: 4 }}>Crafting since 2016</div>
      </div>
      <div className="cols">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10, fontSize: 10 }}>Elsewhere</div>
          <a href="#">github.com/rajurayhan</a>
          <a href="#">linkedin.com/in/rajurayhan</a>
          <a href="#">send2raju.bd@gmail.com</a>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10, fontSize: 10 }}>Colophon</div>
          <div>JetBrains Mono · Instrument Serif</div>
          <div>Hand-set in HTML, 2026</div>
          <div style={{ marginTop: 8, color: 'var(--accent)' }}>v2.4.0</div>
        </div>
      </div>
    </div>
  );
}

function Ticker({ items }) {
  const row = items.join('  ');
  return (
    <div className="ticker">
      <div className="ticker-track">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  );
}

function SectionHead({ num, title, meta }) {
  return (
    <div className="section-head">
      <span className="num">§ {num}</span>
      <span className="title">{title}</span>
      <span className="rest" />
      {meta && <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{meta}</span>}
    </div>
  );
}

function Note({ children, rotate = -1.2, style }) {
  return <div className="note" style={{ transform: `rotate(${rotate}deg)`, ...style }}>{children}</div>;
}

Object.assign(window, { TopBar, Footer, Ticker, SectionHead, Note });
