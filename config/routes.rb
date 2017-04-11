Rails.application.routes.draw do
  resources :plans
  devise_for :user, :controllers=>{:registrations=>'registrations'}
  #root 'application#hello'
  root 'plans#index'
end
