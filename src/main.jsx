import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import CompanyList from "./CompanyList.jsx";
import SearchApp from "./Search.jsx";
import CompanyDetail from "./CompanyDetail.jsx";
import Opinion from "./Opinion.jsx";
import Edit from "./Edit.jsx";
import CompanyAdd from "./CompanyAdd.jsx";
import Login from "./Login.jsx";
import Start from "./Start.jsx"
import SignUp from "./SignUp.jsx"
import Logout from "./Logout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/search" element={<SearchApp />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
        <Route path="/opinion" element={<Opinion />} />
        <Route path="/companies/:id/edit" element={<Edit />} />
        <Route path="/companyadd" element={<CompanyAdd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Start />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
