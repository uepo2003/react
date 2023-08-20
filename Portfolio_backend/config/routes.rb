Rails.application.routes.draw do
  post '/sign_up', to: 'application#sign_up'

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'logout', to: 'application#logout'
  resources :posts, only: [:create]
  resources :companies
  resources :earnings
end
