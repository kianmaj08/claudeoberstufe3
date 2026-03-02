'use client'
import { useState, useEffect } from 'react'

const TAGS = ['philosophie','geschichte','kunst','physik','chemie','mathe','erdkunde','deutsch','informatik','sport','sowi']
const STATUSES = ['fertig','in_arbeit','test','coming_soon']
const PAGES = ['home','powerpoints','videos','spiele']
const STATUS_LABELS = { fertig:'Fertig', in_arbeit:'In Arbeit', test:'Test', coming_soon:'Coming Soon' }
const TAG_LABELS = { sowi:'SoWi' }
const tagLabel = t => TAG_LABELS[t] || (t ? t.charAt(0).toUpperCase() + t.slice(1) : '–')

const EMPTY = { id:'', title:'', subtitle:'', authors:'', url:'', tag:'', status:'in_arbeit', page:'home', is_published:true, created_at:'' }

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t) }, [onDone])
  return <div className="toast">{msg}</div>
}

function Modal({ card, onClose, onSave }) {
  const [form, setForm] = useState(card)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>{form.id ? 'Karte bearbeiten' : 'Neue Karte'}</h3>

        <div className="field">
          <label>Titel *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="z.B. Philexikon" />
        </div>
        <div className="field">
          <label>Beschreibung</label>
          <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Kurze Beschreibung …" />
        </div>
        <div className="field">
          <label>Autoren</label>
          <input value={form.authors} onChange={e => set('authors', e.target.value)} placeholder="z.B. Kian, Basit & Mark" />
        </div>
        <div className="field">
          <label>URL *</label>
          <input type="url" value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://…" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field">
            <label>Fach</label>
            <select value={form.tag} onChange={e => set('tag', e.target.value)}>
              <option value="">– Kein Fach –</option>
              {TAGS.map(t => <option key={t} value={t}>{tagLabel(t)}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Seite</label>
            <select value={form.page} onChange={e => set('page', e.target.value)}>
              {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Sichtbar</label>
            <select value={form.is_published ? 'ja' : 'nein'} onChange={e => set('is_published', e.target.value === 'ja')}>
              <option value="ja">Ja – sichtbar</option>
              <option value="nein">Nein – versteckt</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>ID</label>
          <input value={form.id} onChange={e => set('id', e.target.value)} placeholder="Eindeutige ID (z.B. Philexikon1244)" />
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Abbrechen</button>
          <button className="btn btn-sky" onClick={() => {
            if (!form.title.trim() || !form.url.trim()) { alert('Titel und URL sind Pflichtfelder.'); return }
            const id = form.id.trim() || form.title.replace(/\s+/g, '').slice(0, 20) + Date.now()
            onSave({ ...form, id })
          }}>Speichern</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | card object
  const [toast, setToast] = useState(null)
  const [filter, setFilter] = useState('all')

  const showToast = msg => setToast(msg)

  useEffect(() => {
    fetch('/data/cards.json', { cache: 'no-cache' })
      .then(r => r.json())
      .then(d => setCards(d.cards || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // In a real deploy you'd POST to an API route that writes to a DB or KV store.
  // Here we show the updated JSON for the user to copy, since Vercel has no writable FS.
  const saveCards = (updated) => {
    setCards(updated)
    const json = JSON.stringify({ cards: updated }, null, 2)
    // Copy to clipboard
    navigator.clipboard?.writeText(json).catch(() => {})
    showToast('Gespeichert! cards.json in Zwischenablage kopiert.')
  }

  const handleSave = (card) => {
    const idx = cards.findIndex(c => c.id === card.id)
    const updated = idx >= 0
      ? cards.map((c, i) => i === idx ? card : c)
      : [...cards, { ...card, created_at: card.created_at || new Date().toISOString() }]
    saveCards(updated)
    setModal(null)
  }

  const handleDelete = (id) => {
    if (!confirm('Karte wirklich löschen?')) return
    saveCards(cards.filter(c => c.id !== id))
  }

  const handleToggle = (id) => {
    saveCards(cards.map(c => c.id === id ? { ...c, is_published: !c.is_published } : c))
  }

  const filtered = filter === 'all' ? cards : cards.filter(c => c.page === filter)

  const kpis = [
    { label: 'Gesamt', value: cards.length },
    { label: 'Sichtbar', value: cards.filter(c => c.is_published !== false).length },
    { label: 'In Arbeit', value: cards.filter(c => c.status === 'in_arbeit').length },
    { label: 'Fertig', value: cards.filter(c => c.status === 'fertig').length },
  ]

  return (
    <div className="admin-body">
      <div className="admin-title">Dashboard</div>
      <div className="admin-sub">Projekte verwalten · oberstufe.site</div>

      {/* KPIs */}
      <div className="kpi-grid">
        {kpis.map(k => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <div className="admin-table-head">
          <h2>Alle Karten</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['all', ...PAGES].map(p => (
              <button key={p} className={`btn ${filter === p ? 'btn-sky' : ''}`} style={{ padding: '6px 12px', fontSize: '.78rem' }} onClick={() => setFilter(p)}>
                {p === 'all' ? 'Alle' : p}
              </button>
            ))}
            <button className="btn btn-dark" onClick={() => setModal({ ...EMPTY })}>+ Neue Karte</button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '24px', color: 'var(--muted)' }}>Wird geladen …</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Titel</th>
                  <th>Fach</th>
                  <th>Status</th>
                  <th>Seite</th>
                  <th>Sichtbar</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td className="td-title">
                      <div>{c.title}</div>
                      {c.subtitle && <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: 2 }}>{c.subtitle}</div>}
                    </td>
                    <td>
                      {c.tag ? <span className={`pill tag-${c.tag}`}>{tagLabel(c.tag)}</span> : <span style={{ color: 'var(--stone-400)' }}>–</span>}
                    </td>
                    <td>
                      <span className={`status status-${c.status}`}>{STATUS_LABELS[c.status] || c.status}</span>
                    </td>
                    <td style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{c.page || 'home'}</td>
                    <td>
                      <button
                        onClick={() => handleToggle(c.id)}
                        style={{ background: c.is_published !== false ? '#ECFDF5' : 'var(--stone-100)', color: c.is_published !== false ? '#065F46' : 'var(--stone-400)', border: 'none', borderRadius: 99, padding: '3px 10px', fontSize: '.72rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '.04em', textTransform: 'uppercase' }}
                      >
                        {c.is_published !== false ? '● Ja' : '○ Nein'}
                      </button>
                    </td>
                    <td>
                      <div className="td-actions">
                        <button className="btn" style={{ padding: '5px 10px', fontSize: '.78rem' }} onClick={() => setModal({ ...c, authors: Array.isArray(c.authors) ? c.authors.join(', ') : (c.authors || '') })}>
                          Bearbeiten
                        </button>
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '5px 10px', fontSize: '.78rem' }}>↗</a>
                        <button className="btn" style={{ padding: '5px 10px', fontSize: '.78rem', color: '#DC2626', borderColor: '#FCA5A5' }} onClick={() => handleDelete(c.id)}>
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* JSON export info */}
      <div className="box" style={{ marginTop: 14 }}>
        <h3>📋 cards.json aktualisieren</h3>
        <p>Nach dem Speichern wird die aktualisierte <code>cards.json</code> automatisch in deine Zwischenablage kopiert. Füge sie in <code>public/data/cards.json</code> ein und push zu Vercel — dann sind die Änderungen live.</p>
        <p style={{ marginTop: 8 }}>
          <button className="btn btn-sky" onClick={() => {
            const json = JSON.stringify({ cards }, null, 2)
            navigator.clipboard?.writeText(json)
            showToast('cards.json in Zwischenablage kopiert!')
          }}>
            Jetzt kopieren
          </button>
        </p>
      </div>

      {modal && <Modal card={modal} onClose={() => setModal(null)} onSave={handleSave} />}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
