class ActivityLog < ActiveRecord::Base
	belongs_to :baby
	belongs_to :assistant
	belongs_to :activity

	def self.by_column_filter(baby_id = "", assistant_id = "")
	  return where(baby_id: baby_id, assistant_id: assistant_id) if !baby_id.blank? && !assistant_id.blank?
	  return where(baby_id: baby_id) if !baby_id.blank?
	  return where(assistant_id: assistant_id) if !assistant_id.blank?
	  all
	end
end