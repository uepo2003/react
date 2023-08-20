class CreateEarnings < ActiveRecord::Migration[6.1]
  def change
    create_table :earnings do |t|
      t.string "earnings_2022"
      t.string "profit_2022"
      t.string "earnings_2021"
      t.string "profit_2021"
      t.string "earnings_2020"
      t.string "profit_2020"
      t.timestamps
    end
  end
end
