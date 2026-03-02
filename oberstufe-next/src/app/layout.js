import { ClerkProvider } from '@clerk/nextjs'
import { Instrument_Serif, Inter } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
})

export const metadata = {
  title: 'oberstufe.site',
  description: 'Die zentrale Startseite aller Schulprojekte der Q1',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="de" className={`${instrumentSerif.variable} ${inter.variable}`}> 
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}