class Company < ApplicationRecord
    has_many :earnings, dependent: :destroy
end
