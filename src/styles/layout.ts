import styled from 'styled-components'

export const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const ToggleButton = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  padding: 12px 22px;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.96);
  color: #111;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;

  &:hover {
    background: #fff;
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.45);
  }

  &:active {
    transform: scale(0.96);
  }
`
