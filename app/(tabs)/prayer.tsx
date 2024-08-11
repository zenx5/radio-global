
import { StyleSheet, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [prayer, setPrayer] = useState('');


  const handlerSubmit = async () => {
    Alert.alert('Alerta', 'En este momento no estamos recibiendo peticiones de oración, pronto estaremos habilitando este servicio')
    setName('')
    setPhone('')
    setPrayer('')
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/prayer.jpg')}
          style={{
            width: 420,
            height: 250
          }}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Envianos tu petición de oración</ThemedText>
      </ThemedView>
      <ThemedView>
        <Text style={{marginLeft: 10,}}>(Aún no disponible)</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
          placeholder="Nombre"/>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
          placeholder="Telefono"/>
        <TextInput
          value={prayer}
          onChangeText={setPrayer}
          multiline
          style={{
            height: 200,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
            justifyContent: 'flex-start',
            textAlignVertical: 'top',
          }}
          placeholder="Oración"/>
        <TouchableOpacity style={{ padding:10, margin:10, backgroundColor:'#841584'}} onPress={handlerSubmit}>
          <Text style={{ color:'white', textAlign:'center', fontSize:18 }}>Enviar</Text>
        </TouchableOpacity>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
