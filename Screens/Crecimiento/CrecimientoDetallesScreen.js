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
    agregadoPH: ''
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

        <View style={fechaCritica(crecimiento.fechaTrasplante) ? styles.textCritico : styles.text}>
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
            placeholder="¿Agregó algo para modificar el PH (Opcional)"
            value={"Agregado al PH: " + crecimiento.agregadoPH}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "agregadoPH")}
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

export default CrecimientoDetallesScreen;