export interface FeriasFormData {
  id: number | undefined
  data_inicio: string
  data_fim: string
  periodo: number | undefined
  colaborador_id: number | undefined
  created_at: string | undefined
  updated_at: string | undefined
}

export interface Colaborador {
  id: number
  nome: string
  cargo: string
  data_contratacao: string
  em_ferias: boolean
  saldo_ferias: number
  vencimento_iminente: boolean
  created_at: string
  updated_at: string
}
