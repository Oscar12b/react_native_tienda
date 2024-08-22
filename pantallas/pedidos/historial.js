import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderList from './components/lista_pedido';
import Header from './pantallas/components/encabezado';
import OrderDetail from './pantallas/components/OrderDetail';

const Stack = createStackNavigator();

const Historial = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="OrderList" component={OrderList} options={{ title: 'Historial' }} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ title: 'Detalle del Pedido' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Historial;
