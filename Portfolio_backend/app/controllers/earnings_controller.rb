class EarningsController < ApplicationController
   def index
     # 年度ごとの平均を計算
     avg_earnings_2020 = Earning.average(:earnings_2020).to_f
     avg_profit_2020 = Earning.average(:profit_2020).to_f
 
     avg_earnings_2021 = Earning.average(:earnings_2021).to_f
     avg_profit_2021 = Earning.average(:profit_2021).to_f
 
     avg_earnings_2022 = Earning.average(:earnings_2022).to_f
     avg_profit_2022 = Earning.average(:profit_2022).to_f
 
     data = [
       { year: '2020', average_earnings: avg_earnings_2020, average_profit: avg_profit_2020 },
       { year: '2021', average_earnings: avg_earnings_2021, average_profit: avg_profit_2021 },
       { year: '2022', average_earnings: avg_earnings_2022, average_profit: avg_profit_2022 }
     ]
 
     render json: data
   end
 end
 
 