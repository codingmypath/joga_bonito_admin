'use client'
import Metadata from '@/components/MetaData'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Metadata />
      <body className={inter.className}>
      <SessionProvider>{children}</SessionProvider></body>
    </html>
  )
}
