import React from 'react';
import useSettingsStore from '../../zustand/settingsStore';
import Downloads from './lists/downloads';
import styles from './SideBar.module.scss'


const SideBar = ({getBook}:any) => {
    const [hide,setHide] = React.useState(false)
    const elRef = React.useRef<any>(null)
    const {toggleOpen,color_mode} = useSettingsStore((state) => ({toggleOpen:state.toggleOpen,color_mode:state.color_mode}));
   
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
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg>
                    <span>
                        Reading Now
                    </span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" /></svg>
                    <span>
                    Books & documents
                    </span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                    <span>
                    Favorites
                    </span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path fill="currentColor" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                    <span>
                    To Read
                    </span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" /></svg>
                    <span>
                    Have Read
                    </span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M0 0h24v24H0V0z" fill="none" /><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" /><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z" /></svg>
                    <span>
                    Collections
                    </span>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" /></svg>
                    <span>
                    Formats
                    </span>
                </li>
                <Downloads getBook={getBook}  />
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                    <span>
                    Trash    
                    </span>
                   
                </li>
                <hr />
                <li onClick={toggleOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none" /><path fill="currentColor" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" /></g></svg>
                    <span>
                    Settings
                    </span>
                  
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" /></svg>
                    <span>
                    Send feedback
                    </span>
                   
                </li>
            </ul>
        </div>
    )
}


export default SideBar;