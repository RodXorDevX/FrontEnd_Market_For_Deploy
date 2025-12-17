import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/img/default-avatar.webp';
import avatar1 from '../assets/img/avatares/perro.png';
import avatar2 from '../assets/img/avatares/gatito.png';
import avatar3 from '../assets/img/avatares/panda.png';
import avatar4 from '../assets/img/avatares/leon.png';
import avatar5 from '../assets/img/avatares/elefante.png';
import avatar6 from '../assets/img/avatares/caballo.png';
import avatar7 from '../assets/img/avatares/tucan.png';
import avatar8 from '../assets/img/avatares/pato.png';
import avatar9 from '../assets/img/avatares/delfin.png';
import avatar10 from '../assets/img/avatares/pinguino.png';
import avatar11 from '../assets/img/avatares/tortuga.png';
import avatar12 from '../assets/img/avatares/unicornio.png';
import avatar13 from '../assets/img/avatares/rata.png';
import avatar14 from '../assets/img/avatares/rana.png';
import avatar15 from '../assets/img/avatares/mono.png';
import avatar16 from '../assets/img/avatares/anaconda.png';
import avatar17 from '../assets/img/avatares/medusa.png';
import avatar18 from '../assets/img/avatares/erizo.png';
import avatar19 from '../assets/img/avatares/abeja.png';
import avatar20 from '../assets/img/avatares/pajaro.png';
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
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20
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
