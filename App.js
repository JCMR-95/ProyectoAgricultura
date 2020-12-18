import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './Screens/Login/LoginScreen'
import FasesScreen from './Screens/Fases/FasesScreen'
import CompraListadoScreen from './Screens/Compra/CompraListadoScreen'
import CompraAgregarScreen from './Screens/Compra/CompraAgregarScreen'


const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Iniciar Sesión" component={LoginScreen} />
          <Stack.Screen name="Fases" component={FasesScreen} />

          <Stack.Screen name="Listado de Compras" component={CompraListadoScreen} />
          <Stack.Screen name="Compra de Semillas" component={CompraAgregarScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
