import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: #007BFF;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CompanyList = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
`;

const CompanyItem = styled.li`
  padding: 8px 0;
`;

async function searchCompanies(query) {
  const response = await fetch(`http://localhost:3000/companies?query=${query}`);
  const data = await response.json();
  return data;
}

function SearchApp() {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState([]);

  async function handleSearch() {
    const results = await searchCompanies(query);
    console.log(results);
    setCompanies(results);
  }

  return (
    <>
    <h1>登録企業検索</h1>
    <Container>
      <SearchInput 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="探したい企業を入力"
      />
      <SearchButton onClick={handleSearch}>検索</SearchButton>
      <CompanyList>
        {companies.map((company) => (
          <CompanyItem key={company.id}><Link to={`/companies/${company.id}`}>{company.company_name}</Link></CompanyItem>
        ))}
      </CompanyList>
    </Container>
    <Link to="/home" className="ToukouForm">ホーム</Link>
    </>
  );
}

export default SearchApp;
