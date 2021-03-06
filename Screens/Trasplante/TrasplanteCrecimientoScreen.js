import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import DatePicker from 'react-native-datepicker'
import firebase from '../../database/firebase';
 
const TrasplanteCrecimientoScreen = (props) => {

    const initialState = {
        id: '',
        tipoPlanta: '',
        fechaTrasplante: ''
    };

    const [state, setState] = useState({
        ph: '',
        agregadoPH: ''
    });

    const [trasplante, setTrasplante] = useState(initialState);

    const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
    };

    const obtenerTrasplante = async(id) => {
        const dbRef = firebase.db.collection("Trasplantes").doc(id);
        const doc = await dbRef.get();
        const trasplante = doc.data();
        setTrasplante({ ...trasplante, id: doc.id });
    };

    const trasplantar = async () => {
        if (trasplante.fechaTrasplante === "" || state.ph === "") {
            Alert.alert("Debes completar los Campos")
            } else {
            try {
                await firebase.db.collection("Crecimientos").doc(trasplante.id).set({
                    tipoPlanta: trasplante.tipoPlanta,
                    fechaTrasplante: trasplante.fechaTrasplante,
                    ph: state.ph,
                    agregadoPH: state.agregadoPH
                });
                Alert.alert("Datos Ingresados!")
                borrarDatos()
    
            } catch (error) {
            console.log(error)
            }
        }
    };

    const borrarDatos = async () => {
        const dbRef = firebase.db
          .collection("Trasplantes")
          .doc(trasplante.id);
        await dbRef.delete();
        props.navigation.navigate('Fases');
      };

    useEffect(() => {
        obtenerTrasplante(props.route.params.trasplanteId)
    }, [])
    
    return(
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>

            <View style={styles.text}>
            < TextInput
                placeholder={trasplante.tipoPlanta}
                value={trasplante.tipoPlanta}
                editable={false}
                onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
            />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 200}}
                date={trasplante.fechaTrasplante}
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
                value={"Fecha de Trasplante: " + trasplante.fechaTrasplante}
              />
            </View>

            <View style={styles.text}>
            < TextInput
                placeholder="Ingrese PH"
                onChangeText={(value) => handleChangeText(value, "ph")}
                value={state.ph}
            />
            </View>

            <View style={styles.text}>
            < TextInput
                placeholder="¿Agregó algo para modificar el PH (Opcional)"
                onChangeText={(value) => handleChangeText(value, "agregadoPH")}
                value={state.agregadoPH}
            />
            </View>

            <View style={styles.button}>
            <Button color = "green" title ="Confirmar" onPress = {() => trasplantar()}/>
            </View>

        </ScrollView>
    </View>
        
    )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5FD417',
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

export default TrasplanteCrecimientoScreen;