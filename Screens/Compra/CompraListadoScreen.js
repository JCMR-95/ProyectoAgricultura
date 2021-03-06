import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const CompraListadoScreen = (props) => {

  const [compras, setCompras] = useState([]);

  useEffect(() => {
    firebase.db.collection("Compras").onSnapshot((querySnapshot) => {
      const compras = [];
      querySnapshot.docs.forEach((doc) => {
        const { tipoPlanta, fechaElab, fechaVenc } = doc.data();
        compras.push({
          id: doc.id,
          tipoPlanta,
          fechaElab,
          fechaVenc,
        });
      });
      setCompras(compras);
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
        <Button title = "Agregar Compra" onPress = {() => props.navigation.navigate('Compra de Semillas')}/>
        {
          compras.map(compra => {
            return(
              <ListItem key={compra.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Compra", {
                    compraId: compra.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={{
                    uri:
                      "https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/3/36/Longrass_Seed.png/revision/latest/scale-to-width-down/1200?cb=20150927172922",
                  }}
                  rounded
                />
                <View style={fechaCritica(compra.fechaVenc) ? styles.rojo : styles.verde}>
                  <ListItem.Content>
                    <ListItem.Title>{compra.tipoPlanta}</ListItem.Title>
                    <ListItem.Subtitle>{"Código: " + compra.id}</ListItem.Subtitle>
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

export default CompraListadoScreen;