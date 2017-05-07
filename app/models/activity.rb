class Activity < ActiveRecord::Base
	has_many :activity_logs, dependent: :nullify

	scope :searching, -> query { where('name LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%") }

	validates :name,        :presence => { message: "El nombre esta vacío" },      :length => { maximum: 50,  message: "El nombre supero el máximo de caracteres permitidos (50)" }
	validates :description, :presence => { message: "La descripción esta vacía" }, :length => { maximum: 150, message: "La descripción supero el máximo de caracteres permitidos (150)" }
end