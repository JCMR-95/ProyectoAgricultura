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
import firebase from '../../database/firebase';

const CrecimientoDetallesScreen = (props) => {

  const initialState = {
    id: '',
    tipoPlanta: '',
    fechaTrasplante: '',
    ph: '',
    agregarPH: ''
  };

  const [crecimiento, setCrecimiento] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, dato) => {
    setCrecimiento({ ...crecimiento, [dato]: value });
  };

  const obtenerCrecimiento = async(id) => {
    const dbRef = firebase.db.collection("Crecimientos").doc(id);
    const doc = await dbRef.get();
    const crecimiento = doc.data();
    setCrecimiento({ ...crecimiento, id: doc.id });
    setLoading(false);
  }

  const borrarCrecimiento = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("Crecimientos")
      .doc(props.route.params.crecimientoId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Listado de Crecimientos");
  };

  const confirmacionAlerta = () => {
    Alert.alert(
      "Borrar Crecimiento",
      "¿Estás seguro de borrar este Crecimiento?",
      [
        { text: "Sí", onPress: () => borrarCrecimiento() },
        { text: "No" },
      ],
      {
        cancelable: true,
      }
    );
  };

  const enviarCrecimiento = () => {
    Alert.alert(
      "Realizar Cosecha",
      "¿Estás seguro de cosechar esta Planta?",
      [
        { text: "Sí", onPress: () => props.navigation.navigate("Realizar Cosecha", {crecimientoId: crecimiento.id,})},
        { text: "No"},
      ],
      {
        cancelable: true,
      }
    );
    

  };


  useEffect(() => {
    obtenerCrecimiento(props.route.params.crecimientoId)
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
            value={crecimiento.tipoPlanta}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Fecha de Trasplante"
            value={"Fecha de Trasplante: " + crecimiento.fechaTrasplante}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "fechaTrasplante")}
          />
        </View>        

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese PH"
            value={"PH: " + crecimiento.ph}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "ph")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Cantidad de Plantas"
            value={"Cantidad de Plantas: " + crecimiento.agregarPH}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "agregarPH")}
          />
        </View>

        <View style={styles.button}>
          <Button color = "green" title ="Listo para Cosechar" onPress = {() => enviarCrecimiento()}/>
          <Button color = "red" title ="Eliminar Crecimiento" onPress = {() => confirmacionAlerta()}/>
        </View>
        
      </ScrollView>
    </View>
  );
  
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
  text: {
    flex: 1,
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

export default CrecimientoDetallesScreen;