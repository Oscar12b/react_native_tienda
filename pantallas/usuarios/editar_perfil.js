import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Register = () => {

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');


    const RegistrarUsuario = async () => {
        try {
            const FORM_DATA = new FormData();
            FORM_DATA.append('aliasCliente', nombreUsuario);
            FORM_DATA.append('clavecliente', nombre);
            FORM_DATA.append('nombreCliente', apellido);
            FORM_DATA.append('apellidoCliente', dui);
            FORM_DATA.append('duiCliente', telefono);
            FORM_DATA.append('telefonoCliente', direccion);
            FORM_DATA.append('direccionCliente', correo);
            FORM_DATA.append('correoCliente', usuario);

            const RESPONSE = await fetchData(API_CLIENTE, 'register', FORM_DATA);

            if (RESPONSE.status === 1 && RESPONSE.session === 1) {
                await almacenarIdentificadorSesion(RESPONSE.id);
                return RESPONSE;
            } else {
                throw new Error(RESPONSE.error || 'Error de inicio de sesión');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <ImageBackground source={require('./assets/fondo.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Editar perfil</Text>
                    <TextInput style={styles.input} placeholder="Nombre Usuario" value={nombreUsuario} onChangeText={setNombreUsuario} />
                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                    <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
                    <TextInput style={styles.input} placeholder="DUI" value={dui} onChangeText={setDui} />
                    <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} />
                    <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
                    <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} />
                    <TextInput style={styles.input} placeholder="Usuario" value={usuario} onChangeText={setUsuario} />
                    <TouchableOpacity style={styles.button}>
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
    input: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#D9D9D9',
        marginBottom: 20,
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