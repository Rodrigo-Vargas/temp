Rails.application.routes.draw do
  get '/',                                to: redirect('/en')

  get '/:locale',                         to: 'pages#route'

  get '/:locale/:page_name',              to: 'pages#route'

  get '/:locale/:collection/:page_name',  to: 'pages#route'
end
