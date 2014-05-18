Playlistsftl::Application.routes.draw do
  root to: "application#home"
  devise_for :users

  put 'track/:id/add_to_favorites', :to => "tracks#add_to_favorites"
  put 'track/:id/add_to_favorites', :to => "tracks#remove_from_favorites"
  get 'favorites', :to => "tracks#get_favorites"
  resources :playlists
end
