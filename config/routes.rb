Rails.application.routes.draw do
  namespace :admin do
    root 'pages#home'
    get '/timeline_cards/get_from_disk', to: 'timeline_cards#get_from_disk'
    resources :timeline_cards
    resources :top_navigation_items, path: 'menu'

    devise_for :users
  end

  get '/' => redirect('/en')

  scope '/en' do
    root 'pages#home'
    get '/resume',            to: 'pages#resume'
    get '/:slug',             to: 'pages#show'
  end

  scope '/pt' do
    root 'pages#inicial'
    get '/curriculo',         to: 'pages#curriculo'
    get '/cursos',            to: 'courses#index'
    get '/cursos/(:slug)',    to: 'courses#show', as: 'en_course'
    get '/blog/:slug',        to: 'blog#show'
    get '/:slug',             to: 'pages#show'
  end
end
