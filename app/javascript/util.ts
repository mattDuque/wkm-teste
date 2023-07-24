export const obterDataFormatada = (dataString: string) => {
  const dataFormatada = new Date(dataString)
  const dataFinal = [
    dataFormatada.getDate().toString().padStart(2, "0"),
    (dataFormatada.getMonth() + 1).toString().padStart(2, "0"),
    dataFormatada.getFullYear().toString().substring(2),
  ]

  return dataFinal.join("/")
}
