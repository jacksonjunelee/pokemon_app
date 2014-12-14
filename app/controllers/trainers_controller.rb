class TrainersController < ApplicationController

  def index
  end

  def show
    @trainer=Trainer.find(params[:id])
    render json: @trainer.to_json(include: :pokemons)
  end

  def new
    # need?
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def fetch
  end

  private

  def fetch_params
    params.require(:trainer).permit(  )
  end

end
