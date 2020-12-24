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

const TrasplanteDetallesScreen = (props) => {

  const initialState = {
    id: '',
    tipoPlanta: '',
    fechaTrasplante: '',
    sector: '',
    cantPlantas: '',
    tipoCultivo: ''
  };

  const [trasplante, setTrasplante] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, dato) => {
    setTrasplante({ ...trasplante, [dato]: value });
  };

  const obtenerTrasplante = async(id) => {
    const dbRef = firebase.db.collection("Trasplantes").doc(id);
    const doc = await dbRef.get();
    const trasplante = doc.data();
    setTrasplante({ ...trasplante, id: doc.id });
    setLoading(false);
  }

  const borrarTrasplante = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("Trasplantes")
      .doc(props.route.params.trasplanteId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Listado de Trasplantes");
  };

  const confirmacionAlerta = () => {
    Alert.alert(
      "Borrar Trasplante",
      "¿Estás seguro de borrar este Trasplante?",
      [
        { text: "Sí", onPress: () => borrarTrasplante() },
        { text: "No" },
      ],
      {
        cancelable: true,
      }
    );
  };

  const enviarTrasplante = () => {
    Alert.alert(
      "Realizar Crecimiento",
      "¿Estás seguro de hacer crecer a la Planta?",
      [
        { text: "Sí", onPress: () => props.navigation.navigate("Realizar Crecimiento", {trasplanteId: trasplante.id,})},
        { text: "No"},
      ],
      {
        cancelable: true,
      }
    );
    

  };


  useEffect(() => {
    obtenerTrasplante(props.route.params.trasplanteId)
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
            value={trasplante.tipoPlanta}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Fecha de Trasplante"
            value={"Fecha de Trasplante: " + trasplante.fechaTrasplante}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "fechaTrasplante")}
          />
        </View>        

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Sector"
            value={"Sector: " + trasplante.sector}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "sector")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Cantidad de Plantas"
            value={"Cantidad de Plantas: " + trasplante.cantPlantas}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "cantPlantas")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Tipo de Cultivo"
            value={"Tipo de Cultivo: " + trasplante.tipoCultivo}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "tipoCultivo")}
          />
        </View>

        <View style={styles.button}>
          <Button color = "green" title ="Listo para Crecer" onPress = {() => enviarTrasplante()}/>
          <Button color = "red" title ="Eliminar Trasplante" onPress = {() => confirmacionAlerta()}/>
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

export default TrasplanteDetallesScreen;