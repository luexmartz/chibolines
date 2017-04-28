class Baby < ActiveRecord::Base
	has_many :activity_logs
end