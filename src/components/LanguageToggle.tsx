import { useLanguageStore } from '../store/languageStore'
import { ToggleButton } from '../styles/layout'

const LABELS = {
  ko: 'EN',
  en: 'KO',
} as const

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguageStore()

  return (
    <ToggleButton type="button" onClick={toggleLanguage} aria-label="언어 전환">
      {LABELS[language]}
    </ToggleButton>
  )
}
