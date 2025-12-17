import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import api from "../api";
import "../assets/css/CardProducto.css";
import { AuthContext } from "../context/AuthContext"; // <- se agrega sin romper

function CardProducto({ producto }) {
  const { agregarAlCarrito, disminuirCantidad, carrito } =
    useContext(CarritoContext);
  const { usuario } = useContext(AuthContext); // <- solo se usa esto
  const navigate = useNavigate();
  const [calificacion, setCalificacion] = useState(0);

  useEffect(() => {
    // Usar la calificación del producto si ya existe, sino hacer petición
    if (producto?.calificacion) {
      setCalificacion(parseFloat(producto.calificacion));
    } else if (producto?.id) {
      const fetchCalificacion = async () => {
        try {
          const response = await api.get(`/productos/${producto.id}`);
          setCalificacion(response.data.calificacion || 0);
        } catch (error) {
          console.error("Error obteniendo calificación:", error);
          setCalificacion(0); // Default a 0 si hay error
        }
      };

      fetchCalificacion();
    }
  }, [producto.id, producto.calificacion]);

  if (!producto?.id) return null;

  const { id, titulo, precio, imagen } = producto;
  const cantidad = carrito.find((p) => p.id === id)?.cantidad || 0;

  const renderEstrellas = () => {
    return [1, 2, 3, 4, 5].map((estrella) => (
      <span
        key={estrella}
        className={`estrella ${estrella <= calificacion ? "llena" : "vacia"}`}
      >
        {estrella <= calificacion ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <div className="producto">
      <div className="imagen-container">
        <img src={imagen || "https://via.placeholder.com/150"} alt={titulo} />
      </div>

      <div className="rating-container">{renderEstrellas()}</div>

      <h4>{titulo}</h4>

      <div className="acciones">
        <p>${Number(precio).toLocaleString("es-CL")}</p>
        <button
          className="detalle-button"
          onClick={() => navigate(`/publicacion/${id}`)}
        >
          Ver detalle
        </button>
        <div className="control-cantidad">
          <button
            onClick={() => {
              if (!usuario) {
                alert("Ingresa con tu cuenta para poder ver tu carrito");
                return;
              }
              disminuirCantidad(id);
            }}
            disabled={cantidad === 0}
          >
            Quitar
          </button>
          <span>{cantidad}</span>
          <button
            onClick={() => {
              if (!usuario) {
                alert("Ingresa con tu cuenta para poder ver tu carrito");
                return;
              }
              agregarAlCarrito({
                ...producto,
                vendedor_id: producto.usuario_id || producto.vendedor_id,
              });
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;
