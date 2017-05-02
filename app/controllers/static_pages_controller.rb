class StaticPagesController < ApplicationController
  def landing_page
  	#Counts
  	@babies        = Baby.count
  	@activities    = Activity.count
  	@activity_logs = ActivityLog.count
  	@assistants    = Assistant.count
  end
  def login
  end
end
