class PlaylistsController < ApplicationController
  respond_to :json

  def index
    playlists = Playlist.ordered.limit(25)
    render :json => { :playlists => playlists }
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
    render :json =>{ :playlists => playlists }
  end

  private

  def extract_params
    @subreddit = params[:data][:subreddit]
    @tracks = params[:data][:tracks].values
  end

end
