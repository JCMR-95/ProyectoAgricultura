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

const SembradoDetallesScreen = (props) => {

  const initialState = {
    id: '',
    tipoPlanta: '',
    fechaTrasplante: '',
    fechaPlantacion: ''
  };

  const [sembrado, setSembrado] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, dato) => {
    setSembrado({ ...sembrado, [dato]: value });
  };

  const obtenerSembrado = async(id) => {
    const dbRef = firebase.db.collection("Sembrados").doc(id);
    const doc = await dbRef.get();
    const sembrado = doc.data();
    setSembrado({ ...sembrado, id: doc.id });
    setLoading(false);
  }

  const borrarSembrado = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("Sembrados")
      .doc(props.route.params.sembradoId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Listado de Sembrados");
  };

  const confirmacionAlerta = () => {
    Alert.alert(
      "Borrar Sembrado",
      "¿Estás seguro de borrar este Sembrado?",
      [
        { text: "Sí", onPress: () => borrarSembrado() },
        { text: "No" },
      ],
      {
        cancelable: true,
      }
    );
  };

  const enviarSembrado = () => {
    Alert.alert(
      "Realizar Trasplante",
      "¿Estás seguro de Trasplantar?",
      [
        { text: "Sí", onPress: () => props.navigation.navigate("Realizar Trasplante", {sembradoId: sembrado.id,})},
        { text: "No"},
      ],
      {
        cancelable: true,
      }
    );
  };

  var fechaCritica = (fechaLimite) => {

    var dia = new Date().getDate(); 
    var mes = new Date().getMonth() + 1; 
    var ano = new Date().getFullYear(); 

    if(dia < 10){
      dia = "0" + dia
    }
    if(mes < 10){
      mes = "0" + mes
    }

    var fechaHoy = ano + "-" + mes + "-" + dia;

    var restaFechas = new Date(fechaHoy).getTime() - new Date(fechaLimite).getTime();
    var valorNumerico = Math.floor(restaFechas / (1000 * 60 * 60 * 24));

    var critico = false

    if((valorNumerico >= -2)){
      critico = true;
    }
    return critico
  }


  useEffect(() => {
    obtenerSembrado(props.route.params.sembradoId)
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
            value={sembrado.tipoPlanta}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
          />
        </View>

        <View style={fechaCritica(sembrado.fechaTrasplante) ? styles.textCritico : styles.text}>
          < TextInput
            placeholder="Ingrese Fecha de Trasplante"
            value={"Fecha de Trasplante: " + sembrado.fechaTrasplante}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "fechaTrasplante")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Fecha de Plantación"
            value={"Fecha de Plantación: " +sembrado.fechaPlantacion}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "fechaPlantacion")}
          />
        </View>

        <View style={styles.button}>
          <Button color = "green" title ="Listo para Trasplantar" onPress = {() => enviarSembrado()}/>
          <Button color = "red" title ="Eliminar Sembrado" onPress = {() => confirmacionAlerta()}/>
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

export default SembradoDetallesScreen;