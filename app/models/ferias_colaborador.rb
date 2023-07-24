class FeriasColaborador < ApplicationRecord
  validates :data_inicio, presence: true
  validates :data_fim, presence: true
  validates :periodo, presence: true
  belongs_to :colaborador

  validate :data_nao_sobreposta
  validate :periodos_minimos

  before_save :ajustar_saldo_ferias_colaborador

  private

  def data_nao_sobreposta
    return unless colaborador_id && data_inicio && data_fim

    if FeriasColaborador.exists?([
      'colaborador_id = ? AND ((data_inicio <= ? AND data_fim >= ?) OR (data_inicio >= ? AND data_fim <= ?))',
      colaborador_id, data_fim, data_inicio, data_inicio, data_fim
    ])
      errors.add(:base, 'As datas de férias se sobrepõem a um período já existente.')
    end
  end

  def periodos_minimos
    return unless data_inicio && data_fim

    dias_minimos = [14, 5]
    intervalo_dias = (data_fim - data_inicio).to_i + 1

    if intervalo_dias < dias_minimos.sum
      errors.add(:base, 'Período de férias inválido. O primeiro período deve ser de no mínimo 14 dias, e os demais devem ser de no mínimo 5 dias cada.')
    end

    if dias_minimos[0] > 0 && intervalo_dias < dias_minimos[0]
      errors.add(:base, 'O primeiro período de férias deve ser de no mínimo 14 dias.')
    end

    if dias_minimos[1] > 0 && intervalo_dias < dias_minimos.sum
      errors.add(:base, 'Os demais períodos de férias devem ser de no mínimo 5 dias cada.')
    end
  end

  def ajustar_saldo_ferias_colaborador
    # Find the associated Colaborador and update the saldo_ferias
    colaborador = self.colaborador
    colaborador.ajustar_saldo_ferias
    colaborador.save
  end
end
