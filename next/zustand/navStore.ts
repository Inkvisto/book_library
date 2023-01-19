import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface NavState {
  navigation: any,
  }

  const navStore = () =>({
    navigation: {}
  })


  const useNavStore = create<NavState>()(devtools(navStore))

  export default useNavStore
