'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const BG_LABELS = { philosophie:'Ph', geschichte:'Ge', kunst:'Ku', physik:'Ph', chemie:'Ch', mathe:'Ma', erdkunde:'Ek', deutsch:'De', informatik:'It', sport:'Sp', sowi:'So' }
const TAG_LABELS = { sowi:'SoWi' }
const STATUS_LABELS = { fertig:'Fertig', in_arbeit:'In Arbeit', test:'Test', coming_soon:'Coming Soon' }

function tagLabel(tag) { return TAG_LABELS[tag] || (tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : '') }
function isNew(created_at) {
  if (!created_at) return false
  return Date.now() - new Date(created_at).getTime() < 1000 * 60 * 60 * 24 * 14
}

function Card({ card, style }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const tag = (card.tag || '').toLowerCase()
  const authors = Array.isArray(card.authors) ? card.authors.join(', ') : (card.authors || '')

  return (
    <div
      ref={ref}
      className={`card card--${tag}`}
      style={{ ...style, opacity: visible ? undefined : 0, transform: visible ? undefined : 'translateY(16px)', transition: 'opacity .5s ease, transform .5s ease, border-color .2s, box-shadow .22s' }}
    >
      <div className="card-bar" />
      <div className="card-bg-label">{BG_LABELS[tag] || ''}</div>
      {isNew(card.created_at) && <div className="card-new-badge">Neu</div>}
      <div className="card-inner">
        <div className="card-meta">
          {tag && <span className={`pill tag-${tag}`}>{tagLabel(tag)}</span>}
          <span className={`status status-${card.status}`}>{STATUS_LABELS[card.status] || card.status}</span>
        </div>
        <h3>{card.title}</h3>
        {card.subtitle && <p>{card.subtitle}</p>}
        {authors && <p className="card-authors">{authors}</p>}
      </div>
      <div className="card-foot">
        <a href={card.url || '#'} target="_blank" rel="noopener noreferrer" className="btn-open">
          Öffnen
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function CardGrid({ page }) {
  const [cards, setCards] = useState([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('standard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/cards.json', { cache: 'no-cache' })
      .then(r => r.json())
      .then(d => {
        const filtered = (d.cards || []).filter(c => c.is_published !== false && (c.page || 'home') === page)
        setCards(filtered)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page])

  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const displayed = cards
    .filter(c => !query || norm(c.title + ' ' + c.subtitle + ' ' + c.tag + ' ' + c.authors).includes(norm(query)))
    .sort((a, b) => {
      if (sort === 'az') return (a.title || '').localeCompare(b.title || '')
      if (sort === 'neu') return ((b.created_at || '') > (a.created_at || '') ? 1 : -1)
      return 0
    })

  useEffect(() => {
    const handler = e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('searchInput')?.focus() } }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {page === 'home' && (
        <div className="hero-search-wrap" style={{ marginBottom: 0 }}>
          <div className="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input id="searchInput" type="search" placeholder="Suche nach Fach oder Projekt …" value={query} onChange={e => setQuery(e.target.value)} />
            <span className="kbd">⌘ K</span>
          </div>
        </div>
      )}

      <section className="section" style={{ paddingTop: page === 'home' ? 0 : undefined }}>
        <div className="container">
          <div className="section-divider">
            <div className="section-divider-line" />
            <div className="section-divider-label">» Projekte «</div>
            <div className="section-divider-line" />
          </div>
          <div className="section-controls">
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)} style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23A8A49A' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '26px' }}>
              <option value="standard">Standard</option>
              <option value="neu">Neueste</option>
              <option value="az">A – Z</option>
            </select>
          </div>
          {loading ? (
            <div style={{ color: 'var(--muted)', padding: '20px 0' }}>Wird geladen …</div>
          ) : displayed.length === 0 ? (
            <div style={{ color: 'var(--muted)', padding: '20px 0' }}>Keine Projekte gefunden.</div>
          ) : (
            <div className="card-grid">
              {displayed.map((c, i) => (
                <Card key={c.id} card={c} style={{ animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
