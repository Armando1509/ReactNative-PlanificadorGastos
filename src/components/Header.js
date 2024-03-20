import React from 'react';
import {Text, SafeAreaView, View, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView>
      
        <Text style={styles.texto}>Planificador de Gastos By Conde</Text>
        {/* <Text style={styles.texto}>By Conde</Text> */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    
    texto:{
        textAlign: 'center',
        fontSize: 30,
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 20,
        
    }
})

export default Header;
