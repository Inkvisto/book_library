'use client'

import React from 'react';
import styles from './Inbox.module.scss'

export const Inbox = ({ messages }: any) => {
    const [checked, setChecked] = React.useState(true);
    const [starred,setStarred] = React.useState(false);
    const { payload, snippet } = messages;
    return (
        <ul className={styles.container}>
            <li className={styles.list}>

                <input className={styles.checkbox} type="checkbox"
                    onChange={() => setChecked(!checked)}
                />
                  <g className={styles.star} onClick={()=>setStarred(!starred)}>{
                    starred ? <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path  fill="#F99417" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M0 0h24v24H0z" fill="none"/><path fill="grey" d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
                  }
                 
                  </g>
          
        
<div className={styles.message}>
                <span>{payload.headers.filter((e: any) => e.name === 'Subject')[0].value}</span>
                <span>{snippet}</span>
                </div>
            </li>
        </ul>
    )
}

