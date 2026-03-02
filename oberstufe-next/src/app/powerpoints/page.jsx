import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CardGrid from '@/components/CardGrid'

export const metadata = { title: 'PowerPoints – oberstufe.site' }

const PDFS = [
  { title: 'Utilitarismus & Squid Game', subject: 'Philosophie', path: '/presentations/utilitarismus-squid-game.pdf' },
  { title: 'Buddhismus', subject: 'Philosophie', path: '/presentations/buddhismus.pdf' },
  { title: 'Fukushima', subject: 'Physik', path: '/presentations/fukushima.pdf' },
  { title: 'Kernkraft', subject: 'Physik', path: '/presentations/kernkraft.pdf' },
  { title: 'Die Immerfeuchten Tropen', subject: 'Erdkunde', path: '/presentations/die-immerfeuchten-tropen.pdf' },
  { title: 'Der Indien-Pakistan-Konflikt', subject: 'Erdkunde', path: '/presentations/der-indienpakistan-konflikt.pdf' },
  { title: 'Die Französische Revolution', subject: 'Geschichte', path: '/presentations/die-franzosische-revolution.pdf' },
  { title: 'Mathe', subject: 'Mathematik', path: '/presentations/mathe.pdf' },
  { title: 'Chemie', subject: 'Chemie', path: '/presentations/chemie.pdf' },
  { title: 'Deutsch', subject: 'Deutsch', path: '/presentations/deutsch.pdf' },
  { title: 'Informatik', subject: 'Informatik', path: '/presentations/informatik.pdf' },
  { title: 'Sport', subject: 'Sport', path: '/presentations/sport.pdf' },
]

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function PowerpointsPage() {
  return (
    <>
      <SiteHeader />

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-label"><div className="hero-label-dot" />Präsentationen · 2026</div>
          <h1 className="hero-title">Power<em>Points</em></h1>
          <p className="hero-subtitle">Alle Präsentationen unserer Fächer zum Download.</p>
        </div>
      </section>

      <CardGrid page="powerpoints" />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-divider">
            <div className="section-divider-line" />
            <div className="section-divider-label">» PDF Downloads «</div>
            <div className="section-divider-line" />
          </div>
          <div className="pdf-grid">
            {PDFS.map(p => (
              <div className="pdf-card" key={p.title}>
                <div className="pdf-icon"><PdfIcon /></div>
                <div className="pdf-info">
                  <strong>{p.title}</strong>
                  <span>{p.subject}</span>
                </div>
                <a href={p.path} download className="pdf-download">
                  <DownloadIcon /> PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
