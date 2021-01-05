import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const CrecimientoListadoScreen = (props) => {

  const [crecimientos, setCrecimientos] = useState([]);

  useEffect(() => {
    firebase.db.collection("Crecimientos").onSnapshot((querySnapshot) => {
      const crecimientos = [];
      querySnapshot.docs.forEach((doc) => {
        const { tipoPlanta, fechaTrasplante, ph, agregadoPH} = doc.data();
        crecimientos.push({
          id: doc.id,
          tipoPlanta,
          fechaTrasplante,
          ph,
          agregadoPH
        });
      });
      setCrecimientos(crecimientos);
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
        <Button title = "Agregar Crecimiento" onPress = {() => props.navigation.navigate('Agregar Crecimiento')}/>
        {
          crecimientos.map(crecimiento => {
            return(
              <ListItem key={crecimiento.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Crecimiento", {
                    crecimientoId: crecimiento.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={{
                    uri:
                      "https://images.vexels.com/media/users/3/127670/isolated/lists/1c400fa105ae69ed69e526f8a4a96a76-tina-de-planta-de-flor-plana.png",
                  }}
                  rounded
                />
                <View style={fechaCritica(crecimiento.fechaTrasplante) ? styles.rojo : styles.verde}>
                  <ListItem.Content>
                    <ListItem.Title>{crecimiento.tipoPlanta}</ListItem.Title>
                    <ListItem.Subtitle>{"Código: " + crecimiento.id}</ListItem.Subtitle>
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

export default CrecimientoListadoScreen;