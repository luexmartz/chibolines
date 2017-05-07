class ActivityLog < ActiveRecord::Base
	belongs_to :baby
	belongs_to :assistant
	belongs_to :activity

	scope :recent, -> { order("start_time desc") }
	scope :by_status, -> status { status == "start" ? where(stop_time: nil) : where.not(stop_time: nil) }
	
	validates :baby_id,      :presence => { message: "Selecciona un bebe" }
	validates :assistant_id, :presence => { message: "Selecciona una asistente" }
	validates :activity_id,  :presence => { message: "Selecciona una actividad" }
	validates :start_time,   :presence => { message: "Selecciona una fecha y hora de inicio" }

	def self.by_column_filter(baby_id = "", assistant_id = "")
	  return where(baby_id: baby_id, assistant_id: assistant_id) if !baby_id.blank? && !assistant_id.blank?
	  return where(baby_id: baby_id) if !baby_id.blank?
	  return where(assistant_id: assistant_id) if !assistant_id.blank?
	  all
	end
end