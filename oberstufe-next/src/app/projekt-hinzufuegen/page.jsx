import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = { title: 'Projekt hinzufügen – oberstufe.site' }

export default function AddPage() {
  return (
    <>
      <SiteHeader />
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-label"><div className="hero-label-dot" />Mitmachen · 2026</div>
          <h1 className="hero-title">Projekt hinzu<em>fügen</em></h1>
          <p className="hero-subtitle">Du hast ein Schulprojekt und möchtest es hier vorstellen?</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-divider">
            <div className="section-divider-line" />
            <div className="section-divider-label">» So geht es «</div>
            <div className="section-divider-line" />
          </div>
          <div className="steps-grid">
            {[
              { n: '01', title: 'Kontakt aufnehmen', text: 'Sprich uns in der Schule an oder schreib uns eine E-Mail mit einer kurzen Beschreibung deines Projekts.' },
              { n: '02', title: 'Infos schicken', text: 'Schick uns Titel, Beschreibung, den Link zu deinem Projekt, das Fach und deinen Namen.' },
              { n: '03', title: 'Fertig!', text: 'Wir fügen dein Projekt hinzu und es ist für alle sichtbar. Das dauert nur wenige Minuten.' },
            ].map(s => (
              <div className="step-box" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-divider">
            <div className="section-divider-line" />
            <div className="section-divider-label">» Kontakt «</div>
            <div className="section-divider-line" />
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <strong>Persönlich in der Schule</strong>
              <p>Sprich einfach Kian oder einen der anderen Autoren direkt an.</p>
            </div>
            <div className="contact-card">
              <strong>E-Mail</strong>
              <p>Schreib uns direkt:</p>
              <a href="mailto:oberstufesite@gmail.com" className="btn btn-sky" style={{ marginTop: 4 }}>oberstufesite@gmail.com</a>
            </div>
            <div className="contact-card">
              <strong>Google-Formular</strong>
              <p>Nutze unser Feedback- und Einreichungsformular.</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSc7hitAkvgDHXnOKgRpvolibMhm3iHeag_V-Azm4Mz8zef63w/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-sky" style={{ marginTop: 4 }}>Zum Formular</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
