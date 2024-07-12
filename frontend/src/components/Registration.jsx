import React, { useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom';
import axios from "axios";
import config from "../config";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
 
    const saveUser = async (e) => {
        e.preventDefault();
        const csrfToken = await axios.get(`/api/csrf-token`);
        await axios.post(`/api/UserController`,{
            username: username,
            password: password,
        },
        {
            headers: {
                'X-CSRF-TOKEN': csrfToken.data.token,
            },
        }

    );
        history("/"); 
    }
 
    return (
        <div>
            <form onSubmit={ saveUser }>
                <div className="field">
                    <label className="label">Username</label>
                    <input 
                        type="text"
                        className="input"
                        value={ username } 
                        onChange={ (e) => setUsername(e.target.value) }
                        placeholder="Username"
                    />
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <input 
                        type="text"
                        className="input"
                        value={ password } 
                        onChange={ (e) => setPassword(e.target.value) }
                        placeholder="Password"
                    />
                </div>
                <div className="field">
                    <button className="button is-primary">Save</button>
                    <Link to="/" className="button is-primary ml-5">List</Link>
                </div>
            </form>
        </div>
    )
}
 
export default Registration