import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const [company, setCompany] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/companies/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch company details');
        return response.json();
      })
      .then((data) => setCompany(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/companies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    })
    .then((response) => {
      if (!response.ok) throw new Error('Failed to update company details');
      return response.json();
    })
    .then(() => {
      setMessage('Company details updated successfully!');
      navigate(`/companies/${id}`);
    })
    .catch((err) => setError(err.message));
  };

  return (
    <div>
    <h2>編集 - {company.company_name}</h2>
    {error && <p style={{color: 'red'}}>{error}</p>}
    {message && <p style={{color: 'green'}}>{message}</p>}
    <form onSubmit={handleSubmit}>
        <div>
            <label>企業名:</label>
            <input 
                type="text" 
                name="company_name" 
                value={company.company_name || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>企業コード:</label>
            <input 
                type="text" 
                name="company_code" 
                value={company.company_code || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>上場状況:</label>
            <input 
                type="text" 
                name="listing_status" 
                value={company.listing_status || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>企業名（かな）:</label>
            <input 
                type="text" 
                name="company_name_kana" 
                value={company.company_name_kana || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>メールアドレス:</label>
            <input 
                type="email" 
                name="mail_address" 
                value={company.mail_address || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>住所:</label>
            <input 
                type="text" 
                name="address" 
                value={company.address || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>代表者:</label>
            <input 
                type="text" 
                name="representative" 
                value={company.representative || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>代表者（かな）:</label>
            <input 
                type="text" 
                name="representative_kana" 
                value={company.representative_kana || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <div>
            <label>電話番号:</label>
            <input 
                type="text" 
                name="phone_number" 
                value={company.phone_number || ''} 
                onChange={handleInputChange} 
            />
        </div>
        <button type="submit">保存</button>
    </form>
</div>

  );
  };

export default Edit;
