import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Button, Image } from 'react-native';
 
const LoginScreen = (props) => {

  const [state, setState] = useState({
    nombreUsuario: '',
    contrasena: ''
  });

  const handleChangeText = (value, dato) => {
    setState({ ...state, [dato]: value });
  };

  const confirmacion = async() => { 

    if (state.nombreUsuario == "Administrador") {
      if(state.contrasena == "Administrador" || state.contrasena == "administrador" ){
        Alert.alert("Bienvenido!")
        props.navigation.navigate('Fases')
        
      }else{
        Alert.alert("Contraseña incorrecta")
      }
    }else{
      Alert.alert("Nombre de Usuario incorrecto")
    }
  };

  return (
    <View style = {styles.container}>
      <View style = {styles.centerLogo}>
        <Image source = {require('./Icono.png')} style ={styles.logo} />
      </View>
      <View style = {styles.body}>
        <TextInput placeholder = "Ingrese Nombre" 
                  onChangeText={(value) => handleChangeText(value, "nombreUsuario")}
                  value={state.nombreUsuario}/>
        <TextInput placeholder = "Ingrese Contraseña" secureTextEntry={true}
                  onChangeText={(value) => handleChangeText(value, "contrasena")}
                  value={state.contrasena}/>

        <Button title ="Ingresar" onPress = {() => confirmacion()}/>

      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6CF616',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo : {
    width: 100,
    height: 160
  },
  centerLogo : {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;