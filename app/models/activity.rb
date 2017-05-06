class Activity < ActiveRecord::Base
	has_many :activity_logs, dependent: :nullify

	scope :searching, -> query { where('name LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%") }
end