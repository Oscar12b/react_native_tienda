import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Register = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registrarme</Text>
                    <TextInput style={styles.input} placeholder="Nombre" />
                    <TextInput style={styles.input} placeholder="Apellido" />
                    <TextInput style={styles.input} placeholder="DUI" />
                    <TextInput style={styles.input} placeholder="Teléfono" />
                    <TextInput style={styles.input} placeholder="Dirección" />
                    <TextInput style={styles.input} placeholder="Correo" />
                    <TextInput style={styles.input} placeholder="Usuario" />
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Registrarme</Text>
                    </TouchableOpacity>
                    <Text style={styles.firstTime}>
                        ¿Ya tienes una cuenta? <Text style={styles.register} onPress={() => navigation.navigate('Login')}>Iniciar sesión</Text>
                    </Text>
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
        paddingBottom: 30,
    },
    formContainer: {
        width: '75%',
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    firstTime: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },
    register: {
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
    input: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#D9D9D9',
        marginBottom: 20,
    },
    forgotPassword: {
        fontSize: 14,
        color: '#1E90FF',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Register;