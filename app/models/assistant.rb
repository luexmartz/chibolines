class Assistant < ActiveRecord::Base
	has_many :activity_logs, dependent: :nullify

	scope :searching, -> query { where('name LIKE ? OR address LIKE ? OR phone LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%") }

	validates :name,    :presence => { message: "El nombre esta vacío" },    :length => { maximum: 50, message: "El nombre supero el máximo de caracteres permitidos (50)" }
	validates :group,   :presence => { message: "El grupo esta vacío" },     :length => { maximum: 40, message: "El grupo supero el máximo de caracteres permitidos (40)" }
	validates :address, :presence => { message: "La dirección esta vacía" }, :length => { maximum: 30, message: "La dirección supero el máximo de caracteres permitidos (30)" }
	validates :phone,   :presence => { message: "El teléfono esta vacío" },  :length => { maximum: 20, message: "El teléfono supero el máximo de caracteres permitidos (20)" }
end