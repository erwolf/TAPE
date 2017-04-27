Rails.application.routes.draw do
  resources :plans do
	post "remove", to: 'plans#remove'
	post "add", to: 'plans#add'
	post "requirements", to: 'plans#requirements'
	
	post "add_year", to: 'plans#add_year'
	post "remove_year", to: 'plans#remove_year'
	
	#get "req", to: 'plans#requirements'
	
  end
  
  devise_for :user, :controllers=>{:registrations=>'registrations'}
  #root 'application#hello'
  root 'plans#index'
  #Hi Timothy
end
