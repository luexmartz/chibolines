class Assistant < ActiveRecord::Base
	has_many :activity_logs, dependent: :nullify

	scope :searching, -> query { where('name LIKE ? OR address LIKE ? OR phone LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%") }
end