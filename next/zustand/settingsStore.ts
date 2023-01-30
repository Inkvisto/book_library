import create from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

interface SettingsState {
  open:boolean,
  toggleOpen: () => void,
  scroll_mode:string,
  color_mode:string
  }
  const useSettingsStore = create<SettingsState>()(devtools((set) => ({
    open:false,
    toggleOpen: () => set((state) => ({ open: !state.open})),
    scroll_mode:'chapters',
    color_mode:'day'
  }),{
    name:'settings-storage'
  }))

  export default useSettingsStore
