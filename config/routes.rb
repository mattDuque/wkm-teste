Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :colaboradors, only: [:index, :create, :show, :destroy]
      resources :colaboradors do
        resources :ferias_colaborador, only: [:index, :create]
      end
      resources :ferias_colaborador, only: [:show, :update, :destroy]
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end