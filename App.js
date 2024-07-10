import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavStack from './navegacion/nav_stack';
import Login from './pantallas/usuarios/login';
import Register from './pantallas/usuarios/register';
import CambiarContraseña from './pantallas/usuarios/recuperación_contraseña/cambiar_contraseña';
import IngresarCodigo from './pantallas/usuarios/recuperación_contraseña/ingresar_codigo';
import IngresarEmail from './pantallas/usuarios/recuperación_contraseña/ingresar_email';

import Main from './utilidades/navigation';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false, // Esto oculta la barra superior en todas las pantallas
      }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CambiarContraseña" component={CambiarContraseña} />
        <Stack.Screen name="IngresarCodigo" component={IngresarCodigo} />
        <Stack.Screen name="IngresarEmail" component={IngresarEmail} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={Main} />

      </Stack.Navigator>
      <NavStack/>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({

});
