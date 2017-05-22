Rails.application.routes.draw do
  namespace :admin do
    root 'pages#home'
    get '/github',                        to: 'pages#github'
    devise_for :users
  end

  namespace :members do
    root                                      'pages#home'
    get '/snippets/:name',                to: 'pages#snippet_detail'
    get '/:page_name',                    to: 'pages#route'

    get '/:collection/:page_name',        to: 'pages#route'
  end  

  get '/',                                to: redirect('/en')

  get '/:locale',                         to: 'pages#route'

  get '/:locale/:page_name',              to: 'pages#route'

  get '/:locale/:collection/:page_name',  to: 'pages#route'
end
