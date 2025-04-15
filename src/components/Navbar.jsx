import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaShoppingCart, FaStar, FaBars, FaTimes } from 'react-icons/fa';
import '../assets/css/Navbar.css';

// Importar imágenes de avatares
import avatar1 from '../assets/img/Register/icon1.png';
import avatar2 from '../assets/img/Register/icon2.png';
import avatar3 from '../assets/img/Register/icon3.png';
import avatar4 from '../assets/img/Register/icon4.png';
import avatar5 from '../assets/img/Register/icon5.png';
import avatar6 from '../assets/img/Register/icon6.png';
import defaultAvatar from '../assets/img/default-avatar.webp';

// Mapeo de nombres a imágenes
const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6
};

function Navbar() {
  const { carrito, calcularTotal } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Menú hamburguesa móvil (izquierda) */}
      <div className="mobile-only hamburger-menu" onClick={toggleMenu}>
        {menuOpen ? <FaTimes color="#ffffff" size={24} /> : <FaBars color="#ffffff" size={24} />}
      </div>
      
      {/* Logo (izquierda) */}
      <div className="logo-section">
        <div className="container-0-1-6">
          <div className="logo-icon">
            <FaStar color="#151c33" />
          </div>
        </div>
        <Link to="/" className="text-0-1-4">TREND'S</Link>
      </div>

      {/* Menú desplegable móvil */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        {!usuario ? (
          <div className="menu-items-mobile">
            <Link to="/registro" onClick={closeMenu}>REGISTRO</Link>
            <Link to="/login" onClick={closeMenu}>INGRESAR</Link>
          </div>
        ) : (
          <div className="menu-items-mobile">
            <Link to="/perfil" onClick={closeMenu}>Mi Perfil</Link>
            <Link to="/publicar" onClick={closeMenu}>Publicar</Link>
            <button onClick={() => { logout(); closeMenu(); }}>Cerrar sesión</button>
          </div>
        )}
      </div>

      {/* Contenedor derecho con todos los elementos juntos (escritorio) */}
      <div className="desktop-nav-right">
        {!usuario ? (
          <div className="auth-links">
            <Link to="/registro">REGISTRO</Link>
            <Link to="/login">INGRESAR</Link>
          </div>
        ) : (
          <>
            {/* Menú de escritorio - fila horizontal */}
            <div className="user-nav">
              <Link to="/perfil">Mi Perfil</Link>
              <Link to="/publicar">Publicar</Link>
              <button onClick={logout}>Cerrar sesión</button>
              
              {/* Avatar en escritorio */}
              <div className="avatar-container">
                <img
                  src={avatarMap[usuario.usuario.avatar] || defaultAvatar}
                  alt="Avatar"
                  className="avatar-img"
                />
              </div>
              
              {/* Carrito en escritorio (integrado con el menú) */}
              <Link to="/carrito" className="cart-container">
                <div className="cart-icon">
                  <FaShoppingCart color="#151c33" size={20} />
                  {carrito && carrito.length > 0 && (
                    <span className="cart-total">
                      ${calcularTotal().toLocaleString("es-CL")}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Avatar y carrito móvil (separados) */}
      <div className="mobile-only mobile-user-actions">
        {usuario && (
          <>
            <div className="avatar-container-mobile">
              <img
                src={avatarMap[usuario.usuario.avatar] || defaultAvatar}
                alt="Avatar"
                className="avatar-img"
              />
            </div>
            
            <Link to="/carrito" className="cart-container-mobile">
              <div className="cart-icon">
                <FaShoppingCart color="#151c33" size={20} />
                {carrito && carrito.length > 0 && (
                  <span className="cart-total">
                    ${calcularTotal().toLocaleString("es-CL")}
                  </span>
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;