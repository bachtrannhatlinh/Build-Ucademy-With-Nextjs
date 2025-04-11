import { create } from 'zustand'

interface GlobalState {
  expandedPlayer: boolean
  setExpandedPlayer: (expanded: boolean) => void
}

const useGlobalStore = create<GlobalState>((set) => ({
  expandedPlayer: false,
  setExpandedPlayer: (expanded) => set({ expandedPlayer: expanded }),
}))

export default useGlobalStore