import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Head from './components/Head';
import MenuInferior from './components/MenuInferior';
import { useState } from 'react';

export default function App() {
  const [aba, setAba] = useState('inicio')

  return (
    <View style={styles.container}>
      <Head/>
      <StatusBar style="auto" />
      <MenuInferior ativa={aba} onMudar={setAba}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
