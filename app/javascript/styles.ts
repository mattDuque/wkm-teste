import styled, { createGlobalStyle } from "styled-components"
import { Card, Button, TextField } from "@mui/material"

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Poppins;
    src: url('./Poppins.ttf') format('truetype');
  }
  * {
  margin: 0;
  font-family: 
    'Poppins',
    'sans-serif';
  }
  body, html {
    background: #1b1e1f; 
  }
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 98vw;
  height: 85vh;
  position: relative;
  padding: 32px;
  font-size: 18px;
  background-color: #181a1b;
  box-shadow: 2px 7px 4px 2px rgba(18, 20, 21, 0.7) !important;
  border-radius: 0.75rem !important;
  margin: 0 auto;
  border: 1px solid #444444;
  padding: 0px;

  @media (max-height: 768px) {
    font-size: 14px;
  }
`
export const StyledButton = styled(Button)`
  height: 46px;
  font-size: 16px;
  color: white !important;
  text-transform: inherit !important;
  background: #d9c35f !important;
  background: ${props => props.disabled && "#5b686b"} !important;
  &:hover {
    background: #f7ea9f !important;
  }
`
export const Header = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 0 0 5vw;
  background-color: #202124;
  justify-content: space-between;
  position: absolute;
  z-index: 1000;
  left: 0;
  right: 0;
  margin-bottom: 10px;
  box-shadow: 2px 7px 4px 2px rgba(18, 20, 21, 0.7);
  img {
    vertical-align: middle;
  }
  img:nth-child(2) {
    display: none;
  }
  @media only screen and (min-width: 768px) {
    padding: 0 4vw 0 7vw;
    img:nth-child(2) {
      display: inline;
    }
  }
`
export const Main = styled.div`
  width: 100%;
  padding-top: 120px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-height: 768px) {
    padding-top: 65px;
  }
`
