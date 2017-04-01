Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'

  get '/resume',              to: 'pages#resume'
  get '/curriculo',           to: 'pages#curriculo'

  namespace :admin do
    root 'pages#home'
    resources :timeline_cards
  end
end
