import { SERVER_URL } from './constants.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// CONSTANTES DE LOS ENDPOINTS DE LOS SERVICIOS
export const CLIENTES_API = 'services/public/clientes.php';
export const PRODUCTOS_API = 'services/public/muebles.php';
export const PEDIDOS_API = 'services/public/pedidos.php';


// FUNCION PARA ALMACENAR EL IDENTIFICADOR DE LA SESION
export const almacenarIdentificadorSesion = async (SESSION_ID) => {
    try {
        await AsyncStorage.setItem('PHPSESSID', SESSION_ID);
    } catch (e) {
        // Guardar error
        console.error('Error al almacenar el identificador de sesión:', e);
    }
};

// FUNCION PARA OBTENER EL IDENTIFICADOR DE LA SESION
export const obtenerIdentificadorSesion = async () => {
    try {
        const SESSION_ID = await AsyncStorage.getItem('PHPSESSID');
        return SESSION_ID;
    } catch (e) {
        // Error al recuperar el ID
        console.error('Error al obtener el identificador de sesión:', e);
        return null;
    }
};

export const logout = async () => {
    try {
        const response = await fetchData(CLIENTES_API, 'logOut');

        if (response.status === 1) {
            await AsyncStorage.removeItem('PHPSESSID');
            return response;
        } else {
            throw new Error(response.error || 'Error al cerrar sesión');
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};

// Function to fetch data from the API
export const fetchData = async (filename, action, form = null, dataprovisional = null) => {
    if (dataprovisional !== null) {
        return dataprovisional;
    } else {
        const PHPSESSID = await obtenerIdentificadorSesion();

        // Set the request options
        const OPTIONS = {
            method: form ? 'post' : 'get',
            headers: {
                ...(PHPSESSID && { 'Cookie': `PHPSESSID=${PHPSESSID}` })
            },
            ...(form && { body: form }),
        };

        if (form) {
            OPTIONS.body = form;
        }

        try {
            // Construct the server URL
            const PATH = `${SERVER_URL}${filename}`;
            // Add the action parameter to the URL
            const URL_WITH_ACTION = `${PATH}?action=${action}`;

            console.warn(URL_WITH_ACTION);
            // Obtener el identificador de sesión y agregarlo a los encabezados
            console.warn(OPTIONS.body);

            // Send the request and get the RESPONSE
            const RESPONSE = await fetch(URL_WITH_ACTION, OPTIONS);

            const COOKIES = RESPONSE.headers.get('set-cookie');

            // Extraer el PHPSESSID de las COOKIES
            const PHPSESSID = COOKIES
                ? COOKIES.split(';').find(cookie => cookie.trim().startsWith('PHPSESSID')).split('=')[1]
                : null;

            // Almacenar el PHPSESSID en el almacenamiento local
            if (PHPSESSID) {
                await almacenarIdentificadorSesion(PHPSESSID)

            }

            // Return the RESPONSE in JSON format
            return await RESPONSE.json();
        } catch (error) {
            // Log the error to the console
            console.error(error);
        }
    }
}
