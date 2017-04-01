Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'

  namespace :admin do
    root 'pages#home'
    resources :timeline_cards
  end
end
