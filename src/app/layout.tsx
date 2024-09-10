'use client';


import VideoBackground from '@/components/VideoBackground/VideoBackground'
import './globals.css'
import styles from './layout.module.scss'
import BasicLayout from '@/containers/BasicLayout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './themes'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <head></head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={styles.BackgroundImage}/>
          <VideoBackground />
          <BasicLayout>
            {children}
          </BasicLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
