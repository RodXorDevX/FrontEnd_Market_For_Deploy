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
      // Primero verificar si hay pedidos pendientes para este producto
      const pedidosRes = await axios.get(`${API_BACKEND_URL}/pedidos?productoId=${publicacion.id}&estado=pending`);
      
      if (pedidosRes.data.length > 0) {
        alert("No se puede eliminar el producto porque tiene pedidos pendientes");
        return;
      }
      
      const res = await axios.delete(`${API_BACKEND_URL}/productos/${publicacion.id}`);
      alert("Publicación eliminada con éxito");
      window.location.reload(); // Recargar para actualizar la lista
    } catch (err) {
      setError("Error al eliminar la publicación");
      console.error(err);
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