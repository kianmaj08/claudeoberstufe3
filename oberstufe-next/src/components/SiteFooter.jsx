import Link from 'next/link'

export default function SiteFooter({ version = 'v4.0' }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-brand">Oberstufe<em>.site</em></div>
        <p className="footer-tagline">Die zentrale Startseite aller Schulprojekte der Q1 · Gehostet auf Vercel</p>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/powerpoints">PowerPoints</Link>
          <Link href="/videos">Videos</Link>
          <Link href="/spiele">Spiele</Link>
          <Link href="/projekt-hinzufuegen">Projekt hinzufügen</Link>
          <a href="mailto:oberstufesite@gmail.com">E-Mail</a>
          <Link href="/admin">Admin</Link>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          © 2026 oberstufe.site · {version} ·{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>
        </div>
      </div>
    </footer>
  )
}
