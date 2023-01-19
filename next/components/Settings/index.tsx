import React from 'react'
import { ColorAsset } from '../../constants/settings.types'
import useSettingsStore from '../../zustand/settingsStore'
import styles from './Settings.module.scss'

const Settings = () => {
    const elRefs = React.useRef<[] | any>([])

    const settings = [{ name: 'Page Scroll', id: 'scroll_mode', options: ['Scroll', 'Chapters'] }, { name: 'Color Mode', id: 'color_mode', options: ['Day', 'Sepia_Contrast'] }]

    const color_mode = useSettingsStore((state) => (state.color_mode));

    return (<div className={styles[color_mode]}>
        <ul>
            {settings.map((e, i) => {
                return (
                    <fieldset key={i}>
                        <label className={styles.description}>{e.name}</label>
                        <div className={styles.select} >
                            <select
                                key={i}
                                onChange={(value) => {
                                    useSettingsStore.setState({ [e.id]: value.currentTarget.value.toLowerCase() })
                                }}
                                onMouseLeave={() => elRefs.current[i].style.transform = 'rotate(0deg)'}
                                onMouseDown={() => elRefs.current[i].style.transform = 'rotate(180deg)'}
                                onMouseUp={() => elRefs.current[i].style.transform = 'rotate(0deg)'}
                            >
                                {e.options.map((text, i) => (<option key={i}>{text}</option>))}

                            </select>
                            <svg ref={el => elRefs.current[i] = el} style={{ position: 'absolute', right: '10px' }} xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0V0z' fill='none' /><path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' /></svg>
                        </div>
                    </fieldset>
                )
            })}
            {/*} <label className={styles.description}>Color Mode</label>
                <select ref={el=>arrowToggle.current = el} onMouseDown={()=>{arrowToggle.current.style.backgroundImage = arrowUp
                 console.log(arrowToggle.current)}} onMouseUp={()=>arrowToggle.current.style.backgroundImage = arrowDown} className={styles.select} >
                    <option>Day</option>
                    <option>Sepia Contrast</option>
                </select> 
                </fieldset>*/}
        </ul>
    </div>)
}

export default Settings