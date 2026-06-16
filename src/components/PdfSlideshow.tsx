import { useCallback, useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useLanguageStore } from '../store/languageStore'
import {
  DocumentFrame,
  LoadingMessage,
  PageStack,
  PreloadSlot,
  SlideLayer,
  StatusBar,
  Viewer,
} from '../styles/pdfViewer'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const PDF_MAP = {
  ko: '/growvy_ppt_ko.pdf',
  en: '/growvy_ppt_en.pdf',
} as const

const PAGE_INTERVAL_MS = 5000

function getNextPage(current: number, total: number) {
  if (total === 0) return 1
  return current >= total ? 1 : current + 1
}

interface BufferedPagesProps {
  pageNumber: number
  pageWidth: number
  resetKey: string
}

function BufferedPages({ pageNumber, pageWidth, resetKey }: BufferedPagesProps) {
  const [activeSlot, setActiveSlot] = useState<'a' | 'b'>('a')
  const [slotA, setSlotA] = useState(pageNumber)
  const [slotB, setSlotB] = useState(pageNumber)
  const pendingRef = useRef<number | null>(null)

  useEffect(() => {
    setActiveSlot('a')
    setSlotA(pageNumber)
    setSlotB(pageNumber)
    pendingRef.current = null
  }, [resetKey])

  useEffect(() => {
    const visible = activeSlot === 'a' ? slotA : slotB
    if (pageNumber === visible) return

    pendingRef.current = pageNumber
    if (activeSlot === 'a') {
      setSlotB(pageNumber)
    } else {
      setSlotA(pageNumber)
    }
  }, [pageNumber, activeSlot, slotA, slotB])

  const onSlotRender = useCallback((slot: 'a' | 'b', renderedPage: number) => {
    if (pendingRef.current === null) return
    if (pendingRef.current !== renderedPage) return
    setActiveSlot(slot)
    pendingRef.current = null
  }, [])

  return (
    <PageStack>
      <SlideLayer $visible={activeSlot === 'a'}>
        <Page
          pageNumber={slotA}
          width={pageWidth}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          onRenderSuccess={() => onSlotRender('a', slotA)}
        />
      </SlideLayer>
      <SlideLayer $visible={activeSlot === 'b'}>
        <Page
          pageNumber={slotB}
          width={pageWidth}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          onRenderSuccess={() => onSlotRender('b', slotB)}
        />
      </SlideLayer>
    </PageStack>
  )
}

export function PdfSlideshow() {
  const language = useLanguageStore((state) => state.language)
  const currentPage = useLanguageStore((state) => state.currentPage)
  const pageCounts = useLanguageStore((state) => state.pageCounts)
  const setPageCount = useLanguageStore((state) => state.setPageCount)
  const advancePage = useLanguageStore((state) => state.advancePage)

  const [pageWidth, setPageWidth] = useState(() => window.innerWidth - 48)

  const activePageCount = pageCounts[language]
  const pdfUrl = PDF_MAP[language]
  const nextPage = getNextPage(currentPage, activePageCount)

  useEffect(() => {
    const onResize = () => setPageWidth(window.innerWidth - 48)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (activePageCount === 0) return
    const timer = window.setInterval(advancePage, PAGE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [activePageCount, advancePage])

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setPageCount(language, numPages)
    },
    [language, setPageCount],
  )

  return (
    <Viewer>
      <DocumentFrame>
        <Document
          key={pdfUrl}
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<LoadingMessage>PDF 불러오는 중...</LoadingMessage>}
          error={<LoadingMessage>PDF를 불러올 수 없습니다.</LoadingMessage>}
        >
          <BufferedPages
            key={pdfUrl}
            resetKey={pdfUrl}
            pageNumber={currentPage}
            pageWidth={pageWidth}
          />
          {activePageCount > 0 && (
            <PreloadSlot aria-hidden>
              <Page
                pageNumber={nextPage}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </PreloadSlot>
          )}
        </Document>
      </DocumentFrame>

      {activePageCount > 0 && (
        <StatusBar>
          {currentPage} / {activePageCount}
        </StatusBar>
      )}
    </Viewer>
  )
}
