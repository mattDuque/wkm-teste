import React, { useState, useEffect } from "react"
import Tabela from "./TabelaColaboradores"
import { Link, useNavigate } from "react-router-dom"
import { StyledCard } from "../styles"

export default function Home() {
  const navigate = useNavigate()
  const [colaboradores, setColaboradores] = useState(null)

  useEffect(() => {
    const url = "/api/v1/colaboradors"
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(res => {
        setColaboradores(res)
      })
      .catch(() => navigate("/"))
  }, [])

  if (!colaboradores) {
    return <div>Carregando...</div>
  }

  return (
    <StyledCard>
      <Tabela colaboradores={colaboradores} />
    </StyledCard>
  )
}
