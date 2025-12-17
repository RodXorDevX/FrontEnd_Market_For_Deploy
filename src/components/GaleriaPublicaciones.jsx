import { useEffect, useState } from "react";
import CardProducto from "./CardProducto";
import MenuCategorias from "./MenuCategorias";
import api from "../api";
import "../assets/css/GaleriaPublicaciones.css";

function GaleriaPublicaciones({ search }) {
  const [productos, setProductos] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState("all");

  // Mapeo simple (sin tilde para evitar problemas)
  const mapCategoriaIdToNombre = {
    1: "hombre",
    2: "mujer",
    3: "accesorios",
    4: "tecnologia"  // <-- sin tilde, como se guarda en el backend
  };

  // Obtener productos al cargar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get('/productos');
        const productosBackend = res.data.data || res.data;

        //console.log("✅ Productos recibidos del backend:", productosBackend);

        setProductos(productosBackend);
      } catch (err) {
        console.error("❌ Error al obtener productos:", err);
      }
    };

    fetchProductos();
  }, []);

  // Normaliza texto (quita tildes, pasa a minúsculas)
  const normalizarTexto = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const productosFiltrados = productos.filter((item) => {
    const titulo = item.titulo || "";
    const categoriaTexto = mapCategoriaIdToNombre[item.categoria_id] || "";

    const matchesSearch = normalizarTexto(titulo).includes(normalizarTexto(search));
    const matchesCategory =
      categoriaActual === "all" ||
      normalizarTexto(categoriaTexto) === normalizarTexto(categoriaActual);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="galeria-container">
      <MenuCategorias onSelectCategory={setCategoriaActual} />
      <div className="galeria-publicaciones">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => {
            //console.log("🖼 Renderizando producto:", item.titulo, item.id);
            return <CardProducto key={item.id} producto={item} />;
          })
        ) : (
          <p className="no-resultados">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}

export default GaleriaPublicaciones;