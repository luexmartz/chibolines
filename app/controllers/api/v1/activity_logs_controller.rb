class Api::V1::ActivityLogsController < Api::V1::BaseController
	
    include ActivityLogsHelper

    before_action :set_activity_log, only: [:update, :destroy]
	before_action :get_hash_objects, only: [:index, :search, :create, :update]

	def index
	  	begin
	      activity_logs = ActivityLog.select(:id, :baby_id, :assistant_id, :activity_id, :start_time, :stop_time, :duration).recent
	
	      activity_logs_hash = activity_logs_make_hash(activity_logs)

		  render json: activity_logs_hash.to_json, status: :ok
		rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
    end

    def search 
    	begin
	      activity_logs = ActivityLog.by_column_filter(params[:activity_log][:baby_id], params[:activity_log][:assistant_id]).recent
		  
		  status = params[:activity_log][:status]

		  activity_logs = activity_logs.by_status(status) if status != "all"

		  activity_logs_hash = activity_logs_make_hash(activity_logs)

		  render json: activity_logs_hash.to_json, status: :ok
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def create
		begin
		  if validate_datetime(params[:activity_log][:start_time])
			  activity_log = ActivityLog.new(activity_log_params)

			  if activity_log.save
			  	activity_logs = ActivityLog.where(id: activity_log.id)
			    activity_logs_hash = activity_logs_make_hash(activity_logs)

			    render json: activity_logs_hash[0].to_json, status: :created
			  else
		   		render json: activity_log.errors, status: :bad_request
			  end
		  else
		  	render nothing: true, status: :bad_request
		  end
		rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def update
		begin
		  #Add current Time to stop_time
		  stop_time = Time.now

		  if stop_time > @activity_log.start_time

			  #Get Time of duration in minutes
			  minutes = ((stop_time - @activity_log.start_time)/60).round(1)
			  @activity_log.duration = minutes
			  @activity_log.stop_time = stop_time

		      if @activity_log.update(activity_log_params)
		        activity_logs = ActivityLog.where(id: @activity_log.id)
			    activity_logs_hash = activity_logs_make_hash(activity_logs)

			    render json: activity_logs_hash[0].to_json, status: :ok
		      else
		   		render json: @activity_log.errors, status: :bad_request
		      end
		  else
		  	render nothing: true, status: :unprocessable_entity
		  end
	    
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def destroy
		begin
	      @activity_log.destroy
	      head :no_content
      	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	private

	def activity_log_params
	  params.require(:activity_log).permit(:baby_id, :assistant_id, :activity_id, :start_time , :comments )
	end

	def set_activity_log
	  @activity_log = ActivityLog.find(params[:id])
	end
end