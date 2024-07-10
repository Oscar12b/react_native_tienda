// App.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PedidosCard from '../componentes/pedidos_card';
import { fetchData, PEDIDOS_API } from '../../utilidades/componentes';
import { useFocusEffect } from '@react-navigation/native';

const App = () => {
    const [products, setProducts] = useState([]);

    const rellenarCarrito = async () => {
        try {
            const RESPONSE = await fetchData(PEDIDOS_API, 'readAllPedido');
            if (RESPONSE.status) {
                setProducts(RESPONSE.dataset);

            } else {
                console.error(RESPONSE.error || 'Error al recopilar productos.');
                setProducts([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            rellenarCarrito();
        }, [])
    );

    const finalizarPedido = async () => {

        try {
            const FORM_DATA = new FormData();
            if (products.length === 0) {
                console.warn('No hay productos en el carrito');
                return;
            }
            FORM_DATA.append('idPedido', products[0].id_pedido);

            const RESPONSE = await fetchData(PEDIDOS_API, 'finishOrder', FORM_DATA);

            if (RESPONSE.status) {
                console.warn('Pedido finalizado');
                rellenarCarrito();
            }
            else {
                console.error(RESPONSE.error || 'Error al finalizar el pedido');
            }
        }
        catch (error) {
            console.error('No se pudo finalizar el pedido', error);
        }
    };


    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Carrito</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => <PedidosCard item={item} onPedidoEliminado={rellenarCarrito} />}
                keyExtractor={item => item.id_mueble.toString()}
            />
            <TouchableOpacity style={styles.finalizarButton} onPress={finalizarPedido}>
                <Text style={styles.finalizarButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    finalizarButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        margin: 20,
    },
    finalizarButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default App;
