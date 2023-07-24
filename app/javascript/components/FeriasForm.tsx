import React, { useState, useEffect } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { FormControl, TextField } from "@mui/material"
import { DateField } from "@mui/x-date-pickers/DateField"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { feriasSchema } from "../schemas"
import dayjs, { Dayjs } from "dayjs"
import { StyledButton } from "../styles"

const FeriasForm = ({ onSubmit, onCancel, colaborador }) => {
  const [dataInicioSelecionada, setDataInicioSelecionada] = useState<Dayjs | null>(null)
  const [dataFimSelecionada, setDataFimSelecionada] = useState<Dayjs | null>(null)
  const [periodoValido, setPeriodoValido] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(feriasSchema),
    mode: "onChange",
  })
  useEffect(() => {
    validarPeriodo()
  }, [dataInicioSelecionada, dataFimSelecionada])

  function diffEmDias(dataInicio?: Dayjs | null, dataFim?: Dayjs | null): number {
    const dataInicioObj = dataInicio ? new Date(dataInicio.toString()) : new Date()
    const dataFimObj = dataFim ? new Date(dataFim.toString()) : new Date()

    const diffEmMilissegundos = Math.abs(dataFimObj.getTime() - dataInicioObj.getTime())
    const diffEmDias = diffEmMilissegundos / (1000 * 60 * 60 * 24)

    if (Math.floor(diffEmDias) > 30 || isNaN(Math.floor(diffEmDias))) return 0
    else return Math.floor(diffEmDias)
  }

  function validarPeriodo() {
    const saldo = colaborador.saldo_ferias
    let periodo = diffEmDias(dataInicioSelecionada, dataFimSelecionada)
    if (periodo > 0) {
      if (periodo <= saldo) setPeriodoValido(true)
      else setPeriodoValido(false)
    } else setPeriodoValido(false)
  }

  const handleFormSubmit = (data: any) => {
    onSubmit(data)
    reset()
  }

  return (
    <>
      <p style={{ marginBottom: "16px" }}>Registro de novo periodo de férias</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormControl style={{ width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              {...register("data_inicio")}
              style={{ marginTop: "16px" }}
              name="data_inicio"
              id="data_inicio"
              size="medium"
              label="Data Início"
              variant="outlined"
              color={errors.data_inicio?.message ? "error" : "primary"}
              helperText={errors.data_inicio?.message!.toString()}
              onChange={(date: any) => {
                setDataInicioSelecionada(date)
                validarPeriodo()
              }}
              minDate={dayjs().add(1, "day")}
            />
            <DateField
              {...register("data_fim")}
              style={{ marginTop: "16px" }}
              name="data_fim"
              id="data_fim"
              size="medium"
              label="Data Fim"
              variant="outlined"
              color={errors.data_inicio?.message ? "error" : "primary"}
              helperText={errors.data_fim?.message!.toString()}
              onChange={(date: any) => {
                setDataFimSelecionada(date)
                validarPeriodo()
              }}
              minDate={dataInicioSelecionada ? dataInicioSelecionada.add(5, "day") : dayjs()}
            />
          </LocalizationProvider>
          <TextField
            {...register("periodo")}
            style={{ marginTop: "16px" }}
            id="periodo"
            name="periodo"
            label="Período"
            variant="outlined"
            onChange={() => validarPeriodo()}
            value={diffEmDias(dataInicioSelecionada, dataFimSelecionada)}
            InputProps={{
              readOnly: true,
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <StyledButton onClick={onCancel} color="primary">
              Cancelar
            </StyledButton>{" "}
            <StyledButton
              id="enviar"
              type="submit"
              color="inherit"
              disabled={!periodoValido && true}
              style={{ marginLeft: "8px" }}
            >
              Confirmar
            </StyledButton>
          </div>
        </FormControl>
      </form>
    </>
  )
}

export default FeriasForm
