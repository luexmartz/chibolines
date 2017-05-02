Rails.application.routes.draw do
  root  'static_pages#landing_page'

  match '/activities',    to: 'activities#dashboard',    via: 'get', :path => :actividades
  match '/babies',        to: 'babies#dashboard',        via: 'get', :path => :bebes
  match '/assistants',    to: 'assistants#dashboard',    via: 'get', :path => :asistentes
  match '/activity_logs', to: 'activity_logs#dashboard', via: 'get'
  match '/login',         to: 'static_pages#login',      via: 'get'

  # Api v1 definition
  namespace :api, defaults: { format: :json } do

      resources :activities, only: [:index, :create, :update, :destroy] do
        get :search, on: :collection
      end

      resources :assistants, only: [:index, :create, :update, :destroy] do
        get :search, on: :collection
      end

      resources :babies, only: [:index, :create, :update, :destroy] do
        get :search, on: :collection
      end

      resources :activity_logs, only: [:index, :create, :update, :destroy] do
        get  :search, on: :collection
      end

      get  'babies/:id/activity_logs'    => 'babies#activities'
  end

  match ':not_found', to: 'static_pages#404', :costrains => {:not_found => /.*/}, via: 'get'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
