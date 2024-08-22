// App.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PedidosCard from '../componentes/pedidos_card';
import { fetchData } from '../../utilidades/componentes';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../componentes/header';


import { PEDIDOS_API } from '../../utilidades/constants';

import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


const Carrito = ({ navigation }) => {

    const [products, setProducts] = useState([]);

    const rellenarCarrito = async () => {
        try {
            const RESPONSE = await fetchData(PEDIDOS_API, 'readAllPedido');
            if (RESPONSE.status) {
                setProducts(RESPONSE.dataset);

            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al mostrar el carrito.',
                    textBody: 'No se pudo mostrar el carrito',
                });
                setProducts([]);
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al mostrar el carrito.',
                textBody: 'No se pudo mostrar el carrito',
            });
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
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Carrito vacío',
                    textBody: 'No hay productos en el carrito',
                });
                return;
            }
            FORM_DATA.append('idPedido', products[0].id_pedido);

            const RESPONSE = await fetchData(PEDIDOS_API, 'finishOrder', FORM_DATA);

            if (RESPONSE.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Pedido finalizado',
                    textBody: 'Se ha finalizado el pedido',
                });
                rellenarCarrito();
            }
            else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al finalizar el pedido',
                    textBody: 'No se pudo finalizar el pedido',
                });
            }
        }
        catch (error) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al finalizar el pedido',
                textBody: 'No se pudo finalizar el pedido',
            });
        }
    };


    return (
        <View style={styles.contenedor}>
            <Header />
            <Text style={styles.titulo}>Carrito</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => <PedidosCard item={item} onPedidoEliminado={rellenarCarrito} />}
                keyExtractor={item => item.id_mueble.toString()}
            />
            <TouchableOpacity style={styles.finalizarButton} onPress={finalizarPedido}>
                <Text style={styles.finalizarButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Dettales} onPress={() => navigation.navigate('Historial')}>
                <Text style={styles.finalizarButtonText}>Detalles Pedido</Text>
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
    Dettales: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
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

export default Carrito;
