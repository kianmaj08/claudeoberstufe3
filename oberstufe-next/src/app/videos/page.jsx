import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CardGrid from '@/components/CardGrid'

export const metadata = { title: 'Videos – oberstufe.site' }

export default function VideosPage() {
  return (
    <>
      <SiteHeader />
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-label"><div className="hero-label-dot" />Videos · 2026</div>
          <h1 className="hero-title">Vi<em>deos</em></h1>
          <p className="hero-subtitle">Alle Videoprojekte unserer Klasse.</p>
        </div>
      </section>
      <CardGrid page="videos" />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="coming-soon-box">
            <div className="cs-emoji">🎬</div>
            <h3>Bald verfügbar</h3>
            <p>Videoprojekte werden hier veröffentlicht sobald sie fertig sind.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}
