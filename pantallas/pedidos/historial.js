import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import OrderList from './pantallas/components/lista_pedido';
import Header from './pantallas/components/encabezado';
const Historial = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <OrderList />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Historial;
