class Api::V1::ColaboradorsController < ApplicationController
  before_action :set_colaborador, only: %i[show update destroy]

  def index
    @colaboradors = Colaborador.all.order(created_at: :desc)
    render json: @colaboradors
  end

  def create
    @colaborador = Colaborador.new(colaborador_params)

    if @colaborador.save
      render json: @colaborador, status: :created
    else
      render json: @colaborador.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @colaborador
  end

  def update
    if @colaborador.update(colaborador_params)
      render json: @colaborador, status: :ok
    else
      render json: @colaborador.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @colaborador.destroy
    render json: { message: 'Colaborador apagado.' }, status: :ok
  end

  private

  def colaborador_params
    params.permit(:nome, :cargo, :foto_perfil, :data_contratacao)
  end

  def set_colaborador
    @colaborador = Colaborador.find(params[:id])
  end
end
