class PokemonsController < ApplicationController

  def index
  end

  def show
    @pokemons = HTTParty.get('http://www.pokeapi.co/api/v1/pokemon/' + params[:id])
    render json: @pokemons
  end

  def new
    # need?
  end

  def create
    @pokemon = Pokemon.create(pokemon_params)
    render json: @pokemon
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def fetch
    @pokemons = HTTParty.get('http://www.pokeapi.co/api/v1/' + params[:type] + '/' + params[:id])
    @image_link = ActionController::Base.helpers.image_path("pokemon-main-sprites/yellow/#{params[:id]}.png")
    render json: [@pokemons,@image_link]
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:name, :api_ref, :hp, :speed, :trainer_id, :battle_img)
  end
end
