'use client'

import styles from './Trending.module.scss'
import Image from 'next/image'

const Trending = () => {



return(
    <div className={styles.container}>
        <Image
            src='https://covers.openlibrary.org/b/lccn/93005405-M.jpg'
            width='100'
            height='100'
            alt='openLibrary_image_error'
        />
  </div>
)
}

export default Trending;