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
 
const SembradoTrasplanteScreen = (props) => {

    const initialState = {
        id: '',
        tipoPlanta: ''
    };

    const [state, setState] = useState({
        fechaTrasplante: '',
        sector: '',
        cantPlantas: '',
        tipoCultivo: ''
    });

    const [sembrado, setSembrado] = useState(initialState);

    const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
    };

    const obtenerSembrado = async(id) => {
        const dbRef = firebase.db.collection("Sembrados").doc(id);
        const doc = await dbRef.get();
        const sembrado = doc.data();
        setSembrado({ ...sembrado, id: doc.id });
    };

    const trasplantar = async () => {
        if (state.fechaTrasplante === "" || state.sector === "" || state.cantPlantas === "" || state.tipoCultivo === "") {
            Alert.alert("Debes completar los Campos")
            } else {
            try {
                await firebase.db.collection("Trasplantes").doc(sembrado.id).set({
                    tipoPlanta: sembrado.tipoPlanta,
                    fechaTrasplante: state.fechaTrasplante,
                    sector: state.sector,
                    cantPlantas: state.cantPlantas,
                    tipoCultivo: state.tipoCultivo
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
          .collection("Sembrados")
          .doc(sembrado.id);
        await dbRef.delete();
        props.navigation.navigate('Fases');
      };

    useEffect(() => {
        obtenerSembrado(props.route.params.sembradoId)
    }, [])
    
    return(
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>

            <View style={styles.text}>
            < TextInput
                placeholder={sembrado.tipoPlanta}
                value={sembrado.tipoPlanta}
                editable={false}
                onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
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
            < TextInput
                placeholder="Ingrese Sector"
                onChangeText={(value) => handleChangeText(value, "sector")}
                value={state.sector}
            />
            </View>

            <View style={styles.text}>
            < TextInput
                placeholder="Ingrese Cantidad de Plantas"
                onChangeText={(value) => handleChangeText(value, "cantPlantas")}
                value={state.cantPlantas}
            />
            </View>

            <View style={styles.text}>
            < TextInput
                placeholder="Ingrese Tipo de Cultivo"
                onChangeText={(value) => handleChangeText(value, "tipoCultivo")}
                value={state.tipoCultivo}
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

export default SembradoTrasplanteScreen;