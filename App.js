import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './Screens/Login/LoginScreen'
import FasesScreen from './Screens/Fases/FasesScreen'

import CompraListadoScreen from './Screens/Compra/CompraListadoScreen'
import CompraAgregarScreen from './Screens/Compra/CompraAgregarScreen'
import CompraDetallesScreen from './Screens/Compra/CompraDetallesScreen'
import CompraSembradoScreen from './Screens/Compra/CompraSembradoScreen'

import SembradoListadoScreen from './Screens/Sembrado/SembradoListadoScreen'
import SembradoAgregarScreen from './Screens/Sembrado/SembradoAgregarScreen'
import SembradoDetallesScreen from './Screens/Sembrado/SembradoDetallesScreen'
import SembradoTrasplanteScreen from './Screens/Sembrado/SembradoTrasplanteScreen'

import TrasplanteListadoScreen from './Screens/Trasplantes/TrasplanteListadoScreen'
import TrasplanteAgregarScreen from './Screens/Trasplantes/TrasplanteAgregarScreen'
import TrasplanteDetallesScreen from './Screens/Trasplantes/TrasplanteDetallesScreen'
import TrasplanteCrecimientoScreen from './Screens/Trasplantes/TrasplanteCrecimientoScreen'

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
          <Stack.Screen name="Detalles de Compra" component={CompraDetallesScreen} />
          <Stack.Screen name="Sembrar Semillas" component={CompraSembradoScreen} />

          <Stack.Screen name="Listado de Sembrados" component={SembradoListadoScreen} />
          <Stack.Screen name="Agregar Sembrado" component={SembradoAgregarScreen} />
          <Stack.Screen name="Detalles de Sembrado" component={SembradoDetallesScreen} />
          <Stack.Screen name="Realizar Trasplante" component={SembradoTrasplanteScreen} />

          <Stack.Screen name="Listado de Trasplantes" component={TrasplanteListadoScreen} />
          <Stack.Screen name="Agregar Trasplante" component={TrasplanteAgregarScreen} />
          <Stack.Screen name="Detalles de Trasplante" component={TrasplanteDetallesScreen} />
          <Stack.Screen name="Realizar Crecimiento" component={TrasplanteCrecimientoScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
