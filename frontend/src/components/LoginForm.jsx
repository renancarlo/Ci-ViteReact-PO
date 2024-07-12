import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Assets/css/custom.css";
import loginlogo from '../Assets/img/logo_black.png';
const LoginForm = () => {
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [passDiv, setPassDiv] = useState('d-none');
    const [passInputInvalid, setPassInputInvalid] = useState('');
    const [userError, setUserError] = useState('');
    const [userDiv, setUserDiv] = useState('d-none');
    const [userInputInvalid, setUserInputInvalid] = useState('');
    const [loading, showLoading] = useState('');
    const [errors, setErrors] = useState();

    const redirect = useNavigate();

    useEffect(() => {
        document.body.classList.add('Login-background');
        return ()=>{
            document.body.classList.remove('Login-background');
        };
    },[]);

    const userOnchange = (e) => {
        setUsername(e.target.value);
        setUserDiv('d-none');
        setUserInputInvalid('');
    }

    const passOnchange = (e) => {
        setPassword(e.target.value);
        setPassDiv('d-none');
        setPassInputInvalid('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const csrfToken = await axios.get(`/api/csrf-token`);
        if(!username || !password){
            if(!username){
                setUserError('Username is required');
                setUserDiv('d-flex');
                setUserInputInvalid('is-invalid');
            }
            if(!password){
                setPassError('Password is required');
                setPassDiv('d-flex');
                setPassInputInvalid('is-invalid');
            } 
        }else{
            showLoading('d-flex');
            try{
                const response  = await axios.post(`/api/auth/login`,{
                    username: username,
                    password: password,
                },{
                    headers:{
                        'X-CSRF-TOKEN' : csrfToken.data.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                
                if(response.data.status === 'success'){
                    redirect(response.data.redirect);
                }else{
                    
                    // setErrors(response.data.errors);
                    // console.log(errors);
                }
            }catch(err){

            }finally{
                showLoading('d-none');
            }
        }
    }

    return (
        <section className="col-md-12 p-4">    
            <div className="row d-flex align-items-center justify-content-center m-4">
           
                 <div className="shadow col-md-4 d-flex align-items-center justify-content-center rounded" id="login_container" style={{backgroundColor: 'rgba(253, 253, 253, 0.3)'}}>
                        {/* { (errors)?
                        <div className="alert alert-danger" role="alert">
                            <ul>
                            {
                                Object.keys(errors).map(keys =>(
                                    <li>{errors[keys]}</li>
                                ))
                            }
                            </ul>
                        </div>
                        :""
                        } */}
                    <div className="card-body p-3">
                        <div className="row">
                        <div className="col-12 mb-3">
                            <div className= "text-center">
                                <img src={loginlogo} alt="" style={{width:'70%', height:'70%'}}/>
                            </div>
                            <div className={`loading_animation ${loading}`}>
                                <div className="spinner-container">
                                  <div className="spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                </div>
                              </div>
                        </div>
                        <form onSubmit={handleSubmit} id="login_form">
                           
                            <div className="form-floating mb-3">
                               <input type="text" className={`form-control ${userInputInvalid}`} name="username" id="username" onChange={userOnchange}/>
                               <label htmlFor="username">Username</label>
                               <div className={`text-center fw-bold ${userDiv}`} id="username-error">{userError}</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className={`form-control ${passInputInvalid}`} name="password" id="password" onChange={passOnchange} />
                                <label htmlFor="password">Password</label>
                                {/* <i className="fas fa-eye" id="passwordIcon"></i> */}
                                <div className={`text-center fw-bold ${passDiv}`} id="password-error">{passError}</div>
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
                                <button className="form-control btn btn-dark" id="log_btn" type="submit">LOGIN</button>
                            </div>
                        </form>
                        
                        <div className="row">
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );

}

export default LoginForm;