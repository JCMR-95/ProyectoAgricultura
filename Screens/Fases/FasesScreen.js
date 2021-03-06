import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
 
const FasesScreen = (props) => {

  return (
    <View style = {styles.container}>
      <View style={styles.button}>
        <Button title ="Compra de Semillas" onPress = {() => props.navigation.navigate('Listado de Compras')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sembrado" onPress = {() => props.navigation.navigate('Listado de Sembrados')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Trasplante" onPress = {() => props.navigation.navigate('Listado de Trasplantes')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Crecimiento" onPress = {() => props.navigation.navigate('Listado de Crecimientos')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Cosechas" onPress = {() => props.navigation.navigate('Listado de Cosechas')}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FD417',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
    height: 60
  },
});

export default FasesScreen;