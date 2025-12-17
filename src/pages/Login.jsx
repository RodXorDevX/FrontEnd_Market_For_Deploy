import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../assets/css/Login.css";
import loginImg from "../assets/img/Register/LoginPic.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/usuarios/login', { email, password });

      // Crear objeto con el formato esperado por el contexto
      const datosUsuario = {
        token: response.data.token, // ← token real que viene del backend
        usuario: response.data.usuario // ← objeto usuario completo
      };

      login(datosUsuario);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.usuario.id);

      navigate("/perfil");
    } catch (error) {
      console.error('Error en el login:', error);
      if (error.response?.status === 401) {
        alert('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
      } else if (error.code === 'ERR_NETWORK') {
        alert('Error de conexión. Por favor, intenta más tarde.');
      } else {
        alert('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="box">
        <div className="login-img">
          <img 
            src={loginImg} 
            alt="Promo login" 
            style={{ 
              maxWidth: '80%', 
              height: 'auto',
              marginBottom: '20px'
            }} 
          />
        </div>

        <div className="login-form">
          <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)' }}>INICIO DE SESIÓN</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            />
            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '12px',
                fontSize: '16px',
                marginTop: '15px'
              }}
            >
              INICIAR SESIÓN
            </button>
          </form>
          <p className="registro-link" style={{ textAlign: 'center', marginTop: '20px' }}>
            ¿No tienes cuenta? <span onClick={() => navigate("/registro")}>Regístrate aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;