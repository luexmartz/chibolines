module BabiesHelper

	#get names of assistants names
	def get_hash_objects
      @assistants_hash = {}
      Assistant.select(:id, :name).each do |assistant|  
        @assistants_hash[assistant.id] = assistant.name
      end
	end

	#Make the hash of activity_logs for a baby
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

  	#Make the hash of babies
  	def babies_make_hash(babies)
	    babies_hash = []
	    cont = 0
	    babies.each do |baby|  
	        babies_hash[cont] = {}
	        babies_hash[cont]["id"]              = baby.id
	        babies_hash[cont]["name"]            = baby.name
	        
			#Get age in months
			today    = DateTime.now
			birthday = baby.birthday.to_time
			months = ((today.year * 12) + today.month) - ((birthday.year * 12) + birthday.month)
			if today.day < birthday.day
				months = months - 1
			end
		
	        babies_hash[cont]["age_months"]      = months
	        babies_hash[cont]["birthday"]        = baby.birthday
	        babies_hash[cont]["mother_name"]     = baby.mother_name
	        babies_hash[cont]["father_name"]     = baby.father_name
	        babies_hash[cont]["address"]         = baby.address
	        babies_hash[cont]["phone"]           = baby.phone
	        cont = cont + 1
	      end

	      return babies_hash
  	end

  	#validate format of Date
	def validate_date(date_str)
	    valid_formats = ["%Y-%m-%d"] 
	    valid_formats.each do |format|
	      valid = Time.strptime(date_str, format) rescue false

	      return true if valid
	    end

	    return false
	end
end
