import Logo from '../assets/EMAUS.png';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();
    const {setAuth, setEstado} = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.URL_BACKEND}login/conductor`;
            const respuesta = await axios.post(url, form);
            localStorage.setItem('token', respuesta.data.token);
            setAuth(respuesta.data);
            toast.success(respuesta.data.msg);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };

    return (
        <>
        <ToastContainer />
        <body id="login-body">
            <div id="login-glass-container">
                <div id="login-box">
                    <h2 id="login-title">Login</h2>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <input 
                            id="login-email" 
                            value={form.email} 
                            onChange={handleChange} 
                            type='email' 
                            name='email' 
                            required 
                            placeholder='Email' 
                        />
                        <input 
                            id="login-password" 
                            value={form.password} 
                            onChange={handleChange} 
                            type='password' 
                            name='password' 
                            required 
                            placeholder='Password' 
                        />
                        <div id="login-options">
                            <input id="login-remember" type="checkbox" name="remember" />
                            <label htmlFor="login-remember">Recordarme</label>
                            <Link to='/recuperacion' id="login-forgot-password">Olvidaste tu contraseña?</Link>
                        </div>
                        <button id="login-button" className="btn btn-success">Ingresar</button> <br></br>
                        <p id="login-register-text">¿No tienes una cuenta?</p>
                        <Link to="/register" id="login-register-link">Registrate</Link>
                    </form>
                </div>
            </div>
        </body>
        </>
    );
};

export default Login;
