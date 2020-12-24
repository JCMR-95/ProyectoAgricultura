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
 
const CrecimientoCosechaScreen = (props) => {

    const initialState = {
        id: '',
        tipoPlanta: ''
    };

    const [state, setState] = useState({
        fechaCosecha: '',
        cantVentas: ''
    });

    const [crecimiento, setCrecimiento] = useState(initialState);

    const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
    };

    const obtenerCrecimiento = async(id) => {
        const dbRef = firebase.db.collection("Crecimientos").doc(id);
        const doc = await dbRef.get();
        const crecimiento = doc.data();
        setCrecimiento({ ...crecimiento, id: doc.id });
    };

    const trasplantar = async () => {
        if (state.fechaCosecha === "" || state.cantVentas === '') {
            Alert.alert("Debes completar los Campos")
            } else {
            try {
                await firebase.db.collection("Cosechas").doc(crecimiento.id).set({
                    tipoPlanta: crecimiento.tipoPlanta,
                    fechaCosecha: state.fechaCosecha,
                    cantVentas: state.cantVentas
                });
                Alert.alert("Datos Ingresado!")
                borrarDatos()
    
            } catch (error) {
            console.log(error)
            }
        }
    };

    const borrarDatos = async () => {
        const dbRef = firebase.db
          .collection("Crecimientos")
          .doc(crecimiento.id);
        await dbRef.delete();
        props.navigation.navigate('Fases');
      };

    useEffect(() => {
        obtenerCrecimiento(props.route.params.crecimientoId)
    }, [])
    
    return(
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>

            <View style={styles.text}>
            < TextInput
                placeholder={crecimiento.tipoPlanta}
                value={crecimiento.tipoPlanta}
                editable={false}
                onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
            />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 200}}
                date={state.fechaCosecha}
                mode="date"
                placeholder="Ingrese Fecha de Cosecha"
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
                
                onDateChange={(value) => handleChangeText(value, "fechaCosecha")}
                value={"Fecha de Cosecha: " + state.fechaCosecha}
              />
            </View>

            <View style={styles.text}>
            < TextInput
                placeholder="Ingrese Cantidad de Paquetes para Vender"
                onChangeText={(value) => handleChangeText(value, "cantVentas")}
                value={state.cantVentas}
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

export default CrecimientoCosechaScreen;