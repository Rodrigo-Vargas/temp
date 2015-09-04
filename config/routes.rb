Rails.application.routes.draw do
	get 'about' => "pages#about"
  root :to => "posts#index"
  resources :posts
end
