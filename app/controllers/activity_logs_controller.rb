class ActivityLogsController < ApplicationController
	include ActivityLogsHelper
	before_action :get_hash_objects

	def dashboard
    end
end