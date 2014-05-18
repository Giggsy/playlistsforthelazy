class FavoritesController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def index
    favorite_tracks = current_user.tracks
    render :json => { :favorite_tracks => favorite_tracks }
  end

  def update
    track = Track.find_or_create_by_id(params[:id])
    current_user.toggle_favorite track
    render :json => { :favorite_tracks => current_user.tracks }
  end  
end