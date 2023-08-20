class AddCompanyIdToEarnings < ActiveRecord::Migration[6.1]
  def change
    add_reference :earnings, :company, null: true, foreign_key: true
  end
end
