import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
} from 'react-native';

import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import {generarId} from './src/helpers'
import ListadoGastos from './src/components/ListadoGastos';

function App() {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([
    {id:1, cantidad: 500}
  ]);
  const [modal, setModal] = useState(false)

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0');
    }
  };

  const handleGasto = gasto =>{
    if(Object.values(gasto).includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    } 
    gasto.id = generarId()
    setGastos([...gastos, gasto])
    setModal(!modal)
    console.log(gasto);
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <Header />
        {isValidPresupuesto ? (
          <>
            <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
            
          </>
        ) : (
          <NuevoPresupuesto
            handleNuevoPresupuesto={handleNuevoPresupuesto}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
          />
        )}
      </View>

        {isValidPresupuesto && (
          <ListadoGastos/>
        )}

      {modal&&(
        <Modal  
          animationType='slide'
          visible={modal}
        >
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
          />
        </Modal>
      )}


      {isValidPresupuesto && (
        <Pressable onPress={()=> setModal(!modal)} >
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3b82f6',
  },
  imagen:{
    width: 60,
    height: 60,
    position: 'absolute',
    top: 30,
    right:30,
  }
});

export default App;
