class Baby < ActiveRecord::Base
	has_many :activity_logs, dependent: :nullify

	scope :searching, -> query { where('name LIKE ? OR birthday LIKE ? OR mother_name LIKE ? OR father_name LIKE ? OR phone LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%") }
end