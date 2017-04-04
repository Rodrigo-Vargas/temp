Rails.application.routes.draw do
  root 'pages#home'

  get '/resume',              to: 'pages#resume'
  get '/curriculo',           to: 'pages#curriculo'

  namespace :admin do
    root 'pages#home'
    resources :timeline_cards
    devise_for :users
  end
end
