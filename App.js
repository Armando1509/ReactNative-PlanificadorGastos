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
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0');
    }
  };

  const handleGasto = gasto =>{
    if([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    } 
    if(gasto.id){
      const gastosActualizados = gastos.map(gastosState => gastosState.id === gasto.id ? gasto: gastosState)
      setGastos(gastosActualizados)
    }else{

      gasto.id = generarId()
      gasto.fecha = Date.now()
  
      setGastos([...gastos, gasto])
    }
    setModal(!modal)
    
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>
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
          <ListadoGastos
          gastos={gastos}
          setModal={setModal}
          setGasto={setGasto}
          />
        )}

</ScrollView>

      {modal&&(
        <Modal  
          animationType='slide'
          visible={modal}
        >
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
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
    minHeight: 400,
  },
  imagen:{
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right:30,
  }
});

export default App;
