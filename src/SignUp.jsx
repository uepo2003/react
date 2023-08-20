import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axiosをインポート

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/sign_up', { user: formData });

      if (response.status === 422) {
        if (Array.isArray(response.data.errors)) {
          setErrors(response.data.errors);
        } else {
          // data.errorsが配列でない場合、何らかのデフォルトのエラーメッセージを表示する
          setErrors(["登録に失敗しました。"]);
        }
      } else if (response.status === 200) { // axiosの場合、response.okは使用しません
        // Handle successful signup
        navigate('/home');
        setFormData({
          email: '',
          password: '',
          password_confirmation: ''
        });
      } else {
        alert('サーバーエラーが発生しました。');
      }
    } catch (error) {
      // axiosのエラーはerror.responseを使用してアクセスできます
      if (error.response && error.response.status === 422) {
        if (Array.isArray(error.response.data.errors)) {
          setErrors(error.response.data.errors);
        } else {
          setErrors(["登録に失敗しました。"]);
        }
      } else {
        alert('エラーが発生しました。再度お試し下さい。');
      }
    }
  }

  return (
<div>
<h1>サインアップ画面</h1>
<form onSubmit={handleSubmit}>
  <div>
    <label>Email:</label>
    <input type="email" name="email" value={formData.email} onChange={handleChange} />
  </div>
  <div>
    <label>Password:</label>
    <input type="password" name="password" value={formData.password} onChange={handleChange} />
  </div>
  <div>
    <label>Confirm Password:</label>
    <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
  </div>
  <div>
    <button type="submit">Sign Up</button>
  </div>
</form>
{Array.isArray(errors) && <div>{errors.map(error => <p key={error}>{error}</p>)}</div>}
</div>
  );
}

export default SignUp;

