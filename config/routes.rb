Rails.application.routes.draw do
  namespace :admin do
    root 'pages#home'
    get '/timeline_cards/get_from_disk', to: 'timeline_cards#get_from_disk'
    resources :timeline_cards
    resources :top_navigation_items, path: 'menu'

    devise_for :users
  end

  scope '(:locale)', locale: /en/ do
    root 'pages#home'
    get '/resume',            to: 'pages#resume'  
  end

  scope '(:locale)', locale: '/pt/' do
    root 'pages#inicial'
    get '/curriculo',         to: 'pages#curriculo'
    get '/blog/:slug',        to: 'blog#show'
  end
end
