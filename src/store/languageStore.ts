import { create } from 'zustand'

export type Language = 'ko' | 'en'

interface SlideshowState {
  language: Language
  currentPage: number
  pageCounts: Record<Language, number>
  toggleLanguage: () => void
  setPageCount: (lang: Language, count: number) => void
  advancePage: () => void
}

export const useLanguageStore = create<SlideshowState>((set) => ({
  language: 'ko',
  currentPage: 1,
  pageCounts: { ko: 0, en: 0 },

  toggleLanguage: () =>
    set((state) => {
      const nextLang: Language = state.language === 'ko' ? 'en' : 'ko'
      const maxPages = state.pageCounts[nextLang]

      return {
        language: nextLang,
        currentPage:
          maxPages > 0
            ? Math.min(state.currentPage, maxPages)
            : state.currentPage,
      }
    }),

  setPageCount: (lang, count) =>
    set((state) => ({
      pageCounts: { ...state.pageCounts, [lang]: count },
      currentPage:
        state.language === lang && count > 0
          ? Math.min(state.currentPage, count)
          : state.currentPage,
    })),

  advancePage: () =>
    set((state) => {
      const maxPages = state.pageCounts[state.language]
      if (maxPages === 0) return state

      return {
        currentPage:
          state.currentPage >= maxPages ? 1 : state.currentPage + 1,
      }
    }),
}))
