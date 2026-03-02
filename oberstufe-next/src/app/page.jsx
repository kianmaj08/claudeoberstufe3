import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CardGrid from '@/components/CardGrid'

export const metadata = { title: 'oberstufe.site – Startseite' }

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-label">
            <div className="hero-label-dot" />
            Q1 · Schulprojekte 2026
          </div>
          <h1 className="hero-title">Oberstufe<em>.site</em></h1>
          <p className="hero-sub">
            Websites, Präsentationen und Spiele aus unseren Schulprojekten – an einem Ort gesammelt.
          </p>
          <p className="hero-meta">Kian · Konstantin · Basit · Mark · Kamil · Hugo</p>
        </div>
      </section>

      <CardGrid page="home" />

      {/* Info Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-divider">
            <div className="section-divider-line" />
            <div className="section-divider-label">» Info «</div>
            <div className="section-divider-line" />
          </div>
          <div className="info-wrap">
            <div className="box">
              <h3>Über das Projekt</h3>
              <p>Entstanden 2025/2026 im Rahmen unserer schulischen Arbeiten. Wir entwickeln Websites und Präsentationen zu verschiedenen Fächern.</p>
              <p>
                Gehostet auf <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> ·
                Domain via <a href="https://squarespace.com" target="_blank" rel="noopener noreferrer">Squarespace</a> ·{' '}
                <a href="mailto:oberstufesite@gmail.com">oberstufesite@gmail.com</a>
              </p>
              <div style={{ marginTop: 18 }}>
                <h3>FAQ</h3>
                <FaqList />
              </div>
            </div>
            <div className="right-col">
              <div className="stat-box">
                <div className="stat-number">8</div>
                <div className="stat-label">Aktive Projekte</div>
                <div className="stat-sub">Stand 2026 · aus 6 Fächern</div>
                <div className="mini-chart">
                  {[
                    { label: 'Geschichte', pct: 100, color: '#92400E', count: 3 },
                    { label: 'Informatik', pct: 67, color: '#0369A1', count: 2 },
                    { label: 'Philosophie', pct: 33, color: '#7C3AED', count: 1 },
                    { label: 'Kunst', pct: 33, color: '#1D4ED8', count: 1 },
                  ].map(b => (
                    <div className="mini-bar-row" key={b.label}>
                      <div className="mini-bar-label">{b.label}</div>
                      <div className="mini-bar-track">
                        <div className="mini-bar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                      </div>
                      <div className="mini-bar-count">{b.count}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="box sky">
                <h3>Geplant</h3>
                <ul className="imp-list">
                  <li><strong>Homepage</strong> – Design &amp; Struktur verbessern</li>
                  <li><strong>Bilder</strong> – Philexikon &amp; Bruegel ergänzen</li>
                  <li><strong>Neue Themen</strong> – weitere Fächer folgen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

function FaqList() {
  'use client'
  const faqs = [
    { q: 'Was ist oberstufe.site?', a: 'Unsere zentrale Startseite, die alle Schülerprojekte der Q1 bündelt — jederzeit erreichbar.' },
    { q: 'Warum gibt es mehrere Websites?', a: 'Jedes Projekt hat ein eigenes Thema und wird deshalb auf einer eigenen Website präsentiert.' },
    { q: 'Sind die Inhalte final?', a: 'Nein – alle Projekte sind noch in Arbeit und ändern sich laufend.' },
    { q: 'Wie werden die Seiten betrieben?', a: 'Alle Websites laufen auf Vercel. Die Domain wird über Squarespace verwaltet.' },
    { q: 'Kann ich Feedback geben?', a: 'Ja – per E-Mail oder über unser Google-Formular.' },
  ]
  return (
    <div style={{ marginTop: 6 }}>
      {faqs.map((f, i) => (
        <details key={i} className="faq-item" style={{ listStyle: 'none' }}>
          <summary className="faq-q" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', fontSize: '.855rem', fontWeight: 500, cursor: 'pointer', userSelect: 'none', listStyle: 'none' }}>
            {f.q}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, flexShrink: 0, color: 'var(--muted)' }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="faq-a" style={{ maxHeight: 'none', paddingBottom: 11, fontSize: '.83rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.a}</div>
        </details>
      ))}
    </div>
  )
}
