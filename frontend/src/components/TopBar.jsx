import React from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import topLogo from '../Assets/img/logo_white.png';
const TopBar = () => {
    const redirect = useNavigate();
    const sidebartoggle = (event)=>{
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }

    const LogOut = async (e) =>{
        e.preventDefault();
       const response = await axios.get(`/api/auth/logout`);
            if(response.data.status){
                redirect(response.data.redirect);
            }
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-4" to="/" style={{ fontFamily: 'Arial, sans-serif' }}>
                <img src={topLogo} style={{ width: '45%' }}/>
            </Link>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={sidebartoggle} href="#!"><i className="fas fa-bars"></i></button>
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <form action="/logout/" method="post" id="logout">
                        </form>
                        <li><a className="dropdown-item" href="#" onClick={LogOut}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default TopBar;