import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const CosechaListadoScreen = (props) => {

  const [cosechas, setCosechas] = useState([]);

  useEffect(() => {
    firebase.db.collection("Cosechas").onSnapshot((querySnapshot) => {
      const cosechas = [];
      querySnapshot.docs.forEach((doc) => {
        const { tipoPlanta, fechaCosecha, cantVentas} = doc.data();
        cosechas.push({
          id: doc.id,
          tipoPlanta,
          fechaCosecha,
          cantVentas
        });
      });
      setCosechas(cosechas);
    });
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title = "Agregar Cosecha" onPress = {() => props.navigation.navigate('Agregar Cosecha')}/>
        {
          cosechas.map(cosecha => {
            return(
                <ListItem key={cosecha.id} bottomDivider
                    onPress={() => {
                    props.navigation.navigate("Detalles de Cosecha", {
                        cosechaId: cosecha.id,
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
                <View style={styles.verde}>
                  <ListItem.Content>
                    <ListItem.Title>{cosecha.tipoPlanta}</ListItem.Title>
                    <ListItem.Subtitle>{"Cantidad de Paquetes Vendidos: " + cosecha.cantVentas}</ListItem.Subtitle>
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

export default CosechaListadoScreen;