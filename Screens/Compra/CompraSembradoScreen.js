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
 
const CompraSembradoScreen = (props) => {

    const initialState = {
        id: '',
        tipoPlanta: ''
    };

    const [state, setState] = useState({
        fechaPlantacion: '',
        fechaTrasplante: ''
    });

    const [compra, setCompra] = useState(initialState);

    const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
    };

    const obtenerCompra = async(id) => {
        const dbRef = firebase.db.collection("Compras").doc(id);
        const doc = await dbRef.get();
        const compra = doc.data();
        setCompra({ ...compra, id: doc.id });
        setLoading(false);
    };

    const sembrar = async () => {
        if (state.fechaPlantacion === "" || state.fechaTrasplante === "") {
            Alert.alert("Debes completar los Campos")
            } else {
            try {
                await firebase.db.collection("Sembrados").doc(compra.id).set({
                    tipoPlanta: compra.tipoPlanta,
                    fechaPlantacion: state.fechaPlantacion,
                    fechaTrasplante: state.fechaTrasplante
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
          .collection("Compras")
          .doc(compra.id);
        await dbRef.delete();
        props.navigation.navigate('Fases');
      };

    useEffect(() => {
        obtenerCompra(props.route.params.compraId)
    }, [])
    
    return(
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>

            <View style={styles.text}>
            < TextInput
                placeholder={compra.tipoPlanta}
                value={compra.tipoPlanta}
                editable={false}
                onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
            />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 200}}
                date={state.fechaPlantacion}
                mode="date"
                placeholder="Ingrese Fecha de Plantación"
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

            <View style={styles.button}>
            <Button color = "green" title ="Confirmar" onPress = {() => sembrar()}/>
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

export default CompraSembradoScreen;