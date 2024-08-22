// OrderHistoryScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import OrderCard from '../componentes/orderCard';
import { fetchData } from '../../utilidades/componentes';
import { useFocusEffect } from '@react-navigation/native';

import { PEDIDOS_API } from '../../utilidades/constants';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


const OrderHistoryScreen = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const rellenarHistorial = async () => {
        try {
            const RESPONSE = await fetchData(PEDIDOS_API, 'readhistory');
            if (RESPONSE.status) {
                setProducts(RESPONSE.dataset);
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Historial mostrado',
                    textBody: 'Se ha mostrado el historial',
                });

            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: RESPONSE.error || 'Error al mostrar el historial.',
                    textBody: 'No se pudo mostrar el historial',
                });
                setProducts([]);
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error al mostrar el historial.',
                textBody: 'No se pudo mostrar el historial',
            });
        }
    };

    useFocusEffect(
        useCallback(() => {
            rellenarHistorial();
        }, [])
    );


    const handlePress = (id) => {

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Muebles.sv</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar"
                    value={search}
                    onChangeText={setSearch}
                />
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>🔍</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {products.map(order => (
                    <OrderCard
                        id={order.id_pedido}
                        precio_pedido={order.precio_pedido}
                        cantidad_pedido={order.cantidad_pedido}
                        estado_pedido={order.estado_pedido}
                        fecha_pedido={order.fecha_pedido}
                        onPress={() => handlePress(order.id)}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#f9a825',
        padding: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    scrollView: {
        paddingVertical: 10,
    },
});

export default OrderHistoryScreen;
