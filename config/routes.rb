Playlistsftl::Application.routes.draw do
  root to: "application#home"
  devise_for :users
  resources :favorites
  resources :playlists
end
