import { useState, useEffect } from 'react';
import '../assets/css/MenuCategorias.css';
import api from '../api';

function MenuCategorias({ onSelectCategory }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('all');
  const [categorias, setCategorias] = useState([
    { id: 'all', label: 'Todas' }
  ]);

  useEffect(() => {
    // Cargar categorías desde la API
    const cargarCategorias = async () => {
      try {
        const response = await api.get('/categorias');
        const categoriasBackend = response.data;

        // Formatear categorías para el frontend
        const categoriasFormateadas = [
          { id: 'all', label: 'Todas' },
          ...categoriasBackend.map(cat => ({
            id: cat.id.toString(),
            label: cat.nombre
          }))
        ];

        setCategorias(categoriasFormateadas);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        // Si hay error, mantener categorías por defecto
        setCategorias([
          { id: 'all', label: 'Todas' },
          { id: '1', label: 'Electrónica' },
          { id: '2', label: 'Ropa y Accesorios' },
          { id: '3', label: 'Hogar y Jardín' },
          { id: '4', label: 'Deportes' },
          { id: '5', label: 'Libros' },
          { id: '6', label: 'Juguetes' },
          { id: '7', label: 'Salud y Belleza' },
          { id: '8', label: 'Automotriz' },
          { id: '9', label: 'Alimentos' },
          { id: '10', label: 'Otros' }
        ]);
      }
    };

    cargarCategorias();
  }, []);

  const handleCategoryClick = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId);
    onSelectCategory(categoriaId);
  };

  return (
    <div className="menu-categorias">
      <h3>Categorías</h3>
      <ul>
        {categorias.map(categoria => (
          <li 
            key={categoria.id}
            className={categoria.id === categoriaSeleccionada ? 'active' : ''}
            onClick={() => handleCategoryClick(categoria.id)}
          >
            {categoria.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuCategorias;
