import React from 'react'
import styles from './BasicLayout.module.scss'

const BasicLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  )
}

export default BasicLayout
