import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
 
const CompraAgregarScreen = (props) => {
    const [state, setState] = useState({
        tipoPlanta: '',
        fechaElab: '',
        fechaVenc: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const guardarDatos = async () => {
        if (state.tipoPlanta === "") {
          Alert.alert("Debes ingresar un Nombre")
        } else {
    
          try {
            await firebase.db.collection("Compras").add({
              tipoPlanta: state.tipoPlanta,
              fechaElab: state.fechaElab,
              fechaVenc: state.fechaVenc,
            });
            Alert.alert("Dato Ingresado!")
            //props.navigation.navigate('Listado')
    
          } catch (error) {
            console.log(error)
          }
        }
      };
    
      return(
    
        <View style={styles.container}>
    
          <View style={styles.text}>
            < TextInput 
              placeholder="Ingrese Tipo de Planta"
              onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
              value={state.tipoPlanta}
            />
          </View>
    
          <View style={styles.text}>
            < TextInput placeholder
              placeholder="Ingrese Fecha de Elaboracion"
              onChangeText={(value) => handleChangeText(value, "fechaElab")}
              value={state.fechaElab}
            />
          </View>
    
          <View style={styles.text}>
            < TextInput
              placeholder="Ingrese Fecha de Vencimiento"
              onChangeText={(value) => handleChangeText(value, "fechaVenc")}
              value={state.fechaVenc}
            />
          </View>
    
          <View style={styles.button}>
            <Button title ="Guardar Datos" onPress = {() => guardarDatos()}/>
          </View>
          
        </View>
        
      )
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6CF616',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 35
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
    text: {
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
  });

export default CompraAgregarScreen;