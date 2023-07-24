import React from "react"
import Routes from "../routes"
import { GlobalStyle, Header, Main } from "../styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { ptBR as dataGridptBR } from "@mui/x-data-grid"
import { ptBR as coreptBR } from "@mui/material/locale"
import { ptBR } from "@mui/x-date-pickers/locales"

const theme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: { main: "#f7ea9f" },
    },
  },
  ptBR,
  dataGridptBR,
  coreptBR
)

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header>
        <img src="./brand.png" alt="" style={{ height: "70px" }} />
      </Header>
      <Main>{Routes}</Main>
    </ThemeProvider>
  )
}
