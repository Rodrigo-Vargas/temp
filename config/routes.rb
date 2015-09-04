Rails.application.routes.draw do
	get 'about' => "pages#about"
  get 'post' => "pages#post"
  root :to => "pages#home"
end
