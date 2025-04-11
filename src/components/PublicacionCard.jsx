import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/css/PublicacionCard.css";
import defaultImage from "../assets/img/Default_Product.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BACKEND_URL } from "../config";

function PublicacionCard({ publicacion }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validar las propiedades de 'publicacion'
    if (!publicacion || !publicacion.id || !publicacion.titulo) {
      setError("Publicación inválida");
    } else {
      setError(null); // Resetea el error si es válido
    }
  }, [publicacion]);

  const handleDelete = async () => {
    try {
      // First check if product has pending orders
      let hasPendingOrders = false;
      try {
        const ordersRes = await axios.get(`${API_BACKEND_URL}/productos/${publicacion.id}/pedidos`);
        hasPendingOrders = ordersRes.data?.length > 0;
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error('Error checking pending orders:', err);
        }
      }
      
      // Check if product exists in MisPedidos
      const misPedidosRes = await axios.get(`${API_BACKEND_URL}/pedidos/producto/${publicacion.id}`);
      
      if (hasPendingOrders || misPedidosRes.data.length > 0) {
        alert('No se puede eliminar el producto porque tiene pedidos pendientes o está en Mis Pedidos');
        return;
      }

      if (!window.confirm('¿Estás seguro de querer eliminar este producto?')) return;
      
      const res = await axios.delete(`${API_BACKEND_URL}/productos/${publicacion.id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (res.status === 200) {
        alert("Publicación eliminada con éxito");
        window.location.reload(); // Refresh to update the UI
      }
    } catch (err) {
      console.error('Full error details:', err.response || err);
      setError(`Error al eliminar: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="publicacion-card">
      <img
        src={publicacion.imagen || defaultImage}
        alt={publicacion.titulo}
        onError={(e) => { e.target.src = defaultImage }}
      />
      <div className="card-content">
        <h3>{publicacion.titulo}</h3>
        <p className="precio">${(Math.floor(publicacion.precio) || 10000).toLocaleString()}</p>
        <p className="stock">Stock disponible: {publicacion.stock || 0}</p>
        <div className="card-actions">
          <Link to={`/publicacion/${publicacion.id}`} className="ver-btn">VER</Link>
          <div className="icon-buttons">
            <Link to={`/productos/${publicacion.id}/editar`} className="edit-btn">
              <FaEdit />
            </Link>
            <button className="delete-btn" onClick={handleDelete}><FaTrash /></button>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default PublicacionCard;