import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PostForm = () => {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post: { content: text } }),
            });
    
            const data = await response.json();
            if(response.ok) {
                console.log('Posted:', data);
                navigate('/home');
                setText('');
            } else {
                console.error('Error posting:', data.errors);
            }
        } catch (error) {
            console.error('There was an error:', error);
        }
    };

    return (
       <>
       <h1>あなたの意見をお聞かせください</h1>
        <div className="post-form-container">
            
            <form onSubmit={handleSubmit}>
                <textarea
                    className="post-textarea"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="あなたの意見、感想を入力してください..."
                />
                <button type="submit" className="post-button">投稿</button>
            </form>
        </div>
        <Link to="/home" class="ToukouForm">ホーム</Link>
      </>
    );
}

export default PostForm;
