class PlaylistsController < ApplicationController
  respond_to :json

  def index
    playlists = Playlist.ordered.limit(25)
    if user_signed_in?
      render :json => { :playlists => playlists, :signed_in => true }
    else
      render :json => { :playlists => playlists }
    end
  end
  
  def show
    playlist = Playlist.find(params[:id])
    tracks = playlist.tracks 
    render :json => { :tracks => tracks}
  end

  def create
    extract_params
    Playlist.create_if_no_recent @subreddit, @tracks
    playlists = Playlist.where(:subreddit => @subreddit).ordered
    render :json =>{ :playlists => playlists, :tracks => playlists.first.tracks }
  end

  private

  def extract_params
    @subreddit = params[:data][:subreddit]
    @tracks = params[:data][:tracks].values
  end

end
