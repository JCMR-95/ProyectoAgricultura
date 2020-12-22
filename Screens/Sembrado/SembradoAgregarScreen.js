import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import firebase from '../../database/firebase';
 
const SembradoAgregarScreen = (props) => {
  
    const [state, setState] = useState({
        tipoPlanta: '',
        fechaTrasplante: '',
        fechaPlantacion: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const guardarDatos = async () => {
        if (state.tipoPlanta === "" || state.fechaTrasplante === "" || state.fechaPlantacion=== "") {
          Alert.alert("Debes completar los Campos")
        } else {
    
          try {
            await firebase.db.collection("Sembrados").add({
              tipoPlanta: state.tipoPlanta,
              fechaTrasplante: state.fechaTrasplante,
              fechaPlantacion: state.fechaPlantacion,
            });
            Alert.alert("Dato Ingresado!")
            props.navigation.navigate('Listado de Sembrados')
    
          } catch (error) {
            console.log(error)
          }
        }
      };
    
      return(
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
      
            <View style={styles.text}>
              < TextInput 
                placeholder="Ingrese Tipo de Planta"
                onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
                value={state.tipoPlanta}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 200}}
                date={state.fechaTrasplante}
                mode="date"
                placeholder="Ingrese Fecha de Trasplante"
                format="YYYY-MM-DD"
                minDate="2019-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(value) => handleChangeText(value, "fechaTrasplante")}
                value={state.fechaTrasplante}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 200}}
                date={state.fechaPlantacion}
                mode="date"
                placeholder="Ingrese Fecha de Elaboracion"
                format="YYYY-MM-DD"
                minDate="2019-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(value) => handleChangeText(value, "fechaPlantacion")}
                value={state.fechaPlantacion}
              />
            </View>
      
            <View style={styles.button}>
              <Button title ="Guardar Datos" onPress = {() => guardarDatos()}/>
            </View>
            
          </ScrollView>
        </View>
        
      )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6CF616',
    },
    scroll: {
      flex: 1,
      padding: 35,
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

export default SembradoAgregarScreen;