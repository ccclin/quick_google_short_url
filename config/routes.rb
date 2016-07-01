Rails.application.routes.draw do
  root to: "shorturls#index"
  resources :shorturls, only: [:index]

  namespace :api, defaults: { format: 'json' }  do
    # get 'shorturls' => 'shorturls#index'
    resources :shorturls, only: [:index, :create]
  end
end
