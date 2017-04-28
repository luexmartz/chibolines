class ActivityLog < ActiveRecord::Base
	belongs_to :baby
	belongs_to :assistant
	belongs_to :activity
end