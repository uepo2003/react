import React from 'react';
import './App.css';

import { Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="App">
            <button className="hamburger color" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
            {isOpen && (
                <ul className="menu">
                    <li>
                        <Link to="/home">ホーム</Link>
                    </li>
                    <li>
                        <Link to="/companies">企業情報</Link>
                    </li>
                    <li>
                        <Link to="/search">検索</Link>
                    </li>
                    <li>
                        <Link to="/opinion">意見投稿フォーム</Link>
                    </li>
                    <li>
                        <Link to="/logout">ログアウト</Link> {/* ログアウトのリンクを追加 */}
                    </li>
                </ul>
            )}

            <h1>企業情報サイト</h1>
            <Link to="/companyadd" className="ToukouForm">企業登録はこちら</Link>
        </div>
    );
}

export default App;
