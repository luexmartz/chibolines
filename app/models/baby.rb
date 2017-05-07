class Baby < ActiveRecord::Base
	has_many :activity_logs, dependent: :nullify

	scope :searching, -> query { where('name LIKE ? OR birthday LIKE ? OR mother_name LIKE ? OR father_name LIKE ? OR phone LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%") }
	
	validates :name,        :presence => { message: "El nombre esta vacío" },             :length => { maximum: 50, message: "El nombre supero el máximo de caracteres permitidos (50)" }
	validates :birthday,    :presence => { message: "La fecha de cumpleños esta vacía" }
	validates :mother_name, :presence => { message: "El nombre de la mami esta vacío" },  :length => { maximum: 50, message: "El nombre de la mami supero el máximo de caracteres permitidos (50)" }
	validates :father_name, :presence => { message: "El nombre del papi esta vacío" },    :length => { maximum: 50, message: "El nombre del papi supero el máximo de caracteres permitidos (50)" }
	validates :address,     :presence => { message: "La dirección esta vacía" },          :length => { maximum: 30, message: "La dirección supero el máximo de caracteres permitidos (30)" }
	validates :phone,       :presence => { message: "El teléfono esta vacío" },           :length => { maximum: 20, message: "El teléfono supero el máximo de caracteres permitidos (20)" }
end