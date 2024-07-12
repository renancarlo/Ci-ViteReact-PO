import React, { useState,useEffect } from "react";
import UserList from "../components/UserList";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Assets/css/custom.css";
import LoginForm from "../components/LoginForm";

const Home = () => {

  const [isLogin,setLogin] = useState(true);
  const [loading,setLoading] = useState(true);
  const redirect = useNavigate();

  useEffect(() => {
    const isLogged = async () => {
      try {
        const response = await axios.get("/api/auth/is_logged_in");
        if (!response.data.logged_in) {
            setLogin(false)
          redirect("/login");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    isLogged();
  });
  
  if(loading){
    return (
        <>
            <LoginForm/>
            <div className={`loading_animation d-flex`}>
                <div className="spinner-container">
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h4 className="mt-4">Loading...</h4>
                </div>
            </div>
        </>
    );
  }

  return (
    <>
      {isLogin && <Layout content={<UserList />} />}
    </>
  );
};

export default Home;
