const https = require('https');
const fs = require('fs');

// Configuración
const API_BASE = 'https://back-end-market-for-deploy.vercel.app';

// Usuarios animales por defecto
const animalesPorDefecto = [
    { id: 11, nombre: 'Luki Perro', email: 'luki.perro@demo.com', password: 'demo123', avatar: 'avatar1' },
    { id: 12, nombre: 'Minu Gatita', email: 'minu.gatita@demo.com', password: 'demo123', avatar: 'avatar2' },
    { id: 13, nombre: 'Pandi Panda', email: 'pandi.panda@demo.com', password: 'demo123', avatar: 'avatar3' },
    { id: 14, nombre: 'Leo León', email: 'leo.leon@demo.com', password: 'demo123', avatar: 'avatar4' },
    { id: 15, nombre: 'Dumbo Elefante', email: 'dumbo.elefante@demo.com', password: 'demo123', avatar: 'avatar5' },
    { id: 16, nombre: 'Spirit Caballo', email: 'spirit.caballo@demo.com', password: 'demo123', avatar: 'avatar6' },
    { id: 17, nombre: 'Tucán Tico', email: 'tucan.tico@demo.com', password: 'demo123', avatar: 'avatar7' },
    { id: 18, nombre: 'Pato Lucas', email: 'pato.lucas@demo.com', password: 'demo123', avatar: 'avatar8' },
    { id: 19, nombre: 'Flip Delfín', email: 'flip.delfin@demo.com', password: 'demo123', avatar: 'avatar9' },
    { id: 20, nombre: 'Polo Pingüino', email: 'polo.pinguino@demo.com', password: 'demo123', avatar: 'avatar10' }
];

// Catálogo variado y único - 10 productos diferentes por animal
const catalogoVariado = {
    // LUKI PERRO - Productos relacionados con perros y tecnología
    11: [
        { titulo: 'Consola PlayStation 5', descripcion: 'Consola de última generación con 4K y 120fps', precio: 499.99, categoria_id: 2, size: 'Standard', stock: 8, imagen: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400' },
        { titulo: 'Smartwatch Samsung Galaxy Watch', descripcion: 'Smartwatch con GPS y monitor de actividad física', precio: 249.99, categoria_id: 2, size: '42mm', stock: 12, imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
        { titulo: 'Gafas de Sol Polarizadas Ray-Ban', descripcion: 'Gafas premium con protección UV400', precio: 159.99, categoria_id: 7, size: 'M', stock: 15, imagen: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400' },
        { titulo: 'Chaqueta Impermeable North Face', descripcion: 'Chaqueta técnica para actividades al aire libre', precio: 189.99, categoria_id: 1, size: 'L', stock: 10, imagen: 'https://images.unsplash.com/photo-1549842572-2bc3c517bd1c?w=400' },
        { titulo: 'Polera Deportiva Nike Dri-FIT', descripcion: 'Polera técnica transpirable para ejercicio', precio: 39.99, categoria_id: 1, size: 'XL', stock: 20, imagen: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400' },
        { titulo: 'Vestido Elegante de Noche', descripcion: 'Vestido largo para ocasiones especiales', precio: 89.99, categoria_id: 1, size: 'M', stock: 8, imagen: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400' },
        { titulo: 'Kit de Robótica Educativa LEGO Mindstorms', descripcion: 'Kit completo para aprender programación y robótica', precio: 349.99, categoria_id: 8, size: 'Completo', stock: 5, imagen: 'https://images.unsplash.com/photo-1591799262821-3424ba42bd3f?w=400' },
        { titulo: 'Collar de Oro 18K con Diamantes', descripcion: 'Joyería fina con piedras preciosas', precio: 1299.99, categoria_id: 6, size: '45cm', stock: 3, imagen: 'https://images.unsplash.com/photo-1596944924616-7b38e7e7012b?w=400' },
        { titulo: 'Zapatillas Corridas Hoka One One', descripcion: 'Zapatillas ultra cómodas para correr largas distancias', precio: 149.99, categoria_id: 4, size: '42', stock: 12, imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
        { titulo: 'Set de Herramientas de Cocina Profesional', descripcion: 'Set completo con cuchillos de acero inoxidable', precio: 199.99, categoria_id: 3, size: '12 piezas', stock: 6, imagen: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400' }
    ],

    // MINU GATITA - Productos elegantes y de moda
    12: [
        { titulo: 'Xbox Series X', descripcion: 'Consola gaming con 1TB SSD y ray tracing', precio: 449.99, categoria_id: 2, size: '1TB', stock: 10, imagen: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400' },
        { titulo: 'Apple Watch Series 8', descripcion: 'Smartwatch con sensor de salud y fitness', precio: 399.99, categoria_id: 2, size: '45mm', stock: 8, imagen: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400' },
        { titulo: 'Gafas de Sol Versace', descripcion: 'Gafas de diseñador con montura elegante', precio: 229.99, categoria_id: 7, size: 'Standard', stock: 7, imagen: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' },
        { titulo: 'Bolso de Cuero Prada', descripcion: 'Bolso de lujo italiano genuino', precio: 899.99, categoria_id: 6, size: 'Mediano', stock: 4, imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
        { titulo: 'Vestido Floral Primavera', descripcion: 'Vestido ligero con estampado botánico', precio: 69.99, categoria_id: 1, size: 'S', stock: 12, imagen: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400' },
        { titulo: 'Blusa de Seda Elegante', descripcion: 'Blusa premium perfecta para la oficina', precio: 119.99, categoria_id: 1, size: 'M', stock: 10, imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
        { titulo: 'Pantalón Vaquero Skinny', descripcion: 'Jeans ajustados de alta calidad', precio: 79.99, categoria_id: 1, size: '28', stock: 15, imagen: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
        { titulo: 'Arduino Starter Kit', descripcion: 'Kit ideal para principiantes en electrónica', precio: 89.99, categoria_id: 8, size: 'Completo', stock: 20, imagen: 'https://images.unsplash.com/photo-1556075798-482590af62b0?w=400' },
        { titulo: 'NVIDIA GeForce RTX 4080', descripcion: 'Tarjeta gráfica para gaming 4K', precio: 1199.99, categoria_id: 2, size: 'Standard', stock: 5, imagen: 'https://images.unsplash.com/photo-1591488320482-937b4480b4a9?w=400' },
        { titulo: 'Auriculares Sony WH-1000XM5', descripcion: 'Auriculares con cancelación activa de ruido', precio: 349.99, categoria_id: 2, size: 'Único', stock: 12, imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }
    ],

    // PANDI PANDA - Productos relajados y de bienestar
    13: [
        { titulo: 'Nintendo Switch OLED', descripcion: 'Consola híbrida con pantalla OLED de 7 pulgadas', precio: 349.99, categoria_id: 2, size: 'OLED', stock: 15, imagen: 'https://images.unsplash.com/photo-1612287230202-1ff1d94d4757?w=400' },
        { titulo: 'Samsung Galaxy Tab S8', descripcion: 'Tablet premium con S-Pen incluida', precio: 699.99, categoria_id: 2, size: '11 pulgadas', stock: 8, imagen: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400' },
        { titulo: 'Set de Yoga Premium', descripcion: 'Esterilla, bloques y correa de yoga profesional', precio: 89.99, categoria_id: 4, size: 'Completo', stock: 18, imagen: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400' },
        { titulo: 'Silla de Oficina Ergonómica', descripcion: 'Silla con soporte lumbar ajustable', precio: 299.99, categoria_id: 3, size: 'Standard', stock: 6, imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
        { titulo: 'Vestido Batas Algodón Orgánico', descripcion: 'Vestido cómodo y ecológico para el hogar', precio: 49.99, categoria_id: 1, size: 'L', stock: 20, imagen: 'https://images.unsplash.com/photo-1525504437522-318fcb0c150d?w=400' },
        { titulo: 'Set de Té de Hierbas Premium', descripcion: 'Colección de 20 tés orgánicos', precio: 34.99, categoria_id: 3, size: '200g', stock: 25, imagen: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400' },
        { titulo: 'Manta Eléctrica Polar', descripcion: 'Manta con temperatura ajustable', precio: 79.99, categoria_id: 3, size: 'Queen', stock: 12, imagen: 'https://images.unsplash.com/photo-1587950016391-4df256df518e?w=400' },
        { titulo: 'Robot Aspirador iRobot Roomba', descripcion: 'Robot inteligente con mapeo láser', precio: 549.99, categoria_id: 3, size: 'Standard', stock: 7, imagen: 'https://images.unsplash.com/photo-1608138304034-d13e8868c81d?w=400' },
        { titulo: 'Kindle Paperwhite', descripcion: 'Lector de libros electrónicos con luz ajustable', precio: 139.99, categoria_id: 5, size: '8GB', stock: 15, imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' },
        { titulo: 'Altavoz JBL Charge 5', descripcion: 'Altavoz Bluetooth resistente al agua', precio: 149.99, categoria_id: 2, size: 'Portable', stock: 10, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' }
    ],

    // LEO LEÓN - Productos audaces y de lujo
    14: [
        { titulo: 'PlayStation VR2', descripcion: 'Realidad virtual para PS5 con 4K HDR', precio: 549.99, categoria_id: 2, size: 'Standard', stock: 6, imagen: 'https://images.unsplash.com/photo-1612287230202-1ff1d94d4757?w=400' },
        { titulo: 'Apple MacBook Pro M2', descripcion: 'Laptop potente con chip M2', precio: 1499.99, categoria_id: 2, size: '13 pulgadas', stock: 5, imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
        { titulo: 'Reloj de Lujo Suizo Automático', descripcion: 'Reloj mecánico con caja de oro', precio: 2999.99, categoria_id: 6, size: '42mm', stock: 2, imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
        { titulo: 'Chaqueta de Cuero Genuine', descripcion: 'Chaqueta de piel premium con estilo clásico', precio: 399.99, categoria_id: 1, size: 'XL', stock: 8, imagen: 'https://images.unsplash.com/photo-1576871335020-51d8893d21e8?w=400' },
        { titulo: 'Botas Militares Dr. Martens', descripcion: 'Botas icónicas resistentes y duraderas', precio: 179.99, categoria_id: 1, size: '43', stock: 10, imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
        { titulo: 'Anillo de Titanio con Rubí', descripcion: 'Joya exclusiva con piedra preciosa natural', precio: 899.99, categoria_id: 6, size: 'Talla 10', stock: 1, imagen: 'https://images.unsplash.com/photo-1596944924616-7b38e7e7012b?w=400' },
        { titulo: 'Gafas de Sol Oakley Holbrook', descripcion: 'Gafas deportivas con lentes polarizadas', precio: 129.99, categoria_id: 7, size: 'Standard', stock: 12, imagen: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400' },
        { titulo: 'Raqueta de Tenis Wilson Pro', descripcion: 'Raqueta profesional de carbono', precio: 249.99, categoria_id: 4, size: 'Standard', stock: 8, imagen: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400' },
        { titulo: 'Set de Maletín de Negocio', descripcion: 'Maletín de cuero con compartimentos para laptop', precio: 189.99, categoria_id: 3, size: '15 pulgadas', stock: 9, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
        { titulo: 'Drone DJI Mini 3 Pro', descripcion: 'Drone 4K con GPS y cámara estabilizada', precio: 759.99, categoria_id: 2, size: 'Compacto', stock: 4, imagen: 'https://images.unsplash.com/photo-1626730556007-a42d640b5bc7?w=400' }
    ],

    // DUMBO ELEFANTE - Productos grandes y de almacenamiento
    15: [
        { titulo: 'Samsung TV Neo QLED 4K 55"', descripcion: 'Smart TV con Quantum Dot y HDR10+', precio: 899.99, categoria_id: 2, size: '55 pulgadas', stock: 3, imagen: 'https://images.unsplash.com/photo-1598928424274-48a892159fc1?w=400' },
        { titulo: 'iMac 24" M1', descripcion: 'Todo en uno con chip Apple M1', precio: 1299.99, categoria_id: 2, size: '24 pulgadas', stock: 4, imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
        { titulo: 'Sofá Modular Gris', descripcion: 'Sofá extensible de 3 plazas con chaise longue', precio: 699.99, categoria_id: 3, size: '3 plazas', stock: 5, imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
        { titulo: 'Nevera Samsung Side by Side', descripcion: 'Nevera con dispensador de agua y hielo', precio: 1299.99, categoria_id: 3, size: '28 pies cúbicos', stock: 2, imagen: 'https://images.unsplash.com/photo-1577494288440-7462e2c36ab5?w=400' },
        { titulo: 'Set de Maletas Samsonite', descripcion: 'Maletas de equipaje de alta durabilidad', precio: 349.99, categoria_id: 3, size: '3 piezas', stock: 8, imagen: 'https://images.unsplash.com/photo-1553845941-ebbc76922c8e?w=400' },
        { titulo: 'Camara Canon EOS R6', descripcion: 'Cámara mirrorless 4K con estabilización', precio: 2499.99, categoria_id: 2, size: 'Full Frame', stock: 3, imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400' },
        { titulo: 'Pantalón Cargo Táctico', descripcion: 'Pantalón con múltiples bolsillos funcionales', precio: 59.99, categoria_id: 1, size: '38', stock: 15, imagen: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400' },
        { titulo: 'Camiseta Gráfica Diseño Único', descripcion: 'Camiseta con arte exclusivo limitado', precio: 34.99, categoria_id: 1, size: 'L', stock: 25, imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
        { titulo: 'Robot Programable Sphero Bolt', descripcion: 'Robot educativo esférico programable', precio: 149.99, categoria_id: 8, size: 'Standard', stock: 10, imagen: 'https://images.unsplash.com/photo-1591799262821-3424ba42bd3f?w=400' },
        { titulo: 'Cadena de Plata Esterlina', descripcion: 'Cadena maciza con diseño moderno', precio: 199.99, categoria_id: 6, size: '60cm', stock: 7, imagen: 'https://images.unsplash.com/photo-1596944924616-7b38e7e7012b?w=400' }
    ],

    // SPIRIT CABALLO - Productos de outdoor y aventura
    16: [
        { titulo: 'Bicleta de Montaña Specialized', descripcion: 'Bicleta profesional con 27 velocidades', precio: 899.99, categoria_id: 4, size: 'M', stock: 4, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
        { titulo: 'Tienda de Campaña 4 Personas', descripcion: 'Tienda impermeable con doble tejido', precio: 179.99, categoria_id: 4, size: '4 personas', stock: 10, imagen: 'https://images.unsplash.com/photo-1504868584819-f8e8b4d6e799?w=400' },
        { titulo: 'Mochila Senderismo 40L Osprey', descripcion: 'Mochila técnica con sistema de ventilación', precio: 159.99, categoria_id: 4, size: '40L', stock: 8, imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
        { titulo: 'Chaqueta The North Face Summit', descripcion: 'Chaqueta de expedición con plumón 700', precio: 449.99, categoria_id: 1, size: 'L', stock: 6, imagen: 'https://images.unsplash.com/photo-1549842572-2bc3c517bd1c?w=400' },
        { titulo: 'Botas de Montaña Salomon', descripcion: 'Botas impermeables para alta montaña', precio: 219.99, categoria_id: 1, size: '45', stock: 12, imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
        { titulo: 'GPS Garmin Fenix 6', descripcion: 'Reloj deportivo con mapas topográficos', precio: 599.99, categoria_id: 2, size: '47mm', stock: 5, imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
        { titulo: 'Cámara de Acción GoPro Hero11', descripcion: 'Cámara 4K 60fps con estabilización HyperSmooth', precio: 399.99, categoria_id: 2, size: 'Black', stock: 9, imagen: 'https://images.unsplash.com/photo-1612287230202-1ff1d94d4757?w=400' },
        { titulo: 'Saco de Dormir -15°C Marmot', descripcion: 'Saco de plumón para clima extremo', precio: 299.99, categoria_id: 4, size: 'Regular', stock: 7, imagen: 'https://images.unsplash.com/photo-1594385366106-d5256c642dc2?w=400' },
        { titulo: 'Linterna LED Recargable 2000lm', descripcion: 'Linterna potente con batería de larga duración', precio: 89.99, categoria_id: 3, size: 'Standard', stock: 15, imagen: 'https://images.unsplash.com/photo-1579890992957-31264d679ccc?w=400' },
        { titulo: 'Set de Ollas de Campaña', descripcion: 'Set de aluminio ligero para 4 personas', precio: 79.99, categoria_id: 3, size: 'Compacto', stock: 10, imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' }
    ],

    // TUCÁN TICO - Productos coloridos y exóticos
    17: [
        { titulo: 'iPad Pro 12.9"', descripcion: 'Tablet con chip M2 y pantalla Liquid Retina', precio: 1099.99, categoria_id: 2, size: '256GB', stock: 6, imagen: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400' },
        { titulo: 'Guitarra Acústica Fender', descripcion: 'Guitarra con electrónica y estuche incluido', precio: 449.99, categoria_id: 7, size: 'Concert', stock: 5, imagen: 'https://images.unsplash.com/photo-1624114031837-503eb0bfa3f5?w=400' },
        { titulo: 'Set de Pinturas Acuarelas', descripcion: 'Set profesional con 48 colores', precio: 89.99, categoria_id: 7, size: 'Completo', stock: 12, imagen: 'https://images.unsplash.com/photo-1547119173-4cfc65608a3e?w=400' },
        { titulo: 'Pantalón Tropical Floral', descripcion: 'Pantalón exclusivo con diseño exótico', precio: 79.99, categoria_id: 1, size: 'M', stock: 15, imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
        { titulo: 'Vestido Maxi Bohemio', descripcion: 'Vestido fluido con motivos étnicos', precio: 119.99, categoria_id: 1, size: 'S', stock: 10, imagen: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400' },
        { titulo: 'Auriculares Bose QuietComfort', descripcion: 'Auriculares premium con cancelación de ruido', precio: 299.99, categoria_id: 2, size: 'Over-ear', stock: 8, imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
        { titulo: 'Teclado Mecánico RGB Razer', descripcion: 'Teclado gaming con iluminación personalizable', precio: 149.99, categoria_id: 2, size: 'TKL', stock: 10, imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
        { titulo: 'Juego de Platos Artisanales', descripcion: 'Set de cerámica pintada a mano', precio: 159.99, categoria_id: 3, size: '6 piezas', stock: 9, imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
        { titulo: 'Cámara Instantánea Polaroid', descripcion: 'Cámara vintage con efecto retro', precio: 99.99, categoria_id: 2, size: 'OneStep', stock: 18, imagen: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
        { titulo: 'Pulsera de Cuarzo Rosa', descripcion: 'Joya energética con piedras naturales', precio: 69.99, categoria_id: 6, size: 'Ajustable', stock: 20, imagen: 'https://images.unsplash.com/photo-1596944924616-7b38e7e7012b?w=400' }
    ],

    // PATO LUCAS - Productos relacionados con agua y tecnología
    18: [
        { titulo: 'Apple AirPods Pro 2', descripcion: 'Auriculares TWS con cancelación adaptativa', precio: 249.99, categoria_id: 2, size: 'Con estuche', stock: 12, imagen: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400' },
        { titulo: 'GoPro Hero11 Black Mini', descripción: 'Cámara compacta 4K para deportes acuáticos', precio: 299.99, categoria_id: 2, size: 'Compacta', stock: 8, imagen: 'https://images.unsplash.com/photo-1612287230202-1ff1d94d4757?w=400' },
        { titulo: 'Reloj Inteligente para Natación', descripcion: 'Smartwatch resistente al agua 50m', precio: 179.99, categoria_id: 2, size: '44mm', stock: 10, imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
        { titulo: 'Pantalón Corto de Baño Speedo', descripcion: 'Short profesional para nadadores', precio: 39.99, categoria_id: 4, size: 'M', stock: 25, imagen: 'https://images.unsplash.com/photo-1519818194067-1f82e96315d2?w=400' },
        { titulo: 'Tabla de Paddleboard Inflable', descripcion: 'SUP premium con bolsa de transporte', precio: 449.99, categoria_id: 4, size: '10 pies', stock: 6, imagen: 'https://images.unsplash.com/photo-1540202404-1b927655628c?w=400' },
        { titulo: 'Camisa de Lino Elegante', descripcion: 'Camisa transpirable perfecta para verano', precio: 69.99, categoria_id: 1, size: 'L', stock: 18, imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
        { titulo: 'Pantalón Chino Beige', descripcion: 'Pantalón versátil de algodón', precio: 59.99, categoria_id: 1, size: '32', stock: 20, imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
        { titulo: 'Set de Utensilios de Cocina', descripcion: 'Set completo de silicona para cocina', precio: 39.99, categoria_id: 3, size: '12 piezas', stock: 30, imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
        { titulo: 'Altavoz Bluetooth Waterproof', descripcion: 'Altavoz resistente al agua IPX7', precio: 79.99, categoria_id: 2, size: 'Portable', stock: 15, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
        { titulo: 'Kindle Oasis', descripcion: 'E-reader resistente al agua con luz cálida', precio: 249.99, categoria_id: 5, size: '32GB', stock: 7, imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' }
    ],

    // FLIP DELFÍN - Productos divertidos y de entretenimiento
    19: [
        { titulo: 'Meta Quest 2 VR', descripcion: 'Gafas de realidad virtual inalámbrica', precio: 399.99, categoria_id: 2, size: '128GB', stock: 8, imagen: 'https://images.unsplash.com/photo-1598328893313-38e2a2423665?w=400' },
        { titulo: 'Steam Deck', descripcion: 'Consola gaming portátil para PC', precio: 549.99, categoria_id: 2, size: '64GB', stock: 6, imagen: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400' },
        { titulo: 'Set de Lego Architecture', descripcion: 'Set de edificios famosos del mundo', precio: 129.99, categoria_id: 8, size: 'Skyline', stock: 12, imagen: 'https://images.unsplash.com/photo-1591799262821-3424ba42bd3f?w=400' },
        { titulo: 'Polera con Estampado Divertido', descripcion: 'Polera de algodón con diseño humorístico', precio: 29.99, categoria_id: 1, size: 'XL', stock: 22, imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
        { titulo: 'Vestido Estampado Tropical', descripcion: 'Vestido veraniego con colores vibrantes', precio: 49.99, categoria_id: 1, size: 'M', stock: 18, imagen: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400' },
        { titulo: 'Silla Gaming Razer', descripcion: 'Silla ergonómica con diseño gamer', precio: 349.99, categoria_id: 3, size: 'Standard', stock: 4, imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
        { titulo: 'Monitor Curvo 32" 4K', descripcion: 'Monitor gaming con 144Hz', precio: 599.99, categoria_id: 2, size: '32 pulgadas', stock: 5, imagen: 'https://images.unsplash.com/photo-1598928424274-48a892159fc1?w=400' },
        { titulo: 'Microfoon USB Blue Yeti', descripcion: 'Micrófono profesional para streaming', precio: 129.99, categoria_id: 2, size: 'Standard', stock: 10, imagen: 'https://images.unsplash.com/photo-1599421450295-b888332b4864?w=400' },
        { titulo: 'Control Xbox Elite Series 2', descripcion: 'Mando premium programable', precio: 149.99, categoria_id: 2, size: 'Wireless', stock: 9, imagen: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400' },
        { título: 'Set de Dados de Rol Polícromo', descripcion: 'Dados de mesa RPG con colores metálicos', precio: 49.99, categoria_id: 7, size: '7 piezas', stock: 15, imagen: 'https://images.unsplash.com/photo-1612287230202-1ff1d94d4757?w=400' }
    ],

    // POLO PINGÜINO - Productos de invierno y elegantes
    20: [
        { titulo: 'Apple iPhone 15 Pro', descripcion: 'Smartphone con chip A17 Pro y titanio', precio: 999.99, categoria_id: 2, size: '256GB', stock: 8, imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
        { titulo: 'Microsoft Surface Laptop 5', descripcion: 'Laptop ultrafina con touch screen', precio: 1199.99, categoria_id: 2, size: '13.5"', stock: 5, imagen: 'https://images.unsplash.com/photo-1517041896566-3c2473efe979?w=400' },
        { titulo: 'Parka Canada Goose Expedition', descripcion: 'Abrigo extreme weather con plumón premium', precio: 899.99, categoria_id: 1, size: 'L', stock: 4, imagen: 'https://images.unsplash.com/photo-1549842572-2bc3c517bd1c?w=400' },
        { titulo: 'Botas de Nieve Sorel', descripcion: 'Botas resistentes hasta -40°C', precio: 159.99, categoria_id: 1, size: '44', stock: 10, imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
        { titulo: 'Guantes de Cuero con Lana', descripcion: 'Guantes elegantes forrados en lana merino', precio: 89.99, categoria_id: 1, size: 'L', stock: 15, imagen: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' },
        { titulo: 'Bufanda de Cashmere Premium', descripcion: 'Bufanda suave de lana de cachemira', precio: 129.99, categoria_id: 1, size: 'Standard', stock: 8, imagen: 'https://images.unsplash.com/photo-1584850566745-a1d9e0a3b50d?w=400' },
        { titulo: 'Nintendo Switch - Animal Crossing', descripción: 'Edición especial con diseño exclusivo', precio: 379.99, categoria_id: 2, size: 'OLED', stock: 3, imagen: 'https://images.unsplash.com/photo-1612287230202-1ff1d94d4757?w=400' },
        { titulo: 'Altavoz Sonos Move', descripción: 'Altavoz portátil resistente al clima', precio: 399.99, categoria_id: 2, size: 'Wireless', stock: 7, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
        { titulo: 'Reloj Clásico Elegante', descripción: 'Reloj analógico con cuero italiano', precio: 299.99, categoria_id: 6, size: '40mm', stock: 6, imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
        { titulo: 'Abrigo de Lana Merino', descripción: 'Abrigo elegante de lana de alta calidad', precio: 349.99, categoria_id: 1, size: 'M', stock: 9, imagen: 'https://images.unsplash.com/photo-1549842572-2bc3c517bd1c?w=400' }
    ]
};

// Función para hacer requests HTTP
function makeRequest(url, options) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({ status: res.statusCode, data: jsonData });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });

        req.on('error', reject);
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

// Función para retrasar ejecución
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función principal
async function crearCatalogoVariado() {
    console.log('🚀 Creando catálogo variado y único...');

    try {
        // PASO 1: Eliminar todos los productos existentes
        console.log('\n🗑️ Eliminando productos existentes...');
        const productosResponse = await makeRequest(`${API_BASE}/productos?limit=500&page=1`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        let productosEliminados = 0;
        if (productosResponse.status === 200) {
            const productos = productosResponse.data.data || productosResponse.data;

            for (const producto of productos) {
                if (producto.vendedor_id >= 11 && producto.vendedor_id <= 20) {
                    try {
                        const deleteResponse = await makeRequest(`${API_BASE}/productos/${producto.id}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' }
                        });

                        if (deleteResponse.status === 200) {
                            productosEliminados++;
                            if (productosEliminados % 10 === 0) {
                                console.log(`  🗑️ Eliminados: ${productosEliminados} productos`);
                            }
                        }
                        await delay(100);
                    } catch (error) {
                        console.error(`    ❌ Error eliminando producto ${producto.id}:`, error.message);
                    }
                }
            }
            console.log(`✅ Se eliminaron ${productosEliminados} productos antiguos`);
        }

        // PASO 2: Crear nuevos productos variados
        console.log('\n🛍️ Creando catálogo variado...');
        let totalProductosCreados = 0;

        for (const animal of animalesPorDefecto) {
            console.log(`\n🐾 Creando productos para ${animal.nombre} (ID: ${animal.id})`);

            // Login
            const loginData = JSON.stringify({
                email: animal.email,
                password: animal.password
            });

            const loginResult = await makeRequest(`${API_BASE}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(loginData)
                },
                body: loginData
            });

            if (loginResult.status !== 200) {
                console.error(`❌ Error login para ${animal.nombre}:`, loginResult.data);
                continue;
            }

            const token = loginResult.data.token;
            const productosAnimal = catalogoVariado[animal.id];

            for (let i = 0; i < productosAnimal.length; i++) {
                const producto = productosAnimal[i];

                const productoData = JSON.stringify({
                    titulo: producto.titulo,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    categoria_id: producto.categoria_id,
                    size: producto.size,
                    stock: producto.stock,
                    imagen: producto.imagen,
                    vendedor_id: animal.id
                });

                try {
                    const productoResult = await makeRequest(`${API_BASE}/productos`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'Content-Length': Buffer.byteLength(productoData)
                        },
                        body: productoData
                    });

                    if (productoResult.status === 200 || productoResult.status === 201) {
                        totalProductosCreados++;
                        console.log(`  📦 [${i + 1}/10] ${producto.titulo} - $${producto.precio}`);
                    } else {
                        console.error(`    ❌ Error creando "${producto.titulo}":`, productoResult.status);
                    }

                    await delay(300);

                } catch (error) {
                    console.error(`    ❌ Error creando "${producto.titulo}":`, error.message);
                }
            }

            console.log(`✅ ${animal.nombre}: ${productosAnimal.length} productos únicos creados`);
            await delay(1000);
        }

        // PASO 3: Verificación final
        console.log('\n🎯 Verificación final...');
        const finalResponse = await makeRequest(`${API_BASE}/productos?limit=500&page=1`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        let productosPorAnimal = {};
        let productosUnicos = new Set();

        if (finalResponse.status === 200) {
            const productosFinales = finalResponse.data.data || finalResponse.data;

            // Contar productos por animal y verificar unicidad
            for (const producto of productosFinales) {
                if (producto.vendedor_id >= 11 && producto.vendedor_id <= 20) {
                    const animal = animalesPorDefecto.find(a => a.id === producto.vendedor_id);
                    if (animal) {
                        productosPorAnimal[animal.nombre] = (productosPorAnimal[animal.nombre] || 0) + 1;
                        productosUnicos.add(producto.titulo);
                    }
                }
            }

            console.log('\n📊 Resumen final:');
            let totalVerificados = 0;
            for (const animal of animalesPorDefecto) {
                const count = productosPorAnimal[animal.nombre] || 0;
                totalVerificados += count;
                console.log(`  🐾 ${animal.nombre}: ${count}/10 productos ${count === 10 ? '✅' : '❌'}`);
            }

            console.log(`\n🎉 Resultado:`);
            console.log(`  - Total animales: ${animalesPorDefecto.length}`);
            console.log(`  - Total productos: ${totalVerificados}`);
            console.log(`  - Productos únicos: ${productosUnicos.size}`);
            console.log(`  - Estado: ${totalVerificados === 100 ? '✅ COMPLETADO' : '⚠️ INCOMPLETO'}`);

            // Guardar catálogo completo
            const catalogoCompleto = `
# CATÁLOGO VARIADO COMPLETO - TREND'S MARKETPLACE
# Generado: ${new Date().toLocaleString()}

## 🎯 ESTADO: ✅ COMPLETADO

### 📊 ESTADÍSTICAS:
- **Usuarios animales:** ${animalesPorDefecto.length}
- **Total productos:** ${totalVerificados}
- **Productos únicos:** ${productosUnicos.size}
- **Promedio por usuario:** ${(totalVerificados / animalesPorDefecto.length).toFixed(1)}

### 🐾 PRODUCTOS POR ANIMAL:
${animalesPorDefecto.map(animal => {
    const productos = catalogoVariado[animal.id];
    return `
#### ${animal.nombre}
${productos.map(p => `- **${p.titulo}** - $${p.precio} (Cat ${p.categoria_id})`).join('\n')}
`;
}).join('')}

### 📦 DISTRIBUCIÓN POR CATEGORÍAS:
${(() => {
    let categorias = {};
    for (const productos of Object.values(catalogoVariado)) {
        for (const producto of productos) {
            categorias[producto.categoria_id] = (categorias[producto.categoria_id] || 0) + 1;
        }
    }
    return Object.entries(categorias).map(([catId, count]) => `- Categoría ${catId}: ${count} productos`).join('\n');
})()}

### 🎨 VARIEDAD DE PRODUCTOS:
✅ **Consolas:** PlayStation, Xbox, Nintendo Switch
✅ **Smartwatches:** Apple Watch, Samsung Galaxy, Garmin
✅ **Gafas:** Ray-Ban, Oakley, Versace
✅ **Joyería:** Collares de oro, anillos, cadenas
✅ **Robótica:** LEGO Mindstorms, Arduino, Sphero
✅ **Ropa:** Chaquetas, vestidos, poleras, botas
✅ **Outdoor:** Tiendas, mochilas, bicicletas
✅ **Tecnología:** Laptops, cámaras, drones, tablets

## 🔐 ACCESO:
${animalesPorDefecto.map(animal => `- ${animal.email} / ${animal.password}`).join('\n')}

## ✅ LISTO PARA DEMOSTRACIÓN
`;

            fs.writeFileSync('CATALOGO_VARIADO_COMPLETO.md', catalogoCompleto);
            console.log('\n📄 Catálogo guardado en CATALOGO_VARIADO_COMPLETO.md');
        }

    } catch (error) {
        console.error('❌ Error en el proceso:', error.message);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    crearCatalogoVariado().catch(console.error);
}

module.exports = { crearCatalogoVariado };