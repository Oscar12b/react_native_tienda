import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from './pantallas/usuarios/login';
import Register from './pantallas/usuarios/register';
import CambiarContraseña from './pantallas/usuarios/recuperacion_contrasena/cambiar_contraseña';
import IngresarCodigo from './pantallas/usuarios/recuperacion_contrasena/ingresar_codigo';
import IngresarEmail from './pantallas/usuarios/recuperacion_contrasena/ingresar_email';
import OrderHistoryScreen from './pantallas/pedidos/historial_pedido';
import Main from './utilidades/navigation';
import PedidoDetalleScreen from './pantallas/pedidos/detalle_pedido';

import { AlertNotificationRoot } from 'react-native-alert-notification';


const Stack = createStackNavigator();


export default function App() {
  return (
    <AlertNotificationRoot>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false, // Esto oculta la barra superior en todas las pantallas
        }} initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CambiarContraseña" component={CambiarContraseña} />
          <Stack.Screen name="IngresarCodigo" component={IngresarCodigo} />
          <Stack.Screen name="IngresarEmail" component={IngresarEmail} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Historial" component={OrderHistoryScreen} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="DetallePedido" component={PedidoDetalleScreen} />


        </Stack.Navigator>
      </NavigationContainer>

    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({

});
