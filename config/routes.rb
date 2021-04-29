Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  patch 'posts/:id', to: 'posts#checked'
end
