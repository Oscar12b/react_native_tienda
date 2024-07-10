import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { fetchData, CLIENTES_API } from '../../utilidades/componentes';
import { cerrarSesion } from '../../servicios/clientesservicios';
import { controlAcceso } from '../../servicios/clientesservicios';



const { width, height } = Dimensions.get('window');

const Register = ({ navigation }) => {


    const [nombreUsuario, setNombreUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        const checkAccess = async () => {
            await controlAcceso(navigation);
        };

        const RellenarDatos = async () => {
            const RESPONSE = await fetchData(CLIENTES_API, 'readProfile');
            console.warn(RESPONSE);

            if (RESPONSE.status === 1) {

                const ROW = RESPONSE.dataset;
                setNombreUsuario(ROW.alias_cliente);
                setNombre(ROW.nombre_cliente);
                setApellido(ROW.apellido_cliente);
                setDui(ROW.dui_cliente);
                setTelefono(ROW.telefono_cliente);
                setDireccion(ROW.direccion_cliente);
                setCorreo(ROW.correo_cliente);
                setUsuario(ROW.alias_cliente);

            } else {
                console.error(RESPONSE.error || 'Error al cargar los datos del usuario');
            }
        };

        RellenarDatos();
        checkAccess(); //funcion para verificar el acceso

        return () => {
        };
    }, []);



    const RegistrarUsuario = async () => {
        try {
            const FORM_DATA = new FormData();

            FORM_DATA.append('nombreCliente', nombre);
            FORM_DATA.append('apellidoCliente', apellido);
            FORM_DATA.append('correCliente', correo);
            FORM_DATA.append('aliasCliente', usuario);
            FORM_DATA.append('duiCliente', dui);
            FORM_DATA.append('telefonoCliente', telefono);
            FORM_DATA.append('direccionCliente', direccion);

            const RESPONSE = await fetchData(CLIENTES_API, 'editProfile', FORM_DATA);

            if (RESPONSE.status === 1 && RESPONSE.session === 1) {
                console.warn(RESPONSE.message || 'Perfil actualizado correctamente');
            } else {
                throw new Error(RESPONSE.error || 'Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error desconocido:', error);
        }
    };

    return (
        <ImageBackground source={require('../../assets/fondo.png')} style={styles.backgroundImage}>
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
                    <TouchableOpacity style={styles.button} onPress={() => RegistrarUsuario()}>
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link} onPress={() => cerrarSesion(navigation)}>
                        <Text>Cerrar sesion</Text>
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
    link: {
        width: '100%',
        alignItems: 'center',
        color: '#1E90FF',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 16,
    },
});

export default Register;