import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';

// 🚨 REEMPLAZA ESTA IP CON LA TUYA
const API_URL = 'http://10.186.9.193:3000/api/productos';

export default function App() {
  // Estados para almacenar los datos, el estado de carga y los errores
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(API_URL);
        setProductos(response.data); // Guarda los datos en el estado
        setError(null); // Limpia errores previos
      } catch (e) {
        console.error("Error al obtener los datos:", e);
        setError('No se pudieron cargar los datos. Asegúrate de que el servidor esté corriendo y la IP sea correcta.');
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchProductos();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Muestra un indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  // Muestra un mensaje de error si la petición falla
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Componente para renderizar cada item de la lista
  const ProductoItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nombre}</Text>
      <Text style={styles.itemDescription}>{item.descripcion}</Text>
      <Text style={styles.itemPrice}>Precio: ${parseFloat(item.precio).toFixed(2)}</Text>
      <Text style={styles.itemStock}>Stock: {item.stock}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Listado de Productos</Text>
      <FlatList
        data={productos}
        renderItem={ProductoItem}
        keyExtractor={item => item.id_producto.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 8,
  },
  itemStock: {
    fontSize: 14,
    color: '#888',
  },
});