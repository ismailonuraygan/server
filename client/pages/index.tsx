import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import HomePageLayout from '../layouts/Home'
import styles from '../styles/Home.module.css'
import { ReactElement } from 'react'

const Home  = () => {
  return (
    <div className={styles.container}></div>
  )
}

Home.getLayout = function(page: ReactElement){
  return <HomePageLayout>{page}</HomePageLayout>
} 
export default Home
