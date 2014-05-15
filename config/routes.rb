Playlistsftl::Application.routes.draw do
  resources :playlists

  root to: "application#home"
  devise_for :users
end
