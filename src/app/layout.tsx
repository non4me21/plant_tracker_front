
import VideoBackground from '@/components/VideoBackground/VideoBackground'
import './globals.css'
import styles from './layout.module.scss'

export const metadata = {
  title: 'Plant Tracker',
  description: 'Track info about your plants!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <head></head>
      <body className={styles.main}>
          <VideoBackground />
          {children}
      </body>
    </html>
  )
}
