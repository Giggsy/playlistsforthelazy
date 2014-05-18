class TracksController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def get_favorites
    favorite_tracks = current_user.tracks
    render :json => { :favorite_tracks => favorite_tracks }
  end
  def add_to_favorites
    binding.pry
  end  
end