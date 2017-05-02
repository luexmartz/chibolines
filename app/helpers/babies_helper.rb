module BabiesHelper
	def get_hash_objects
      @assistants_hash = {}
      Assistant.select(:id, :name).each do |assistant|  
        @assistants_hash[assistant.id] = assistant.name
      end
	end

	def activity_logs_make_hash(activity_logs)
	    activity_logs_hash = []
	    cont = 0
	    activity_logs.each do |activity|  
	        activity_logs_hash[cont] = {}
	        activity_logs_hash[cont]["id"]              = activity.id
	        activity_logs_hash[cont]["baby_id"]         = activity.baby_id
	        activity_logs_hash[cont]["assistant_name"]  = @assistants_hash[activity.assistant_id]
	        activity_logs_hash[cont]["start_time"]      = activity.start_time.in_time_zone('America/Monterrey').utc.iso8601
	        if !activity.stop_time.nil?
	        	activity_logs_hash[cont]["stop_time"]   = activity.stop_time.in_time_zone('America/Monterrey').utc.iso8601
	        end
	        cont = cont + 1
	      end

	      return activity_logs_hash
  	end

	def validate_date(date_str)
	    valid_formats = ["%Y-%m-%d"] 
	    valid_formats.each do |format|
	      valid = Time.strptime(date_str, format) rescue false

	      return true if valid
	    end

	    return false
	end
end
