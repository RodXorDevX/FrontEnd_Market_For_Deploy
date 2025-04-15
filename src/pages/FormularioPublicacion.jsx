import "../assets/css/FormularioPublicacion.css";
import axios from "axios";
import { useState } from "react";
import { API_BACKEND_URL } from "../config";

function FormularioPublicacion() {
  const [imagenes, setImagenes] = useState([]);
  const [urlImagen, setUrlImagen] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    precio: "",
    categoria: "",
    descripcion: "",
    stock: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUrlChange = (e) => {
    setUrlImagen(e.target.value);
  };

  const agregarImagen = () => {
    if (!urlImagen.trim()) return;
    if (imagenes.length >= 4) return alert("Solo puedes subir hasta 4 imágenes");
    setImagenes((prev) => [...prev, urlImagen.trim()]);
    setUrlImagen("");
  };

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const mapCategoria = {
      hombre: 1,
      mujer: 2,
      accesorios: 3,
      tecnologia: 4,
    };

    const productoFinal = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      categoria_id: mapCategoria[formData.categoria],
      stock: parseInt(formData.stock),
      imagen: imagenes[0] || null,
      vendedor_id: parseInt(userId),
    };

    axios
      .post(`${API_BACKEND_URL}/productos`, productoFinal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("¡Publicación creada!");
        setFormData({
          titulo: "",
          precio: "",
          categoria: "",
          descripcion: "",
          stock: 1,
        });
        setImagenes([]);
        setUrlImagen("");
      })
      .catch((err) => {
        alert("Error al publicar.");
      });
  };

  return (
    <div className="formulario-publicacion-container">
      <div className="imagenes-publicacion">
        <div className="imagen-y-miniaturas">
          <div className="zona-principal">
            {imagenes[0] ? (
              <img src={imagenes[0]} alt="Principal" />
            ) : (
              <div className="texto-overlay">AÑADIR FOTO</div>
            )}
          </div>

          <div className="miniaturas">
            {imagenes.slice(1).map((img, index) => (
              <div key={index} className="miniatura-wrapper">
                <img src={img} alt={`Mini ${index + 1}`} className="miniatura" />
                <button onClick={() => eliminarImagen(index + 1)} className="boton-eliminar-miniatura">×</button>
              </div>
            ))}
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
        <p className="texto-info">Añade hasta 4 imágenes usando URL</p>
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
              <option value="hombre">Ropa de Hombre</option>
              <option value="mujer">Ropa de Mujer</option>
              <option value="accesorios">Accesorios</option>
              <option value="tecnologia">Tecnología</option>
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

