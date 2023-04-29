'use client'

import React from 'react';
import shallow from 'zustand/shallow';
import useSettingsStore from '../../zustand/settingsStore';
import Settings from '../components/Settings';
import SideBar from '../components/SideBar';
import { downloads } from '../components/SideBar/lists/downloads';
import styles from './Reader.module.scss';
import spinnerStyles from './spinner.module.scss';

type NavigationOfBook = {
    'href': string,
    'id': string,
    'media-type': string
  }
  
  type Html = {
    [index: string]: string | string[],
  }
  
  type Book = {
    navigation: NavigationOfBook[],
    html: Html[]
  }
  type initialStateType = { count: number }
  
  type ACTIONTYPE =
    | { type: "next" }
    | { type: "prev" }
    | { type: 'reset' };
  
  
  function reducer(state: initialStateType, action: ACTIONTYPE) {
    switch (action.type) {
      case 'next':
        return { count: state.count + 1 };
      case 'prev':
        return { count: state.count - 1 };
      case 'reset':
        return { count: 0 }
      default:
        throw new Error();
    }
  }
  
  
  const sidebar = [
    {
      path:<path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />,
      text: 'Reading Now'
    },
    {
      path:<path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />,
      text: 'Books & documents'
    },
    {
      path:<path fill="currentColor" d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />,
      text: ' Favorites'
    },
    {
      path:<g><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path fill="currentColor" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></g>,
      text: 'To Read'
    },
    {
      path:<g><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" /></g>,
      text: 'Have Read'
    },
    {
      path:<g><path d="M0 0h24v24H0V0z" fill="none" /><path d="M0 0h24v24H0V0z" fill="none" /><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" /><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z" /></g>,
      text: 'Collections'
    },
    {
      path:<g><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" /></g>,
      text: 'Formats'
    },
    {
      path:<g><rect fill="none" height="24" width="24" /><path fill="currentColor" d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z" /></g>,
      text:'Downloads',
      implement:downloads,
    },
    {
      path:<g><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" /></g>,
      text: 'Trash'
    },
    {
      path: <g><path d="M0,0h24v24H0V0z" fill="none" /><path fill="currentColor" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" /></g>,
      text: 'Settings'
    },
    {
      path:<g><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" /></g>,
      text: 'Send feedback'
    },

   


  ]

export const Reader = (cookie:any=null) => {
    const [book,getBook] = React.useState(null)
    const {toggleOpen,color_mode} = useSettingsStore((state) => ({toggleOpen:state.toggleOpen,color_mode:state.color_mode}));
    return (
      <div style={{'display':'flex'}}>
        <SideBar children={sidebar} getBook={getBook} />
        <BookRender book={book} /> 
      </div>
    )
    
};


const BookRender = ({book}:any) => {
        const { open, scroll_mode } = useSettingsStore(
          (state) => ({ scroll_mode: state.scroll_mode, open: state.open }),
          shallow
        )
      
        const [page, dispatchPage] = React.useReducer(reducer, { count: 0 });
        const [section, dispatchSection] = React.useReducer(reducer, { count: 0 })
        const [hidden, setHidden] = React.useState<boolean>(false)
        const [settingsToggle,useSettingsToggle] = React.useState(false)
      
      
        //  open ? useSettingsToggle(true) : useSettingsToggle(false)
      
      
        let currentChapter: (string | string[])[] = Object.values(book?.html?.slice(page.count, page.count + 1)[0] ?? []);
      
      
        
      
        let currentHref: string | string[] = Object.keys(book?.html?.slice(page.count, page.count + 1)[0] ?? []);
      
      
        let currentSection: string = typeof currentChapter[0] === 'object' ? currentChapter[0].slice(section.count, section.count + 1)[0] : currentChapter[0];
      
      
      
      
        const keyDownNav = (event: React.KeyboardEvent<HTMLDivElement> | {key:string}) => {  
      
        let dispatchType = dispatchPage;    
        if (typeof currentChapter[0] === 'object') dispatchType = dispatchSection;
        if (section.count === 0) {
          dispatchType = dispatchPage
        }
        
        if (currentChapter[0]?.length - 1 === section.count) {
          dispatchSection({ type: 'reset' })
          dispatchType = dispatchPage
        }
      
          if (page.count !== 0 && event.key === 'ArrowLeft') {
            handleSlideLeft(dispatchType)
          } else if (page.count !== book?.navigation.length && event.key === 'ArrowRight') {    
            handleSlideRight(dispatchType)
          }
        }
      
      
        const body_ref = React.useRef<HTMLDivElement|null>(null)
      
      
        const handleSlideLeft = (dispatch: any) => dispatch({ type: 'prev' });
        const handleSlideRight = (dispatch: any) => dispatch({ type: 'next' });
      
        /*React.useEffect(() => {
          if (currentChapter) {
            const href = currentHref[0]?.split('/')    
            if (href) {
              const url = '/reader/' + href[href.length - 1]
              window.history.pushState(null, '', url)
            }
          }
        }, [page.count])*/
      
      
      
        return (
          <>
            <div className={styles.container} onKeyDown={(e) => keyDownNav(e)} tabIndex={0} >
              <div className={hidden ? styles.bookContainerHidden : styles.bookContainer}>
                {book && <>
                  {scroll_mode === 'chapters' &&
                    <>
                      <button className={styles.arrow} onClick={()=>keyDownNav({key:'ArrowLeft'})}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" /></svg></button>
                      {currentChapter.length === 0 ? <div className={spinnerStyles.spinnerContainer}>
                        <svg className={spinnerStyles.spinner}>
                          <circle cx="40" cy="40" r="30"></circle>
                        </svg>
                      </div> : <div className={styles.chaptersBook} ref={body_ref} dangerouslySetInnerHTML={{ __html: currentSection }} >
                      </div>}
                      <button className={styles.arrow} onClick={()=>keyDownNav({key:'ArrowRight'})}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg></button></>
                  }
                  {
                    scroll_mode === 'scroll' &&
                    <>
                    {currentChapter.length === 0 ? <div className={spinnerStyles.spinnerContainer}>
                    <svg className={spinnerStyles.spinner}>
                      <circle cx="40" cy="40" r="30"></circle>
                    </svg>
                  </div> : <div className={styles.scrollBook} ref={body_ref} dangerouslySetInnerHTML={{ __html: book?.html.map((e:any)=>Object.values(e)[0]).join('') }} >
                  </div>}
                  </>
                  }
                </>}
              </div>
              <div className={styles.counter}>{scroll_mode === 'chapters' && book?.navigation?.length ? page.count + '/' + book?.navigation?.length : null}</div>
            </div>
            {settingsToggle ? <Settings /> : null}
          </>
        )
      
}