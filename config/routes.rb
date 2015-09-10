Rails.application.routes.draw do
	get 'about' => "pages#about"
  root :to => 'posts#index'

  get   '/posts'            => 'posts#index', :as => :posts
  post  '/posts'            => 'posts#create'
  get   '/posts/new'        => 'posts#new', :as => :new_post
  get   '/posts/:id/edit'   => 'posts#edit', :as => :edit_post
  patch '/posts/:id'        => 'posts#update'
  put   '/posts/:id'        => 'posts#update'
  delete '/posts/:id'       => 'posts#destroy'
  get   'posts/:title_slug' => 'posts#show', :as => :post
  
  resources :users 
  get "signup"              => "users#new"
  get "login"               => "sessions#login"
  post "login-attempt"      => "sessions#login_attempt"
  get "logout"              => "sessions#logout"

  get 'admin'               => 'admin#posts'
end
