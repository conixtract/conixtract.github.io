/* global React */
// Variant 3 — "Spectrum"
// Bento-grid hero, asymmetric layout, more color usage.
// Single language (en). Theme toggle lives in the nav strip.

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

function PKSpectrum() {
  const C = window.PK_CONTENT;
  const L = C.sectionLabels;
  const ref = useRefS(null);

  // theme state — persisted in localStorage so the toggle survives refreshes
  const [theme, setTheme] = useStateS(() => {
    try {return localStorage.getItem('pk-theme') || 'dark';} catch {return 'dark';}
  });
  useEffectS(() => {
    try {localStorage.setItem('pk-theme', theme);} catch {/* ignore */}
    // sync html background so iOS/macOS overscroll bounce matches the theme
    if (typeof document !== 'undefined') {
      document.documentElement.style.background = theme === 'light'
        ? 'oklch(0.985 0.005 90)'
        : 'oklch(0.16 0.02 285)';
    }
  }, [theme]);

  // scroll-reveal observer — fades elements in when they enter the viewport,
  // and resets them when they leave from the BOTTOM (scrolled back below the
  // fold) so they fade in again on the next scroll down. Elements that have
  // scrolled past the top stay visible.
  useEffectS(() => {
    const root = ref.current; if (!root) return;
    const els = root.querySelectorAll('.pk-reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
        } else if (entry.boundingClientRect.top > 0) {
          // exited towards the bottom -> reset so it re-fades on next entry
          entry.target.classList.remove('is-in');
        }
        // exited towards the top -> leave 'is-in' alone (stays visible)
      }),
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="pk-root pk-spectrum" data-theme={theme}>
      <div className="spc-mesh"></div>

      {/* nav strip */}
      <header className="spc-nav">
        <div className="spc-nav-l pk-mono">PK<span className="spc-nav-dot">·</span>{C.handle}</div>
        <div className="spc-nav-c pk-mono">Personal site / v3 Spectrum</div>
        <div className="spc-nav-r pk-mono">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <span className="spc-live">
            <span className="spc-live-dot" /> live
          </span>
        </div>
      </header>

      {/* ========= HERO (centered, editorial) ========= */}
      <section className="spc-hero">
        <h1 className="spc-hero-name">
          <span className="pk-grad">{C.name}</span>
        </h1>
        <div className="spc-hero-role">{C.role}</div>
        <div className="spc-hero-meta">
          <span className="pk-mono spc-hero-pill spc-hero-pill-live">
            <span className="spc-hero-dot" /> Open for inquiries
          </span>
          <span className="pk-mono spc-hero-pill">@ {C.location}</span>
        </div>
      </section>

      <hr className="spc-hr" />

      {/* ========= BENTO (photo + stats + links) ========= */}
      <section className="spc-bento">
        <div className="spc-card spc-card-photo">
          <div className="spc-photo-frame">
            <img className="spc-photo-img" src="assets/portrait.jpg" alt="Paul Kern" loading="lazy" />
          </div>
          <div className="spc-photo-cap pk-mono">
            <span>portrait.jpg</span>
            <span>2.9 MB</span>
          </div>
        </div>

        <div className="spc-card spc-card-stat" style={{ '--hue': 320 }}>
          <div className="spc-stat-l pk-mono">Years</div>
          <div className="spc-stat-v">4+</div>
          <div className="spc-stat-d">in engineering &amp; research</div>
        </div>

        <div className="spc-card spc-card-stat" style={{ '--hue': 270 }}>
          <div className="spc-stat-l pk-mono">Papers</div>
          <div className="spc-stat-v">{C.research.length}</div>
          <div className="spc-stat-d">peer-reviewed at SGP 2025</div>
        </div>

        <div className="spc-card spc-card-stat" style={{ '--hue': 210 }}>
          <div className="spc-stat-l pk-mono">Projects</div>
          <div className="spc-stat-v">{C.projects.length}</div>
          <div className="spc-stat-d">{C.projects.filter(p => p.href).length} public on GitHub</div>
        </div>

        <div className="spc-card spc-card-links">
          <div className="spc-card-h pk-mono">↳ Featured</div>
          {C.featured.map((l) =>
          <a key={l.label} href={l.href} className="spc-link" style={{ '--h': l.hue }} target={l.href !== '#' ? '_blank' : undefined} rel={l.href !== '#' ? 'noopener noreferrer' : undefined}>
              <span className="spc-link-l pk-mono">{l.label.toLowerCase()}</span>
              <span className="spc-link-h pk-mono">{l.handle}</span>
              <span className="pk-arrow">↗</span>
            </a>
          )}
        </div>

        <div className="spc-card spc-card-links">
          <div className="spc-card-h pk-mono">↳ Find me</div>
          {C.links.map((l) =>
          <a key={l.label} href={l.href} className="spc-link">
              <span className="spc-link-l pk-mono">{l.label.toLowerCase()}</span>
              <span className="spc-link-h pk-mono">{l.handle}</span>
              <span className="pk-arrow">↗</span>
            </a>
          )}
        </div>
      </section>

      {/* ========= ABOUT ========= */}
      <section className="spc-sec" id="about">
        <SHead idx="02" t={L.about} hue={320} />
        <div className="spc-about pk-reveal">
          <p className="spc-about-lead">{C.intro[0]}</p>
          {C.intro.slice(1).map((p, i) =>
          <p key={i} className="spc-about-p">{p}</p>
          )}
        </div>
      </section>

      {/* ========= CAREER (timeline) ========= */}
      <section className="spc-sec" id="career">
        <SHead idx="03" t={L.career} hue={280} />
        <ol className="spc-timeline">
          {C.career.map((e, i) =>
          <li key={i} className={`spc-tl-item pk-reveal ${e.kind}`} style={{ '--idx': i }}>
              <div className="spc-tl-year pk-mono">{e.range}</div>
              <div className="spc-tl-spine"><div className="spc-tl-node" /></div>
              <div className="spc-tl-body">
                <div className="spc-tl-meta pk-mono">
                  <span className={`spc-tl-kind ${e.kind}`}>{e.kind === 'edu' ? 'Edu' : e.kind === 'extra' ? 'Activity' : 'Work'}</span>
                </div>
                <h3 className="spc-tl-title">{e.role}</h3>
                <div className="spc-tl-org">{e.org}</div>
                {e.body && <p className="spc-tl-desc">{e.body}</p>}
                {e.tags.length > 0 &&
              <div className="spc-tags">
                    {e.tags.map((t) => <span key={t} className="pk-chip">{t}</span>)}
                  </div>
              }
              </div>
            </li>
          )}
        </ol>
      </section>

      {/* ========= PROJECTS ========= */}
      <section className="spc-sec" id="projects">
        <SHead idx="04" t={L.projects} hue={230} />
        <ol className="spc-proj">
          {C.projects.map((p, i) => {
            const Tag = p.href ? 'a' : 'li';
            const liProps = p.href
              ? { as: 'a', href: p.href, target: '_blank', rel: 'noopener noreferrer' }
              : {};
            return (
              <li key={i} className={`spc-proj-row pk-row pk-reveal ${p.private ? 'is-private' : ''}`} style={{ '--h': p.hue }}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="spc-proj-link" aria-label={p.title}></a>
                ) : null}
                <div className="spc-proj-year pk-mono">{p.year}</div>
                <div className="pk-thumb spc-proj-thumb"></div>
                <div className="spc-proj-body">
                  <div className="spc-proj-t">
                    {p.title}
                    {p.private && <span className="spc-proj-lock pk-mono" title="not publicly available">· private</span>}
                    {p.href && <span className="pk-arrow">↗</span>}
                  </div>
                  <p className="spc-proj-d">{p.desc}</p>
                </div>
                <div className="spc-proj-tags">
                  {p.tags.map((t) => <span key={t} className="pk-chip">{t}</span>)}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ========= RESEARCH ========= */}
      <section className="spc-sec" id="research">
        <SHead idx="05" t={L.research} hue={200} />
        <div className="spc-papers">
          {C.research.map((r, i) => {
            const Tag = r.href ? 'a' : 'div';
            const linkProps = r.href ? { href: r.href, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag key={i} className="spc-paper pk-reveal" style={{ '--hue': 200 + i * 28 }} {...linkProps}>
                <div className="spc-paper-top">
                  <span className="spc-paper-bar"></span>
                  <span className="spc-paper-num pk-mono">P/{String(i + 1).padStart(2, '0')}</span>
                  <span className="spc-paper-year pk-mono">{r.year}</span>
                </div>
                <div className="spc-paper-t">{r.title}</div>
                <div className="spc-paper-meta pk-mono">{r.venue} · {r.role}</div>
                <div className="spc-paper-status pk-mono">{r.status} ↗</div>
              </Tag>);

          })}
        </div>
      </section>

      {/* ========= SKILLS ========= */}
      <section className="spc-sec" id="skills">
        <SHead idx="06" t={L.skills} hue={170} />
        <div className="spc-skills">
          {C.skills.map((s, i) => {
            const hueBase = 320 - i * 30;
            return (
              <div key={i} className="spc-skill-card pk-reveal" style={{ '--hue': hueBase }}>
                <div className="spc-skill-h">
                  <span className="spc-skill-dot" />
                  <span className="spc-skill-cat">{s.cat}</span>
                  <span className="pk-mono spc-skill-n">{String(s.items.length).padStart(2, '0')}</span>
                </div>
                <div className="spc-skill-chips">
                  {s.items.map((it, j) =>
                  <span key={it} className="spc-skill-chip" style={{ '--h': hueBase + j * 15 }}>{it}</span>
                  )}
                </div>
              </div>);

          })}
        </div>
      </section>

      {/* ========= HOBBIES ========= */}
      <section className="spc-sec" id="hobbies">
        <SHead idx="07" t={L.hobbies} hue={130} />
        <div className="spc-hobbies">
          {C.hobbies.map((h, i) =>
          <div key={i} className="spc-hobby pk-reveal" style={{ '--hue': 320 - i * 30 }}>
              <div className="spc-hobby-orb" />
              <div>
                <div className="spc-hobby-t">{h.t}</div>
                {h.d && <div className="spc-hobby-d">{h.d}</div>}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========= CONTACT ========= */}
      <section className="spc-sec spc-sec-contact" id="contact">
        <SHead idx="08" t={L.contact} hue={320} />
        <div className="spc-contact-card">
          <div className="spc-contact-left">
            <div className="spc-contact-eyebrow pk-mono">↳ Say hi</div>
            <h2 className="spc-contact-h">
              <span className="pk-grad">Ask me anything.</span>
            </h2>
            <p className="spc-contact-p">{C.contact}</p>
          </div>
          <div className="spc-contact-right">
            {C.links.map((l) =>
            <a key={l.label} href={l.href} className="spc-contact-row">
                <span className="pk-mono spc-contact-row-l">{l.label}</span>
                <span className="spc-contact-row-h">{l.handle}</span>
                <span className="pk-arrow">↗</span>
              </a>
            )}
          </div>
        </div>
        <div className="spc-footstrip pk-mono">
          <span>© {new Date().getFullYear()} {C.name}</span>
          <span className="spc-foot-sep" />
          <a href="impressum.html" className="spc-foot-link">Impressum</a>
          <span className="spc-foot-sep" />
          <a href="privacy.html" className="spc-foot-link">Privacy</a>
          <span className="spc-foot-sep" />
          <span>this website was built with claude</span>
          <span className="spc-foot-sep" />
          <span>v3.0 spectrum</span>
        </div>
      </section>
    </div>);

}

function SHead({ idx, t, hue }) {
  return (
    <div className="spc-shead">
      <div className="spc-shead-l">
        <h2 className="spc-shead-t">{t}</h2>
      </div>
      <div className="spc-shead-rule" style={{ '--hue': hue }} />
    </div>);

}

// Compact two-state pill living in the nav. The active option pill slides
// between the two labels.
function ThemeToggle({ theme, setTheme }) {
  return (
    <div className={`spc-tt spc-tt-${theme}`} role="group" aria-label="Theme">
      <span className="spc-tt-pill" aria-hidden="true" />
      <button
        type="button"
        className="spc-tt-opt"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}>
        
        <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
          <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
        Dark
      </button>
      <button
        type="button"
        className="spc-tt-opt"
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}>
        
        <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.5" y1="4.5" x2="6" y2="6" />
            <line x1="18" y1="18" x2="19.5" y2="19.5" />
            <line x1="4.5" y1="19.5" x2="6" y2="18" />
            <line x1="18" y1="6" x2="19.5" y2="4.5" />
          </g>
        </svg>
        Light
      </button>
    </div>);

}

window.PKSpectrum = PKSpectrum;