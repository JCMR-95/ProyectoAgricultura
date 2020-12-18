import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
 
const CompraListadoScreen = (props) => {
    return (
        <View style = {styles.container}>
            <Text> Sección de Compras </Text>
        </View>
    );
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6CF616',
      alignItems: 'center',
      justifyContent: 'center',
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