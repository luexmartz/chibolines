class Api::V1::ActivitiesController < Api::V1::BaseController

	before_action :set_activity, only: [:update, :destroy]

	def index
		begin
	  	  render json: Activity.select(:id, :name, :description).order(sort_by + ' ' + order).to_json, status: :ok
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
    end

    def search 
    	begin
    		
		  activities = Activity.searching(params[:query])

		  render json: activities, status: :ok
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def create
		begin
		  activity = Activity.new(activity_params)
		  if activity.save
		    render json: activity, status: :created
		  else
		    render nothing: true, status: :bad_request
		  end
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def update
		begin
	      if @activity.update(activity_params)
	        render json: @activity, status: :ok
	      else
	        render nothing: true, status: :unprocessable_entity
	      end
      	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def destroy
		begin
		  @activity.destroy
		  head :no_content
      	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	private

	def activity_params
	  params.require(:activity).permit(:name, :description)
	end

	def set_activity
	  @activity = Activity.find(params[:id])
	end

	def sort_by
      %w(name
         description).include?(params[:sort_by]) ? params[:sort_by] : 'name'
    end

    def order
      %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
	end
end