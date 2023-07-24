import React, { useState } from "react"
import FeriasColaborador from "./FeriasColaborador"
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridAlignment,
} from "@mui/x-data-grid"
import { obterDataFormatada } from "../util"

const column = new Map([
  ["foto", { header: "Foto", flex: 0.5 }],
  ["nome", { header: "Nome", flex: 2 }],
  ["cargo", { header: "Cargo", flex: 0.5 }],
  ["data_contratacao", { header: "Data de Contratação", flex: 1 }],
  ["em_ferias", { header: "Em Férias", flex: 0.5 }],
  ["saldo_ferias", { header: "Saldo de Férias", flex: 1 }],
  ["vencimento_iminente", { header: "Vencimento Iminente", flex: 1 }],
])

export default function TabelaColaboradores(props: { colaboradores: any[] }) {
  const { colaboradores } = props
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [novasFerias, setNovasFerias] = useState<boolean>(false)
  const [selectedColaborador, setSelectedColaborador] = useState<any | null>(null)

  const handleRowClick = (params: GridRowParams<any>) => {
    setSelectedColaborador(params.row)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setNovasFerias(false)
  }

  const columns: GridColDef[] = [
    {
      field: "foto",
      headerName: column.get("foto")!.header,
      flex: column.get("foto")!.flex,
      headerAlign: "center",
      align: "center" as GridAlignment, // Set the correct type for "align"
      type: "string",
      sortable: false, // Set to false if you don't want to enable sorting for the "foto" column
      renderCell: (
        params: GridRenderCellParams // Adjust the type of the renderCell function
      ) => (
        <img
          src={params.row.foto + ".jpg"}
          alt=""
          style={{
            height: "55px",
            borderRadius: "999px",
            border: "1px solid #515151",
            margin: "4px 0",
          }}
        />
      ),
    },
    ...Object.keys(colaboradores[0])
      .filter(
        value =>
          value !== "id" && value !== "created_at" && value !== "updated_at" && value !== "foto"
      )
      .map(header => {
        return {
          field: header,
          headerName: column.get(header)!.header,
          flex: column.get(header)!.flex,
          headerAlign: "center" as GridAlignment,
          align: "center" as GridAlignment,
          type: "string",
          sortable: header === "avatar_url" ? false : true,
          renderCell: (params: GridRenderCellParams<any, any>) => {
            if (header === "data_contratacao")
              return obterDataFormatada(params.row.data_contratacao)
            if (header === "em_ferias") return <div>{params.row.em_ferias ? "Sim" : "Não"}</div>
            if (header === "vencimento_iminente")
              return <div>{params.row.vencimento_iminente ? "Sim" : "Não"}</div>
            return <div>{params.value}</div>
          },
        }
      }),
  ]
  return (
    <>
      <DataGrid
        rows={colaboradores}
        columns={columns}
        isRowSelectable={() => false}
        onRowClick={handleRowClick}
        getRowClassName={params => {
          return params.indexRelativeToCurrentPage % 2 === 0 ? "even pointer" : "odd pointer"
        }}
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          ".even": {
            background: "#3b3b3b",
          },
          ".pointer": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-renderingZone": {
            maxHeight: "none !important",
          },
          "& .MuiDataGrid-cell": {
            lineHeight: "unset !important",
            maxHeight: "none !important",
            whiteSpace: "normal",
          },
          "& .MuiDataGrid-row": {
            maxHeight: "none !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "3px solid #d9c35f",
            zIndex: 10,
          },
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />

      <FeriasColaborador
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        colaborador={selectedColaborador}
      />
    </>
  )
}
