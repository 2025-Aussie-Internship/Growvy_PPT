import { LanguageToggle } from './components/LanguageToggle'
import { PdfSlideshow } from './components/PdfSlideshow'
import { AppContainer } from './styles/layout'

function App() {
  return (
    <AppContainer>
      <LanguageToggle />
      <PdfSlideshow />
    </AppContainer>
  )
}

export default App
