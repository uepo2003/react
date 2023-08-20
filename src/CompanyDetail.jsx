import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  Legend
} from 'recharts';

const formatTickItem = (tickItem) => {
  if (tickItem >= 1000000) return `${tickItem / 1000000}M(円)`;
  if (tickItem >= 1000) return `${tickItem / 1000}K`;
  return tickItem;
};

const CompanyDetail = () => {
  const [company, setCompany] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/companies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  
        setCompany(data)
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/companies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/home'); // Successful deletion redirects to homepage
      } else {
        alert('Failed to delete.');
      }
    } catch (error) {
      alert('Error occurred: ' + error.message);
    }
  };

  if (!company) return <div>Loading...</div>;

  let data = [];
  let data2 = [];

  if (company.earnings.length > 0) {
    const { earnings_2020, earnings_2021, earnings_2022, profit_2020, profit_2021, profit_2022 } = company.earnings[0];
    data = [
      { year: '2020年', 収入: parseInt(earnings_2020.replace(/,/g, ''), 10) },
      { year: '2021年', 収入: parseInt(earnings_2021.replace(/,/g, ''), 10) },
      { year: '2022年', 収入: parseInt(earnings_2022.replace(/,/g, ''), 10) }
    ];
    data2 = [
      { year: '2020年', 利益: parseInt(profit_2020.replace(/,/g, ''), 10) },
      { year: '2021年', 利益: parseInt(profit_2021.replace(/,/g, ''), 10) },
      { year: '2022年', 利益: parseInt(profit_2022.replace(/,/g, ''), 10) }
    ];
  }

  return (
    <>
      <div>
        <h2>{company.company_name}</h2>
        <p><strong>企業コード:</strong> {company.company_code}</p>
        <p><strong>上場状況:</strong> {company.listing_status}</p>
        <p><strong>企業名（かな）:</strong> {company.company_name_kana}</p>
        <p><strong>メールアドレス:</strong> {company.mail_address}</p>
        <p><strong>住所:</strong> {company.address}</p>
        <p><strong>代表者:</strong> {company.representative}</p>
        <p><strong>代表者（かな）:</strong> {company.representative_kana}</p>
        <p><strong>電話番号:</strong> {company.phone_number}</p>
      </div>
     
      <>
      {data.length > 0 && (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[0, 40000000]} ticks={[0, 10000000, 20000000, 30000000, 40000000]} tickFormatter={formatTickItem} width={80}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="収入" fill="#8884d8" />
        </BarChart>
      )}

      {data2.length > 0 && (
        <BarChart width={600} height={300} data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[0, 40000000]} ticks={[0, 10000000, 20000000, 30000000, 40000000]} tickFormatter={formatTickItem} width={80}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="利益" fill="#008000" />
        </BarChart>
      )}
      </>
    
      <Link to="/home" className="ToukouForm">ホーム</Link>
      <Link to={`/companies/${id}/edit`} className="ToukouForm">編集</Link>
      <Link to="/companies" className="ToukouForm">一覧へ戻る</Link>
      <button onClick={handleDelete} className="ToukouForm">削除</button>
    </>
  );
};

export default CompanyDetail;
