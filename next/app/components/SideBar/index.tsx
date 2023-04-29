'use client'

import React from 'react';
import useSettingsStore from '../../../zustand/settingsStore';
import styles from './SideBar.module.scss'


const SideBar = ({children,getBook}:any) => {
    const [hide,setHide] = React.useState(false)
    const elRef = React.useRef<any>(null)
    const [selected,setSelected] = React.useState([0,false]);

    return (
        <div className={hide ? styles.hidden : styles.container} ref={elRef}>
            <div className={styles.listHeader}>
                {!hide && <svg width="35" height="35" viewBox="0 0 103 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 0H64V16H42V0Z" fill="currentColor" />
                    <path d="M18 74H42V91H18V74Z" fill="#DAA520" />
                    <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="20" y="25" width="44" height="66">
                        <path d="M41.6393 51.093V25H53.9016H64V51.093V78.2093L53.1803 84.8605L41.6393 91H29.377H20V83.8372V76.1628H29.377H41.6393V51.093Z" fill="currentColor" />
                    </mask>
                    <g mask="url(#mask0)">
                        <rect x="42" y="25" width="22" height="67" fill="currentColor" />
                    </g>
                </svg>
                }
                <svg style={hide?{transform:'rotate(180deg)'}:{}} onClick={()=>setHide(hide=>!hide)} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><rect fill="none" height="24" width="24" /><g><polygon fill="currentColor" points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" /></g></svg>

            </div>
            <ul className={hide ? styles.hiddenList : styles.list}>
                
          {children.map((list:any,i:number) =>
           list.implement ? list.implement({component:<>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="none" d="M0 0h24v24H0z" />{list.path}</svg>
            <span>{list.text}</span>
         </>},getBook) : 
            <li key={i} onClick={()=>setSelected([i,true])}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="none" d="M0 0h24v24H0z" />{selected[0] === i && selected[1] ? list.selected_path : list.path}</svg>
            <span>{list.text}</span>
         </li>
         
)}
          </ul>
        </div>
    )
}


export default SideBar;