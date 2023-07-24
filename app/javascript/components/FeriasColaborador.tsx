import React, { useEffect, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Paper from "@mui/material/Paper"
import { StyledButton } from "../styles"
import { obterDataFormatada } from "../util"
import { FeriasFormData, Colaborador } from "../typings"
import FeriasForm from "./FeriasForm"

interface FeriasColaboradorProps {
  isOpen: boolean
  onClose: () => void
  colaborador: Colaborador
}

export default function FeriasColaborador({
  isOpen,
  onClose,
  colaborador,
}: FeriasColaboradorProps) {
  const [ferias, setFerias] = useState<any[]>([])
  const [novasFerias, setNovasFerias] = useState<boolean>(false)

  useEffect(() => {
    const url = `/api/v1/colaboradors/${colaborador?.id}/ferias_colaborador`
    if (colaborador) {
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error("Network response was not ok.")
        })
        .then(res => {
          setFerias(res)
        })
    }
  }, [colaborador])

  const handleFormSubmit = (data: FeriasFormData) => {
    const novoPeriodoFerias = {
      colaborador_id: colaborador.id,
      data_inicio: new Date(data.data_inicio).toISOString(),
      data_fim: new Date(data.data_fim).toISOString(),
      periodo: data.periodo,
    }
    console.log(JSON.stringify({ ferias_colaborador: novoPeriodoFerias }))

    const url = `/api/v1/colaboradors/${colaborador.id}/ferias_colaborador `
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoPeriodoFerias),
    }

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar o período de férias.")
        }
        return response.json()
      })
      .then(data => {
        console.log("Período de férias cadastrado com sucesso:", data)
      })
      .catch(error => {
        console.error("Erro na requisição:", error)
      })
    setNovasFerias(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {novasFerias ? (
        <>
          <DialogContent>
            <FeriasForm
              onSubmit={handleFormSubmit}
              onCancel={() => setNovasFerias(false)}
              colaborador={colaborador}
            />
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>Detalhes do Colaborador</DialogTitle>
          <DialogContent style={{ paddingBottom: "0" }}>
            <div>
              <p style={{ marginBottom: "4px" }}>Nome: {colaborador?.nome}</p>
              <p style={{ marginBottom: "4px" }}>Cargo: {colaborador?.cargo}</p>
            </div>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Data de Início</TableCell>
                    <TableCell>Data de Fim</TableCell>
                    <TableCell>Período</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ferias.map(feria => (
                    <TableRow key={feria.id}>
                      <TableCell>{obterDataFormatada(feria.data_inicio)}</TableCell>
                      <TableCell>{obterDataFormatada(feria.data_fim)}</TableCell>
                      <TableCell>{feria.periodo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <div style={{ paddingRight: "16px" }}>
            <DialogActions>
              <StyledButton onClick={onClose} color="primary">
                Fechar
              </StyledButton>{" "}
              <StyledButton
                onClick={() => setNovasFerias(true)}
                color="primary"
                disabled={colaborador?.saldo_ferias > 0 ? false : true}
              >
                Novas Férias
              </StyledButton>
            </DialogActions>
          </div>
        </>
      )}
    </Dialog>
  )
}
