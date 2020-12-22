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

const CompraDetallesScreen = (props) => {

  const initialState = {
    id: '',
    tipoPlanta: '',
    fechaElab: '',
    fechaVenc: ''
  };

  const [compra, setCompra] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, dato) => {
    setCompra({ ...compra, [dato]: value });
  };

  const obtenerCompra = async(id) => {
    const dbRef = firebase.db.collection("Compras").doc(id);
    const doc = await dbRef.get();
    const compra = doc.data();
    setCompra({ ...compra, id: doc.id });
    setLoading(false);
  }

  const borrarCompra = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("Compras")
      .doc(props.route.params.compraId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Listado de Compras");
  };

  const confirmacionAlerta = () => {
    Alert.alert(
      "Borrar Compra",
      "¿Estás seguro de borrar esta Compra?",
      [
        { text: "Sí", onPress: () => borrarCompra() },
        { text: "No" },
      ],
      {
        cancelable: true,
      }
    );
  };

  const enviarSembrado = () => {
    Alert.alert(
      "Sembrar Semillas",
      "¿Estás seguro de Sembrar este tipo de Planta?",
      [
        { text: "Sí", onPress: () => props.navigation.navigate("Sembrar Semillas", {compraId: compra.id,})},
        { text: "No"},
      ],
      {
        cancelable: true,
      }
    );
    

  };


  useEffect(() => {
    obtenerCompra(props.route.params.compraId)
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
            value={compra.tipoPlanta}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "tipoPlanta")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Fecha de Elaboracion"
            value={"Fecha de Elaboracion: " + compra.fechaElab}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "fechaElab")}
          />
        </View>

        <View style={styles.text}>
          < TextInput
            placeholder="Ingrese Fecha de Vencimiento"
            value={"Fecha de Vencimiento: " + compra.fechaVenc}
            editable={false}
            onChangeText={(value) => handleChangeText(value, "fechaVenc")}
          />
        </View>

        <View style={styles.button}>
          <Button color = "green" title ="Listo para Sembrar" onPress = {() => enviarSembrado()}/>
          <Button color = "red" title ="Eliminar Compra" onPress = {() => confirmacionAlerta()}/>
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

export default CompraDetallesScreen;