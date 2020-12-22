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
                      "https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png",
                  }}
                  rounded
                />
                <ListItem.Content>
                  <ListItem.Title>{trasplante.tipoPlanta}</ListItem.Title>
                  <ListItem.Subtitle>{"Código: " + trasplante.id}</ListItem.Subtitle>
                </ListItem.Content>
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
  });

export default TrasplanteListadoScreen;