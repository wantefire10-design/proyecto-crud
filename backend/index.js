const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3000;

// --- Middleware ---
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite al servidor entender JSON

// --- Configuración de la conexión a la base de datos ---
// Asegúrate de que estos datos coincidan con tu configuración de MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Si tienes contraseña, ponla aquí
  database: 'mi_sistema_crud' // La base de datos que creaste
});

// --- Conectar a la base de datos ---
db.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('¡Conexión exitosa a la base de datos MySQL!');
});

// --- RUTA (ENDPOINT) PARA OBTENER TODOS LOS PRODUCTOS ---
app.get('/api/productos', (req, res) => {
  const sql = 'SELECT id_producto, nombre, descripcion, precio, stock FROM productos';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      return res.status(500).json({ error: 'Error en el servidor al obtener los productos.' });
    }
    // Si todo va bien, envía los resultados en formato JSON
    res.json(results);
  });
});

// Esta ruta NUNCA debe devolver la contraseña, ni siquiera hasheada.
app.get('/api/usuarios', async (req, res) => {
  try {
    const sql = 'SELECT id_usuario, nombre_usuario, email, nombre_completo, fecha_registro FROM usuarios';
    const [results] = await pool.query(sql);
    res.json(results);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

// --- Iniciar el servidor ---
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});