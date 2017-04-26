Rails.application.routes.draw do
  resources :plans do
	post "remove", to: 'plans#remove'
	post "add", to: 'plans#add'
	
	get "remove", to: 'plans#remove'
	get "add", to: 'plans#add'
  end
  
  devise_for :user, :controllers=>{:registrations=>'registrations'}
  #root 'application#hello'
  root 'plans#index'
end
