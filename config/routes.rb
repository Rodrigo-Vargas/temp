Rails.application.routes.draw do
	get 'about' => "pages#about"
  root :to => 'posts#index'

  get    '/posts'             => 'posts#index', :as => :posts
  post   '/posts'             => 'posts#create'
  get    '/posts/new'         => 'posts#new', :as => :new_post
  get    '/posts/:id/edit'    => 'posts#edit', :as => :edit_post
  patch  '/posts/:id'         => 'posts#update'
  delete '/posts/:id'         => 'posts#destroy'
  get    '/posts/:title_slug' => 'posts#show', :as => :post

  get    'series'             => 'series#index', :as => :series_index
  post   'series'             => 'series#create'
  get    'series/new'         => 'series#new', :as => :new_series
  get    'series/:id/edit'    => 'series#edit', :as => :edit_series
  patch  'series.:id'         => 'series#update'
  delete 'series/:id'         => 'series#destroy'
  get    'series/:title_slug' => 'series#show', :as => :series_show
  
  get    '/categories'             => 'categories#index', :as => :categories
  post   '/categories'             => 'categories#create'
  get    '/categories/new'         => 'categories#new', :as => :new_category
  get    '/categories/:id/edit'    => 'categories#edit', :as => :edit_category
  patch  '/categories/:id'         => 'categories#update'
  delete '/categories/:id'         => 'categories#destroy'
  get    '/categories/:title_slug' => 'categories#show', :as => :category

  resources :users 
  get    'signup'             => "users#new"
  get    'login'              => "sessions#login"
  post   'login-attempt'      => "sessions#login_attempt"
  get    'logout'             => "sessions#logout"

  get    'admin'              => 'admin#posts', as: :admin_posts 
  get    'admin/users'        => 'admin#users', as: :admin_users
  get    'admin/images'       => 'admin#images', as: :admin_images
  get    'admin/series'       => 'admin#series', as: :admin_series
  get    'admin/categories'   => 'admin#categories', as: :admin_categories
  get    'admin/projects'     => 'admin#projects', as: :admin_projects

  get    '/images/new'        => 'images#new', as: :new_image
  get    '/images'            => 'images#index'
  post   '/images'            => 'images#create'
  delete '/images/:id'        => 'images#destroy'
  get    '/images/:id'        => 'images#show', as: :image

  resources :projects, :except => :show
  get    'projects/:title_slug' => 'projects#show', as: :project_show
end
