class Api::V1::FeriasColaboradorController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :set_colaborador
  before_action :set_ferias_colaborador, only: [:show, :update, :destroy]

  def index
    @ferias_colaboradores = @colaborador.ferias_colaboradors
    render json: @ferias_colaboradores, status: :ok
  end

  def show
    render json: @ferias_colaborador, status: :ok
  end

  def create
    @ferias_colaborador = @colaborador.ferias_colaboradors.new(ferias_colaborador_params)

    if @ferias_colaborador.save
      @colaborador.update_em_ferias_if_in_range
      render json: @ferias_colaborador, status: :created
    else
      render json: @ferias_colaborador.errors, status: :unprocessable_entity
    end
  end

  def update
    if @ferias_colaborador.update(ferias_colaborador_params)
      render json: @ferias_colaborador, status: :ok
    else
      render json: @ferias_colaborador.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @ferias_colaborador.destroy
    head :no_content
  end

  private

  def set_colaborador
    @colaborador = Colaborador.find(params[:colaborador_id])
  end

  def set_ferias_colaborador
    @ferias_colaborador = @colaborador.ferias_colaboradors.find(params[:id])
  end

  def ferias_colaborador_params
    params.require(:ferias_colaborador).permit(:data_inicio, :data_fim, :periodo, :colaborador_id)
  end
end
