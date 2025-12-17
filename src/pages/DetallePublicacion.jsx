import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import "../assets/css/DetallePublicacion.css";

function DetallePublicacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito, disminuirCantidad, carrito } = useContext(CarritoContext);
  const { usuario } = useContext(AuthContext);

  const mapCategoriaIdToNombre = {
    1: "hombre",
    2: "mujer",
    3: "accesorios",
    4: "tecnologia",
  };

  useEffect(() => {
    api
      .get(`/productos/${id}`)
      .then((res) => {
        const productoData = res.data.data || res.data;
        setProducto(productoData);

        const imagePath = productoData.image || productoData.imagen;
        if (imagePath) {
          setImagenPrincipal(imagePath);
        } else {
          console.error("No se encontró una imagen para el producto");
        }
      })
      .catch((err) => {
        console.error("Error al obtener producto", err);
      });
  }, [id]);

  useEffect(() => {
    if (!producto) return;
    const cantidadTotal = carrito
      .filter((item) => item.id === producto.id)
      .reduce((sum, item) => sum + item.cantidad, 0);
    setCantidad(cantidadTotal > 0 ? cantidadTotal : 0);
  }, [producto, carrito]);

  if (!producto) return <p>Cargando producto...</p>;

  const titulo = producto.title || producto.titulo || "Sin título";
  const precio = producto.price || producto.precio || 0;
  const categoria =
    producto.category ||
    mapCategoriaIdToNombre[producto.categoria_id] ||
    "Sin categoría";
  const descripcion = producto.description || producto.descripcion || "Sin descripción";
  const stock = producto.stock || 0;

  return (
    <div className="detalle-container">
      <div className="detalle-imagenes">
        <div className="imagen-principal">
          {imagenPrincipal ? (
            <img src={imagenPrincipal} alt={titulo} />
          ) : (
            <div className="no-imagen">Imagen no disponible</div>
          )}
        </div>
      </div>

      <div className="detalle-info">
        <h2 className="detalle-titulo">{titulo}</h2>
        <p className="detalle-precio">${Number(precio).toLocaleString("es-CL")}</p>

        <div className="detalle-descripcion">
          <p>
            <strong>Tipo de Producto:</strong> {categoria}
          </p>
          <p>
            <strong>Descripción:</strong> {descripcion}
          </p>
          <p>
            <strong>Stock:</strong> {stock}
          </p>
        </div>

        <div className="detalle-cantidad">
          <p>
            <strong>Cantidad:</strong>
          </p>
          <div className="cantidad-control">
            <button
              onClick={() => {
                if (!usuario) {
                  alert("Ingresa con tu cuenta para poder ver tu carrito");
                  navigate("/login");
                  return;
                }
                disminuirCantidad(producto.id);
              }}
              disabled={cantidad === 0}
            >
              -
            </button>

            <span>{cantidad}</span>

            <button
              onClick={() => {
                if (!usuario) {
                  alert("Ingresa con tu cuenta para poder ver tu carrito");
                  navigate("/login");
                  return;
                }
                agregarAlCarrito({
                  ...producto,
                  vendedor_id: producto.usuario_id || producto.vendedor_id,
                });
              }}
              disabled={cantidad >= stock}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePublicacion;
