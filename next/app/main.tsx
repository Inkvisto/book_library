'use client'
import Image from "next/image";
import styles from './Main.module.scss'
import React from 'react';
export default function Home({ booksTitleData }: { booksTitleData: { titles: string, booksIds: number[] } }) {



  console.log(booksTitleData.titles);

  return (
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
         {booksTitleData.titles[i]}
         </span>
          </li>
        )
      })}

    </div>
  )
}