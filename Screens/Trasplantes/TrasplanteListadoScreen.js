import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const TrasplanteListadoScreen = (props) => {

  const [trasplantes, setTrasplantes] = useState([]);

  useEffect(() => {
    firebase.db.collection("Trasplantes").onSnapshot((querySnapshot) => {
      const trasplantes = [];
      querySnapshot.docs.forEach((doc) => {
        const { tipoPlanta, fechaTrasplante, sector, cantPlantas, tipoCultivo} = doc.data();
        trasplantes.push({
          id: doc.id,
          tipoPlanta,
          fechaTrasplante,
          sector,
          cantPlantas,
          tipoCultivo,
        });
      });
      setTrasplantes(trasplantes);
    });
  }, []);

  var fechaActual = () => {
    var dia = new Date().getDate(); 
    var mes = new Date().getMonth() + 1; 
    var ano = new Date().getFullYear(); 

    var fechaHoy = ano + "-" + mes + "-" + dia;
    var fechaHoy = fechaHoy;

    return fechaHoy
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title = "Agregar Trasplante" onPress = {() => props.navigation.navigate('Agregar Trasplante')}/>
        {
          trasplantes.map(trasplante => {
            return(
              <ListItem key={trasplante.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Trasplante", {
                    trasplanteId: trasplante.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={{
                    uri:
                      "https://images.vexels.com/media/users/3/201075/isolated/lists/b893c17e341ed4f2734565958a642a77-planta-en-icono-de-maceta.png",
                  }}
                  rounded
                />
                <View style={fechaActual() === trasplante.fechaTrasplante ? styles.rojo : styles.verde}>
                  <ListItem.Content>
                    <ListItem.Title>{trasplante.tipoPlanta}</ListItem.Title>
                    <ListItem.Subtitle>{"Código: " + trasplante.id}</ListItem.Subtitle>
                  </ListItem.Content>
                </View>
              </ListItem>
            );
          })
        }
      </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6CF616',
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
    rojo: {
      elevation: 8,
      backgroundColor: "red",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60
    },
    verde: {
      elevation: 8,
      backgroundColor: "green",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60
    },
  });

export default TrasplanteListadoScreen;