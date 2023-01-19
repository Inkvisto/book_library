import create from 'zustand'
import { devtools } from "zustand/middleware"

const userStore = () => ({
    username: ''
})

const useUserStore = create<{ username: string }>()(devtools(userStore))

export default useUserStore