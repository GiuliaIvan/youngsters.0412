import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vipps U15 - Learn Money, Have Fun!',
  description: 'A gamified financial learning experience for youngsters',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  )
}

