def gerar_nome_aleatorio
  nomes = ["João", "Maria", "Pedro", "Ana", "Lucas"]
  sobrenomes = ["Silva", "Santos", "Lima", "Oliveira", "Pereira"]
  
  nome_aleatorio = "#{nomes.sample} #{sobrenomes.sample}"
  return nome_aleatorio
end

def fotos_aleatorias = [
  'https://imgur.com/2PZiUmk', 
  'https://imgur.com/5IAkWx1',
  'https://imgur.com/W5EKg9G',
  'https://imgur.com/cYel5jp',
  'https://imgur.com/mKMqzIk',
  'https://imgur.com/Gm4phvp',
  'https://imgur.com/TTr3KmZ',
  'https://imgur.com/G5ZSSYM',
  'https://imgur.com/cUlqL54',
  'https://imgur.com/NTd1EuR',
  'https://imgur.com/YWKxF69',
  'https://imgur.com/cohdwWt',
  'https://imgur.com/n19ujOB',
  'https://imgur.com/cWyGVIX',
  'https://imgur.com/s3FwRr9',
  'https://imgur.com/HhlWir3',
  'https://imgur.com/LtoxW3U',
  'https://imgur.com/co9PcQc'
]

def cargos_colaboradores = ['Gerente', 'Desenvolvedor', 'Designer', 'Contador', 'Vendedor']

# Método auxiliar para criar Colaborador com FeriasColaborador
def criar_colaborador(nome = nil, cargo = nil, data_contratacao_range = [1, 720], em_ferias)
  data_contratacao = Time.now - rand(data_contratacao_range[0]..data_contratacao_range[1]).days 
  nome ||= gerar_nome_aleatorio 
  cargo ||= cargos_colaboradores.sample 

  colaborador = Colaborador.create!(
    foto: fotos_aleatorias.sample,
    nome: nome,
    cargo: cargos_colaboradores.sample,
    data_contratacao: data_contratacao,
    em_ferias: em_ferias,
    vencimento_iminente: nil 
  )

  colaborador.calcular_vencimento_iminente 
  colaborador.save 

  if em_ferias
    data_inicio = Time.now - rand(30..90).days 
    data_fim = data_inicio + rand(14..30).days 
    periodo = (data_fim - data_inicio).to_i / 3600 / 24

    colaborador.ferias_colaboradors.create!(
      data_inicio: data_inicio,
      data_fim: data_fim,
      periodo: periodo
    )

  ultimo_periodo_ferias = colaborador.ferias_colaboradors.last
  if ultimo_periodo_ferias
    saldo_ferias_utilizado = (ultimo_periodo_ferias.data_fim - ultimo_periodo_ferias.data_inicio).to_i / 3600 / 24
    novo_saldo = [colaborador.saldo_ferias - saldo_ferias_utilizado, 0].max
    colaborador.saldo_ferias = [colaborador.saldo_ferias - saldo_ferias_utilizado, 0].max
    colaborador.save 
  end

  end

  colaborador
end

# Limpar dados existentes (opcional, dependendo das suas necessidades)
FeriasColaborador.delete_all
Colaborador.delete_all


# Criar Colaboradores que não estão em férias e ainda não podem tirar férias
rand(2..8).times do
  criar_colaborador(nil, nil, [1,364], false)
end

# Criar Colaboradores que tem saldo de ferias, mas não estão em férias
rand(2..8).times do
  criar_colaborador(nil, nil, [365,720], false)
end

# Criar Colaboradores que tem saldo de ferias e estão de ferias
rand(2..8).times do
  criar_colaborador(nil, nil, [365,720], true)
end
