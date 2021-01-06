import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import DatePicker from 'react-native-datepicker'
import firebase from '../../database/firebase';

const CosechaDetallesScreen = (props) => {

  const initialState = {
    id: '',
    tipoPlanta: '',
    fechaCosecha: '',
    cantVentas: ''
  };

  const [cosecha, setCosecha] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, dato) => {
    setCosecha({ ...cosecha, [dato]: value });
  };

  const obtenerCosecha = async(id) => {
    const dbRef = firebase.db.collection("Cosechas").doc(id);
    const doc = await dbRef.get();
    const cosecha = doc.data();
    setCosecha({ ...cosecha, id: doc.id });
    setLoading(false);
  }

  const borrarCosecha = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("Cosechas")
      .doc(props.route.params.cosechaId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Listado de Cosechas");
  };

  const confirmacionAlerta = () => {
    Alert.alert(
      "Borrar Cosecha",
      "¿Estás seguro de borrar esta Cosecha?",
      [
        { text: "Sí", onPress: () => borrarCosecha() },
        { text: "No" },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    obtenerCosecha(props.route.params.cosechaId)
  }, [])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>

      <View style={styles.text}>
              < TextInput 
                placeholder="Ingrese Tipo de Planta"
                onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
                editable={false}
                value={cosecha.tipoPlanta}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 200}}
                date={cosecha.fechaCosecha}
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
                value={cosecha.fechaCosecha}
              />
            </View>
      
            <View style={styles.text}>
            < TextInput
                placeholder="Ingrese Cantidad de Paquetes para Vender"
                onChangeText={(value) => handleChangeText(value, "cantVentas")}
                editable={false}
                value={cosecha.cantVentas}
            />
            </View>

        <View style={styles.button}>
          <Button color = "red" title ="Eliminar Compra" onPress = {() => confirmacionAlerta()}/>
        </View>
        
      </ScrollView>
    </View>
  );
  
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
  text: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textCritico: {
    flex: 1,
    padding: 0,
    backgroundColor: "#FFD800",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#A80303",
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

export default CosechaDetallesScreen;