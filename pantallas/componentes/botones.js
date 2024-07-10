import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const cotizar_buton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Cotizar</Text>
        </TouchableOpacity>
    );
};

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

export default cotizar_buton;
