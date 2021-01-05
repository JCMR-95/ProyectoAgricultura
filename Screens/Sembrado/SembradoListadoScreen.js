import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const SembradoListadoScreen = (props) => {

  const [sembrados, setSembrados] = useState([]);

  useEffect(() => {
    firebase.db.collection("Sembrados").onSnapshot((querySnapshot) => {
      const sembrados = [];
      querySnapshot.docs.forEach((doc) => {
        const { tipoPlanta, fechaTrasplante, fechaPlantacion } = doc.data();
        sembrados.push({
          id: doc.id,
          tipoPlanta,
          fechaTrasplante,
          fechaPlantacion,
        });
      });
      setSembrados(sembrados);
    });
  }, []);

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

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title = "Agregar Sembrado" onPress = {() => props.navigation.navigate('Agregar Sembrado')}/>
        {
          sembrados.map(sembrado => {
            return(
              <ListItem key={sembrado.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Sembrado", {
                    sembradoId: sembrado.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={{
                    uri:
                      "https://images.vexels.com/media/users/3/201197/isolated/lists/c688e39bf4e07c2ea1aa3b496b3a5f02-icono-plano-de-semillas-germinadas.png",
                  }}
                  rounded
                />
                <View style={fechaCritica(sembrado.fechaTrasplante) ? styles.rojo : styles.verde}>
                  <ListItem.Content>
                    <ListItem.Title>{sembrado.tipoPlanta}</ListItem.Title>
                    <ListItem.Subtitle>{"Código: " + sembrado.id}</ListItem.Subtitle>
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
      backgroundColor: '#5FD417',
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

export default SembradoListadoScreen;