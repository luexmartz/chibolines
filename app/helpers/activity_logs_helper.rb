module ActivityLogsHelper
	def get_hash_objects
      @babies_hash = {}
      Baby.select(:id, :name).each do |baby|  
        @babies_hash[baby.id] = baby.name
      end
      @assistants_hash = {}
      Assistant.select(:id, :name).each do |assistant|  
        @assistants_hash[assistant.id] = assistant.name
      end
      @activities_hash = {}
      Activity.select(:id, :name).each do |activity|  
        @activities_hash[activity.id] = activity.name
      end 
	end

  def activity_logs_make_hash(activity_logs)
    activity_logs_hash = []
    cont = 0
    activity_logs.each do |activity|  
        activity_logs_hash[cont] = {}
        activity_logs_hash[cont]["id"]         = activity.id
        activity_logs_hash[cont]["baby"]       = @babies_hash[activity.baby_id]
        activity_logs_hash[cont]["assistant"]  = @assistants_hash[activity.assistant_id]
        activity_logs_hash[cont]["activity"]   = @activities_hash[activity.activity_id]
        activity_logs_hash[cont]["start_time"] = activity.start_time.in_time_zone('America/Monterrey').utc.iso8601
        activity_logs_hash[cont]["stop_time"]  = activity.stop_time.nil? ? "En progreso" : "Terminada"
        activity_logs_hash[cont]["duration"]   = activity.duration
        cont = cont + 1
      end

      return activity_logs_hash
  end

  def validate_datetime(date_str)
    valid_formats = ["%Y/%m/%d %H:%M:%S"] 
    valid_formats.each do |format|
      valid = Time.strptime(date_str, format) rescue false

      return true if valid
    end

    return false
  end
end
