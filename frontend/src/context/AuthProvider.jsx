import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const perfil = async (token) => {
    try {
      const url = `${import.meta.env.VITE_URL_BACKEND}/visualizar/perfil/admin`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const respuesta = await axios.get(url, options);
      setAuth(respuesta.data.administrador);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      perfil(token);
    }
    
  }, [])

  








  return (
    <AuthContext.Provider value={
      { auth, 
        setAuth, 
        loading, 
        setLoading

      }
      }>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;