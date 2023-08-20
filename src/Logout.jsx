import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.delete('http://localhost:3000/users/sign_out'); // このエンドポイントはバックエンドの実装に依存します。
            
            if (response.status === 200) {
                console.log('Logged out', response.data);
                
                // Navigate to the login route after successful logout
                navigate('/'); // ログアウト後にログインページへリダイレクト
            } else {
                console.error('Error during logout', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    return (
        <>
            <h1>ログアウト画面</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Logout;
