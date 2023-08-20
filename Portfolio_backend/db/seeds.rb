# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'
 

CSV.foreach('hono.csv', headers: true) do |row|
  # データベースへの登録処理を行う
   a = row['企業コード']
   b = row['上場状況']
   c = row['企業名']
   d = row['企業名（カナ）']
   e = row['郵便番号']
   f = row['所在地']
   g = row['代表者名']
   h = row['代表者名（カナ）']
   i = row['電話番号']
  
   
   company = Company.new(
     company_code: a,
     listing_status: b,
     company_name: c,
     company_name_kana: d,
     mail_address: e,
     address: f,
     representative: g,
     representative_kana: h,
     phone_number: i,
   )
   company.save

end

CSV.foreach('hono.csv', headers: true) do |row|

  j = row['売上（2022）']
  k = row['利益（2022）']
  l = row['売上（2021）']
  m = row['利益（2021）']
  n = row['売上（2020）']
  o = row['利益（2020）']

  earnings = Earning.new(
  
    earnings_2022: j,
    profit_2022: k,
    earnings_2021: l,
    profit_2021: m,
    earnings_2020: n,
    profit_2020: o
  )

  earnings.save
end