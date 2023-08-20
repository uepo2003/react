import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const CompanyAdd = () => {
    const [formData, setFormData] = useState({
        company_name: '',
        company_code: '',
        listing_status: '',
        company_name_kana: '',
        mail_address: '',
        address: '',
        representative: '',
        representative_kana: '',
        phone_number: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('企業が追加されました！');
                navigate('/home');
            } else {
                alert('追加に失敗しました。');
            }
        } catch (error) {
            alert('エラーが発生しました: ' + error.message);
        }
    };

    return (
        <div>
            <h2>企業追加</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>企業名: </label>
                    <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
                </div>
                <div>
                    <label>企業コード: </label>
                    <input type="text" name="company_code" value={formData.company_code} onChange={handleChange} />
                </div>
                <div>
                    <label>上場状況: </label>
                    <input type="text" name="listing_status" value={formData.listing_status} onChange={handleChange} />
                </div>
                <div>
                    <label>企業名（かな）: </label>
                    <input type="text" name="company_name_kana" value={formData.company_name_kana} onChange={handleChange} />
                </div>
                <div>
                    <label>メールアドレス: </label>
                    <input type="email" name="mail_address" value={formData.mail_address} onChange={handleChange} />
                </div>
                <div>
                    <label>住所: </label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                    <label>代表者: </label>
                    <input type="text" name="representative" value={formData.representative} onChange={handleChange} />
                </div>
                <div>
                    <label>代表者（かな）: </label>
                    <input type="text" name="representative_kana" value={formData.representative_kana} onChange={handleChange} />
                </div>
                <div>
                    <label>電話番号: </label>
                    <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                </div>
                <button type="submit">追加</button>
            </form>
            <Link to="/home" class="ToukouForm">ホームへ</Link>
        </div>
    );
};

export default CompanyAdd;
