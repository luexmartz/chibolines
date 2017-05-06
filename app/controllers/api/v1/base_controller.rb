class Api::V1::BaseController < ActionController::Base

	protect_from_forgery with: :null_session
	
	rescue_from ActiveRecord::RecordNotFound, with: :not_found
	
	def not_found
	    render nothing: true, status: :internal_server_error
	end
end