import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CardGrid from '@/components/CardGrid'

export const metadata = { title: 'Spiele – oberstufe.site' }

export default function SpielePage() {
  return (
    <>
      <SiteHeader />
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-label"><div className="hero-label-dot" />Spiele · 2026</div>
          <h1 className="hero-title">Spie<em>le</em></h1>
          <p className="hero-subtitle">Interaktive Lern- und Mathematikspiele direkt im Browser.</p>
        </div>
      </section>
      <CardGrid page="spiele" />
      <SiteFooter />
    </>
  )
}
