export const Reader = () => {
  return(<> asd</>)
}


/*
import React from "react"
import useSettingsStore from "../../../zustand/settingsStore"
import Settings from "../Settings"
import styles from './Reader.module.scss'
import spinnerStyles from './spinner.module.scss'
import shallow from 'zustand/shallow'


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





//chapterHref: {chapterHref:string} | null = null
const Reader = ({book}:any) => {  
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

/*

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

*/

