'use client'
import styles from './Main.module.scss'
import React from 'react';
import { Fit } from './components/Fit/index'
import Link from "next/link";
import {Sphere} from './components/box.jsx'
import { Canvas } from '@react-three/fiber';

export default function Home({username,fitData }:{username:string | undefined,fitData:string | undefined}) {



  return (
    <div className={styles.container}>
      <div className={styles.user}>
      <div className={styles.photo}>
        <img src={'https://i.pinimg.com/originals/c6/90/a0/c690a0b31eb80f03f968daa65bacaac8.jpg'}  />
        </div>
        <div className={styles.userActivities}>
          <ul>
            <li>About</li>
            <li>Blog</li>
            <li>Portfolio</li>
            <li><Link href='http://localhost:3000/reader'>
            Books
            </Link></li>
          </ul>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.shape}></div>
            <ul>
              <li>
              {username}
              </li>
              <li>some info</li>
              <li>some info</li>
              <li>some info</li>
            </ul>

        </div>
        
        <div className={styles.circle}>
          <Sphere />
        </div>
      </div>
      <div>
        noap
      </div>
      <div className={styles.field}>
      work
     <Link href={'http://localhost:3000/fit'}>sport</Link>
      </div>
      <div className={styles.messages}>
      <Link href='http://localhost:3000/email'>
      messages
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>

      </div>
      <div className={styles.field2}>
      Music
      </div>

      <div>
     
      <div className={styles.donutChart}>
        {fitData ?   <Fit fitData={fitData} /> : null}
        </div>
      </div>  
    </div>

  )
}



/*
<div className={styles.container}>
 {booksTitleData && booksTitleData?.booksIds.map((e: number, i: number) => {
   return (
     <li key={i} >
       <object 
       className={styles.cover}
       data={`https://www.gutenberg.org/files/${e}/${e}-h/images/cover.jpg`} type="image/jpg">
         <Image src="/1000_F_119179960_I5SxcqGPtfEX2Wvf9ThwZYqGNx5jcf4l.jpg" alt='' width={300} height={400} />
       </object>
    <span className={styles.title}>
    {booksTitleData?.titles[i]}
    </span>
     </li>
   )
 })}

</div>*/