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
                      "https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png",
                  }}
                  rounded
                />
                <ListItem.Content>
                  <ListItem.Title>{compra.tipoPlanta}</ListItem.Title>
                  <ListItem.Subtitle>{"Código: " + compra.id}</ListItem.Subtitle>
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

export default CompraListadoScreen;