import React from 'react'
import { host } from '../../constants/server.constants'
import Header from '../Header/index'
import styles from './Layout.module.scss'
import { useRouter } from 'next/router'
import useSettingsStore from '../../zustand/settingsStore'
import { ColorAsset } from '../../constants/settings.types'

const Layout = ({ children,user }: any) => {
  const color_mode = useSettingsStore((state) => (state.color_mode));
  const color_asset: ColorAsset = {
    'day':
      `body {
        background-color: #FEFCF3;
      }`,
    'sepia_contrast':
      `body {
      background-color: #EEE3CB;
    }`
  }
  

  return (
    <>
      <style jsx global>
        {`${color_asset[color_mode as keyof ColorAsset]}`}
      </style>
      <header className={styles.header}>
       <Header username={user?.name} />
      </header>
      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

export default Layout;