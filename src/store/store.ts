import ls from '@/lib/ls'
import { create } from 'zustand'

type Store = {
  token: string
  setToken: (token: string) => void
}

const useStore = create<Store>((set) => ({
  token: ls.get('token') || '',
  setToken: (token) => {
    ls.set('token', token)
    set({ token })
  },
}))


export default useStore