import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const IngresarCorreo = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Recuperar contraseña</Text>
                    <Text style={styles.label}>Nueva contraseña</Text>
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
                    <Text style={styles.label}>Confirmar contraseña</Text>
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 90,
    },
    formContainer: {
        width: '75%',
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#D9D9D9',
        marginBottom: 3,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 55,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
        marginLeft: '2%',
        marginTop: 25,
    },
    resendCode: {
        fontSize: 15,
        color: '#1E90FF',
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 30,
        textDecorationLine: 'underline',
        marginBottom: 40,
    },
});

export default IngresarCorreo;