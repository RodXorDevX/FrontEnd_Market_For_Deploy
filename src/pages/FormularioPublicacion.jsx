import "../assets/css/FormularioPublicacion.css";
import { useState, useEffect } from "react";
import api from "../api";

function FormularioPublicacion() {
  const [imagen, setImagen] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [categorias, setCategorias] = useState([]);

  const [formData, setFormData] = useState({
    titulo: "",
    precio: "",
    categoria: "",
    descripcion: "",
    stock: 1,
  });

  useEffect(() => {
    // Cargar categorías desde la API
    const cargarCategorias = async () => {
      try {
        const response = await api.get('/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        // Si hay error, usar categorías por defecto
        setCategorias([
          { id: 1, nombre: "Electrónica" },
          { id: 2, nombre: "Ropa y Accesorios" },
          { id: 3, nombre: "Hogar y Jardín" },
          { id: 4, nombre: "Deportes" },
          { id: 5, nombre: "Libros" },
          { id: 6, nombre: "Juguetes" },
          { id: 7, nombre: "Salud y Belleza" },
          { id: 8, nombre: "Automotriz" },
          { id: 9, nombre: "Alimentos" },
          { id: 10, nombre: "Otros" }
        ]);
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUrlChange = (e) => {
    setUrlImagen(e.target.value);
  };

  const agregarImagen = () => {
    if (!urlImagen.trim()) return;
    setImagen(urlImagen);
    setUrlImagen("");
  };

  const eliminarImagen = () => {
    setImagen("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   // console.log('Datos del formulario:', formData);
   // console.log('URL de la imagen:', imagen);
  
    const token = localStorage.getItem("token"); 
    const userId = localStorage.getItem("userId"); 
    
    //console.log('Token:', token ? 'Presente' : 'Ausente');
   // console.log('User ID:', userId);
  
    // El formData.categoria ahora contiene el ID directamente de la base de datos
    // No necesitas mapear, usa el valor directamente
  
    const productoFinal = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      categoria_id: parseInt(formData.categoria), // Ahora usa el ID directamente
      stock: parseInt(formData.stock),
      imagen: imagen || null,
      vendedor_id: parseInt(userId),
    };
    
   // console.log('Producto a enviar:', productoFinal);
  
    api
      .post('/productos', productoFinal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setImagen(""); // Limpiar imagen primero
        setFormData({
          titulo: "",
          precio: "",
          categoria: "",
          descripcion: "",
          stock: 1,
        });
        setUrlImagen("");
        alert("¡Publicación creada!");
      })

      .catch((err) => {
        console.error('Error al publicar:', err);
        console.error('Detalles del error:', err.response?.data);
        alert("Error al publicar.");
      });
  };

  return (
    <div className="formulario-publicacion-container">
      <div className="imagenes-publicacion">
        <div className="imagen-y-miniaturas">
          <div className="zona-principal">
            {imagen ? (
              <>
                <img src={imagen} alt="Principal" />
                
              </>
            ) : (
              <div className="texto-overlay">AÑADIR FOTO</div>
            )}
          </div>
        </div>

        <p className="titulo-imagenes">Añadir imagen mediante URL</p>
        <div className="url-input-container">
          <input
            type="url"
            value={urlImagen}
            onChange={handleUrlChange}
            placeholder="Pega aquí la URL de la imagen"
            className="url-input"
          />
          <button onClick={agregarImagen} className="agregar-url-btn">
            Añadir
          </button>
        </div>
        
      </div>

      <div className="formulario-container">
        <h2>FORMULARIO DE PUBLICACIÓN</h2>
        <form onSubmit={handleSubmit}>
          <div className="grupo-input">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Título del producto"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="stock">Cantidad de Productos</label>
            <select
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            >
              {[...Array(55).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="grupo-input">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Selecciona categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="grupo-input">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="boton-publicar">
            PUBLICAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioPublicacion;