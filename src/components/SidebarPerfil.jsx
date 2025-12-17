import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/img/default-avatar.webp';
import avatar1 from '../assets/img/Register/icon1.png';
import avatar2 from '../assets/img/Register/icon2.png';
import avatar3 from '../assets/img/Register/icon3.png';
import avatar4 from '../assets/img/Register/icon4.png';
import avatar5 from '../assets/img/Register/icon5.png';
import avatar6 from '../assets/img/Register/icon6.png';
import avatar7 from '../assets/img/Register/avatar7.svg'; // Oso
import avatar8 from '../assets/img/Register/avatar8.svg'; // Ave
import avatar9 from '../assets/img/Register/avatar9.svg'; // Delfín
import avatar10 from '../assets/img/Register/avatar10.svg'; // Conejo
import '../assets/css/SidebarPerfil.css';

// Mapeo de nombres a imágenes
const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10
};

function SidebarPerfil() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="profile-pic">
          <img
            src={avatarMap[usuario?.usuario?.avatar] || defaultAvatar}
            alt="Avatar"
            className="avatar-img"
          />
        </div>
        <h3>{usuario?.usuario?.nombre || "USUARIO"}</h3>
      </div>

      <nav className="menu">
        <button 
          className={`menu-item ${isActive('/perfil') ? 'active' : ''}`}
          onClick={() => navigate('/perfil')}
        >
          <FaUser />
          <span>Publicaciones</span>
        </button>
        <button 
          className={`menu-item ${isActive('/carrito') ? 'active' : ''}`}
          onClick={() => navigate('/carrito')}
        >
          <FaShoppingCart />
          <span>Mi Carrito</span>
        </button>
        <button 
          className={`menu-item ${isActive('/pedidos') ? 'active' : ''}`}
          onClick={() => navigate('/pedidos')}
        >
          <FaClipboardList />
          <span>Mis Pedidos</span>
        </button>
        <button 
          className={`menu-item ${isActive('/compras') ? 'active' : ''}`}
          onClick={() => navigate('/compras')}
        >
          <FaClipboardList />
          <span>Mis Compras</span>
        </button>
      </nav>
    </div>
  );
}

export default SidebarPerfil;
