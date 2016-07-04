Rails.application.routes.draw do
  devise_for :users, :controllers => { :sessions => "sessions" }, :skip => [:registrations, :passwords, :confirmations]

  root to: "shorturls#index"

  resources :shorturls, only: [:index]
  resource :api_key, only: [:show]

  namespace :api, defaults: { format: 'json' }  do
    resources :shorturls, only: [:index, :create] do
      collection do
        get :get_new
      end
    end
    resource :api_key, only: [:show, :update]
  end
end
