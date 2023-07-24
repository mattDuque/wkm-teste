class Colaborador < ApplicationRecord
  has_many :ferias_colaboradors, dependent: :destroy

  validates :nome, presence: true
  validates :cargo, presence: true
  validates :data_contratacao, presence: true
  validates :saldo_ferias, numericality: { greater_than_or_equal_to: 0 }  

  before_save :calcular_vencimento_iminente
  before_save :ajustar_saldo_ferias

  def calcular_vencimento_iminente
    self.vencimento_iminente = (data_contratacao + 24.months - Time.now) < 3.months
  end

  def ajustar_saldo_ferias
    meses_contratacao = ((Time.now - data_contratacao) / 1.month).floor

    # Ajustar o saldo de férias com base no aniversário da data de contratação
    if meses_contratacao >= 12
      meses_aniversario = (data_contratacao.day <= Time.now.day) ? 12 : 11
      saldo_ferias_inicial = 30

      # Calcular o total de dias de férias utilizados pelo colaborador
      total_dias_ferias_utilizados = 0
      ferias_colaboradors.each do |ferias|
        total_dias_ferias_utilizados += (ferias.data_fim - ferias.data_inicio).to_i / 3600 / 24
      end

      # Ajustar o saldo_ferias subtraindo os dias de férias utilizados
      self.saldo_ferias = [saldo_ferias_inicial - total_dias_ferias_utilizados, 0].max
    end
  end

  def update_em_ferias_if_in_range
    latest_ferias_colaborador = ferias_colaboradors.last

    if latest_ferias_colaborador.present? &&
       latest_ferias_colaborador.data_inicio <= Date.current &&
       latest_ferias_colaborador.data_fim >= Date.current
      update(em_ferias: true)
    else
      update(em_ferias: false)
    end
  end

end