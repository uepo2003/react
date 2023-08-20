import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetch("http://localhost:3000/companies")
      .then((response) => response.json())
      .then((data) => setCompanies(data));
  }, []);

  // 現在のページのデータを計算
  const currentCompanies = companies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mt-5">
      
      <h1 className="text-center mb-4">登録企業一覧</h1>
      <div className="row">
  
      {currentCompanies.map((company) => (
  　　　<div key={company.id} className="col-md-4 mb-4">
       <div className="card">
         <div className="card-body">
         <h5 className="card-title larger-font">{company.company_name}</h5>
          <p className="card-text">
            <strong>企業コード：</strong> {company.company_code}
          </p>
          <p className="card-text">
            <strong>上場状況：</strong> {company.listing_status}
          </p>
        {/* 企業詳細ページへのリンクを追加 */}
        <Link to={`/companies/${company.id}`} className="btn btn-info mt-2">
          詳細を見る
        </Link>
      </div>
    </div>
  </div>
))}

      </div>

      {/* ページネーションコントロール */}
      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
         <Link to="/home" className="ToukouForm">ホーム</Link>
      </div>
    </div>
  );
};

export default CompanyList;
