// Importamos las librerías y módulos necesarios
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente de Encabezado
const Header = () => {
    return (

        // Estructura del Encabezado
        <View style={styles.header}>

            {/* Texto del Encabezado */}
            <Text style={styles.headerText}>Muebles.sv</Text>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

// Exportar componente
export default Header;