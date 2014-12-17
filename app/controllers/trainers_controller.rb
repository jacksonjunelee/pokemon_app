class TrainersController < ApplicationController
  # ActiveRecord::Base.include_root_in_json = true

  def index
  end

  def show
    @trainer = Trainer.find(params[:id])
    @trainer_pokemons = Pokemon.where(trainer_id: params[:id]).limit(6)
    respond_to do |format|
      format.html { render :show }
      format.json { render json: [@trainer, @trainer_pokemons]}
    end
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
