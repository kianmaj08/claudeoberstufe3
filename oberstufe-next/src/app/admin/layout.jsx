import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export const metadata = { title: 'Admin – oberstufe.site' }

export default async function AdminLayout({ children }) {
  const { userId } = await auth()

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <Link href="/" className="brand">Oberstufe<em>.site</em> <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', fontFamily: 'var(--fu)', fontStyle: 'normal' }}>Admin</span></Link>
        <div className="header-right" style={{ gap: 12 }}>
          <Link href="/" className="btn btn-ghost" style={{ fontSize: '.8rem', padding: '6px 12px' }}>← Zur Seite</Link>
          {userId && <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: { width: 32, height: 32 } } }} />}
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
