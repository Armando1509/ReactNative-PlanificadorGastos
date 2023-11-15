import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ListadoGastos = () => {
  return (
    <View style={styles.contenedor} >
      <Text style={styles.titulo} >Gastos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    contenedor:{
        marginTop: 70,
    },
    titulo:{
        color: '#64748b',
        fontSize: 30,
        textAlign:'center',
        fontWeight: '700'
    }
})

export default ListadoGastos;
