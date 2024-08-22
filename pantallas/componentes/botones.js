// Importar librerías y dependencias
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Componente de Botón de Cotización
const QuoteButton = ({ onPress }) => {
    return (
        
        // Estructura del Botón
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Cotizar</Text>
        </TouchableOpacity>
    );
};

// Estilo de botones
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// Exportar componente
export default QuoteButton;