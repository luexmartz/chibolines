class Api::V1::BabiesController < Api::V1::BaseController

	include BabiesHelper

	before_action :set_baby, only: [:update, :destroy, :activities]
	before_action :get_hash_objects, only: [:activities]

	def index
		begin
	  	  babies = Baby.select(:id, :name, :birthday, :mother_name, :father_name, :address, :phone).order(sort_by + ' ' + order)
	      babies_hash = babies_make_hash(babies)

		  render json: babies_hash.to_json, status: :ok

    	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
    end

    def search 
    	begin
		  babies = Baby.searching(params[:query])

		  render json: babies, status: :ok
	  	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def activities
		begin
			if !@baby.nil?

				activity_logs = @baby.activity_logs.select(:id, :baby_id, :assistant_id, :start_time, :stop_time)
				activity_logs_hash = activity_logs_make_hash(activity_logs)

				render json: activity_logs_hash.to_json, status: :ok
			else
			  render nothing: true, status: :not_found
		  	end
		rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def create
		begin
		  if validate_date(params[:baby][:birthday])
			    baby = Baby.new(baby_params)
			  
			    #Validate birthday after today
			    today = DateTime.now.strftime("%Y-%m-%d")

			    if baby.birthday.strftime("%Y-%m-%d") < today

				  if baby.save
				    render json: baby, status: :created
				  else
		   		 	render json: baby.errors, status: :bad_request
				  end
				else
				  	render nothing: true, status: :unprocessable_entity
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
			if validate_date(params[:baby][:birthday])
				
				#Validate birthday after today
			    today = DateTime.now.strftime("%Y-%m-%d")
			    birthday = Time.strptime(params[:baby][:birthday], "%Y-%m-%d")

				if birthday.strftime("%Y-%m-%d") < today
			      
			      if @baby.update(baby_params)
			        render json: @baby, status: :ok
			      else
		   		 	render json: @baby.errors, status: :bad_request
			      end
			      
				else
				  	render nothing: true, status: :unprocessable_entity
				end
			else
		  		render nothing: true, status: :bad_request
		  	end
        rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	def destroy
		begin 
		  @baby.destroy
		  head :no_content
      	rescue Exception => e
		  render nothing: true, status: :internal_server_error
        end
	end

	private

	def baby_params
	  params.require(:baby).permit(:name, :birthday, :mother_name, :father_name, :address, :phone)
	end

	def set_baby
	  @baby = Baby.find(params[:id])
	end

	def sort_by
      %w(name
         birthday
         mother_name
         father_name
         address
         phone).include?(params[:sort_by]) ? params[:sort_by] : 'name'
    end

    def order
      %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
	end
end