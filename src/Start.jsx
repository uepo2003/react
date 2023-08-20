import React from 'react';
import { Link } from 'react-router-dom';
function Start() { 
return(
<>
<h1>ログインまたはサインアップ</h1>
    <Link to="/sign_up" className="ToukouForm">サインアップ</Link>
    <Link to="/login" className="ToukouForm">ログイン</Link>
</>
)
}
export default Start;