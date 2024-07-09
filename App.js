import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pantallas/usuarios/login';
import Register from './pantallas/usuarios/register';
import Catalogo from './pantallas/tienda/tienda';



const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false, // Esto oculta la barra superior en todas las pantallas
      }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Catalogo" component={Catalogo} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({

});
