import * as yup from "yup"

export const feriasSchema = yup.object().shape({
  id: yup.number(),
  data_inicio: yup
    .date()
    .typeError("O campo Data Início é obrigatório.")
    .required("O campo Data Início é obrigatório."),
  data_fim: yup
    .date()
    .typeError("O campo Data Fim é obrigatório.")
    .required("O campo Data Fim é obrigatório."),
  colaborador_id: yup.number(),
  periodo: yup.number().min(5, "Deve ser maior que 5").required(),
  created_at: yup.string(),
  updated_at: yup.string(),
})
