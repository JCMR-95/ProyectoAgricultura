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
                      "https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png",
                  }}
                  rounded
                />
                <ListItem.Content>
                  <ListItem.Title>{sembrado.tipoPlanta}</ListItem.Title>
                  <ListItem.Subtitle>{"Código: " + sembrado.id}</ListItem.Subtitle>
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

export default SembradoListadoScreen;