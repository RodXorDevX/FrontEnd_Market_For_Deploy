import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import SidebarPerfil from "../components/SidebarPerfil";
import "../assets/css/Carrito.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { API_BACKEND_URL } from "../config";

function Carrito({}) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    carrito,
    calcularTotal,
    vaciarCarrito,
    agregarAlCarrito,
    disminuirCantidad,
  } = useContext(CarritoContext);
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const handlePagar = async () => {
    setIsProcessing(true);
    try {
      // First update stock for all products
      await Promise.all(
        carrito.map(async (item) => {
          await axios.put(`${API_BACKEND_URL}/productos/${item.id}`, {
            ...item,
            stock: (item.stock || item.cantidad_disponible) - item.cantidad,
          });
        })
      );

      // Then create the order
      const response = await fetch(`${API_BACKEND_URL}/pedidos/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuario?.usuario?.id,
          carrito: carrito.map((item) => ({
            producto_id: item.id,
            cantidad: item.cantidad,
            precio: item.precio,
            vendedor_id: item.vendedor_id,
          })),
        }),
      });

      if (!response.ok) throw new Error("Error al crear el pedido");
      const data = await response.json();
      // console.log(data);

      setShowSuccessMessage(true);
      vaciarCarrito();

      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsProcessing(false);
        navigate("/resumen-compra", {
          state: { carrito, total: calcularTotal() },
        });
      }, 3000);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar tu pedido");
      setIsProcessing(false);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      '@media (max-width: 768px)': {
        padding: '10px'
      }
    },
    item: {
      display: 'flex',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        marginBottom: '15px'
      }
    },
    button: {
      padding: '12px 24px',
      '@media (max-width: 768px)': {
        padding: '15px',
        fontSize: '16px',
        width: '100%'
      }
    },
    resumen: {
      padding: '20px',
      border: '1px solid #eee',
      borderRadius: '8px',
      marginTop: '20px',
      '@media (max-width: 768px)': {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#fff',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        padding: '15px',
        marginTop: '0',
        zIndex: '100'
      }
    },
    resumenItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      '@media (max-width: 768px)': {
        fontSize: '14px'
      }
    }
  };

  return (
    <div style={styles.container}>
      <SidebarPerfil />
      <main className="carrito-main">
        <div className="carrito-productos">
          <h2>CARRITO DE COMPRAS</h2>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="carrito-item" style={styles.item}>
                <img
                  src={item.image || item.imagen}
                  alt={item.title || item.titulo}
                />
                <div className="carrito-item-info">
                  <h4>{item.title || item.titulo}</h4>
                  <p>
                    TALLA {item.talla || "S"} - {item.color || "BLANCO"}
                  </p>
                </div>
                <div className="carrito-cantidad">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() => agregarAlCarrito(item)}
                    disabled={
                      item.cantidad >=
                      (item.stock || item.cantidad_disponible || Infinity)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="carrito-precio">
                  ${Number(item.precio).toLocaleString("es-CL")}
                </p>
              </div>
            ))
          )}
        </div>
        <div style={styles.resumen}>
          <h3>Resumen del Pedido</h3>
          <div style={styles.resumenItem}>
            <span>Productos:</span>
            <span>{carrito.length}</span>
          </div>
          <div style={styles.resumenItem}>
            <span>Envío:</span>
            <span>$0</span>
          </div>
          <div style={styles.resumenItem}>
            <strong>Total:</strong>
            <strong>${calcularTotal().toLocaleString("es-CL")}</strong>
          </div>
          <button 
            onClick={handlePagar} 
            style={styles.button}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Pagar'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Carrito;
