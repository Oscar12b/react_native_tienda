import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const productos = [
    { id: '1', nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: '10.00' },
    { id: '2', nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: '15.00' },
    // Agrega más productos según sea necesario
];

const Tienda = () => {
    const agregarAlCarrito = (id) => {
        console.log(`Producto ${id} agregado al carrito`);
        // Aquí puedes agregar la lógica para manejar la adición de productos al carrito
    };

    const renderProducto = ({ item }) => (
        <View style={styles.producto}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
            <Text>Precio: ${item.precio}</Text>
            <TouchableOpacity onPress={() => agregarAlCarrito(item.id)} style={styles.boton}>
                <Text style={styles.textoBoton}>Agregar al carrito</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Tienda</Text>
            <FlatList
                data={productos}
                renderItem={renderProducto}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        marginTop: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    producto: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    boton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    textoBoton: {
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default Tienda;