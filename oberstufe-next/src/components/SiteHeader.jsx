'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/powerpoints', label: 'PowerPoints' },
  { href: '/videos', label: 'Videos' },
  { href: '/spiele', label: 'Spiele' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">Oberstufe<em>.site</em></Link>
          <nav className="site-nav">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="header-right">
            <button
              className="icon-btn burger-btn"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menü"
              aria-expanded={mobileOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
            {l.label}
          </Link>
        ))}
        <Link href="/projekt-hinzufuegen">Projekt hinzufügen</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </>
  )
}
