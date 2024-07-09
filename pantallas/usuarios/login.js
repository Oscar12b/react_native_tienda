import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { fetchData, CLIENTES_API, almacenarIdentificadorSesion, logout } from '../../utilidades/componentes';
import { controlAcceso } from '../../servicios/clientesservicios';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {

    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    
    useEffect(() => {
        const checkAccess = async () => {
            await controlAcceso(navigation);
        };

        checkAccess(); //funcion para verificar el acceso

        return () => {
        };
    }, []);


    const iniciarSession = async () => {
        if (usuario === '' || contrasena === '') {
            setError('Por favor, ingrese usuario y contraseña.');
            return;
        }

        try {
            const FORM_DATA = new FormData();
            FORM_DATA.append('alias', usuario);
            FORM_DATA.append('clave', contrasena);

            const RESPONSE = await fetchData(CLIENTES_API, 'logIn', FORM_DATA);

            if (RESPONSE.status && RESPONSE.session) {
                console.warn(RESPONSE.message);
                setError('');  // Clear error if login is successful
                navigation.navigate('Catalogo');
                return RESPONSE;
            } else {
                setError(RESPONSE.error || 'Error al iniciar sesión.');
            }
        } catch (error) {
            setError('Error al conectar con el servidor.');
            console.error(error);
        }
    };


    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Iniciar sesión</Text>
                    <Text style={styles.firstTime}>
                        ¿Primera vez que ingresas? <Text style={styles.register} onPress={() => navigation.navigate('Register')}>Registrarme</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        value={usuario}
                        onChangeText={setUsuario}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        value={contrasena}
                        onChangeText={setContrasena}
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                    <TouchableOpacity style={styles.button} onPress={iniciarSession}>
                        <Text style={styles.buttonText}>Ingresar</Text>
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
        paddingBottom: 110,
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
        marginTop: 5,
        marginBottom: 30,
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
    },
});

export default Login;
