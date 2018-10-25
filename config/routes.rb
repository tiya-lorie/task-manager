Rails.application.routes.draw do
  default_url_options host: 'localhost'

  namespace :api do
    namespace :v1 do
      resource :users, only: %i[create update]

      namespace :users do
        resource :sessions, only: %i[create destroy]
        resources :projects, except: %i[new edit] do
          scope module: :projects do
            resources :tasks, except: %i[new edit], shallow: true
          end 
        end
      end
    end
  end

  get '/:url', controller: 'app', action: :index, constraints: { url: /.*/ }
  mount ActionCable.server => '/cable'
end