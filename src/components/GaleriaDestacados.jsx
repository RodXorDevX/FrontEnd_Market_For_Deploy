/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import CardProducto from "./CardProducto";
import '../assets/css/GaleriaDestacados.css';

function GaleriaDestacados({ search }) {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Usar el endpoint de productos destacados con límite
        const response = await api.get('/productos?limit=8');
        const productos = response.data.data || response.data;

        // console.log("Productos recibidos:", productos);

        // Filtrar productos por búsqueda
        const productosFiltrados = productos.filter(producto =>
          producto.titulo && producto.titulo.toLowerCase().includes(search ? search.toLowerCase() : '')
        );

        // Tomar 4 productos aleatorios de los filtrados
        const productosAleatorios = productosFiltrados
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setProductosDestacados(productosAleatorios);
      } catch (error) {
        console.error("Error al obtener productos destacados", error);
        // Fallback: intentar sin límite por si el backend no lo soporta
        try {
          const fallbackResponse = await api.get('/productos');
          const productos = fallbackResponse.data.data || fallbackResponse.data;
          const productosAleatorios = productos
            .filter(producto => producto.titulo && producto.titulo.toLowerCase().includes(search ? search.toLowerCase() : ''))
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setProductosDestacados(productosAleatorios);
        } catch (fallbackError) {
          console.error("Error incluso en fallback:", fallbackError);
        }
      }
    };

    fetchProductos();
  }, [search]);

  return (
    <div className="galeria-destacados">
      {productosDestacados.map((producto) => (
        <CardProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default GaleriaDestacados;