/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import config from '../config';
 
const UserList = () => {
    const [user, setUser] = useState([]);
 
    useEffect(() => {
        getUser();
    },[]);
 
    const getUser = async () => {
        const users = await axios.get(`/api/UserController`);
        setUser(users.data);
    }
 
    const deleteUser = async (id) =>{
        const csrfToken = await axios.get(`/api/csrf-token`);
        await axios.delete(`/api/UserController/${id}`,{
           headers: {
                'X-CSRF-TOKEN': csrfToken.data.token,
            },
        });
        getUser();
    }
 
return (
            <div>
                <Link to="/register" className="button is-primary mt-5">Add New</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((data, index) => (
                            <tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.username}</td>
                                <td>{data.password}</td>
                                <td>
                                    <Link to={`/edit/${data.id}`} className="button is-small is-info">Edit</Link>
                                    <button onClick={() => deleteUser(data.id)} className="button is-small is-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
        
}
        
export default UserList