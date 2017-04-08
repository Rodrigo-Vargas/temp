Rails.application.routes.draw do
  scope '(:locale)', locale: /en/ do
    root 'pages#home'
    get '/resume',            to: 'pages#resume'  
  end

  scope '/pt/' do
    root 'pages#inicial'
    get '/curriculo',         to: 'pages#curriculo'
  end

  namespace :admin do
    root 'pages#home'
    resources :timeline_cards
    resources :top_navigation_items
    devise_for :users
  end
end
