import styled from 'styled-components'

export const Viewer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

export const DocumentFrame = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 48px);
  display: flex;
  align-items: center;
  justify-content: center;

  .react-pdf__Document {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const PageStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SlideLayer = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.45s ease;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

  .react-pdf__Page {
    display: flex;
    justify-content: center;
  }

  .react-pdf__Page__canvas {
    max-width: 100%;
    max-height: calc(100vh - 48px);
    width: auto !important;
    height: auto !important;
    border-radius: 4px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
  }
`

export const PreloadSlot = styled.div`
  position: absolute;
  left: -10000px;
  top: 0;
  visibility: hidden;
  pointer-events: none;
`

export const StatusBar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
`

export const LoadingMessage = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
`
