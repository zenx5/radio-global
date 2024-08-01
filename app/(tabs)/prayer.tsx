import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
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
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
          placeholder="Nombre"/>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
          placeholder="Telefono"/>
        <TextInput
          multiline
          style={{
            height: 200,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
            padding: 10,
          }}
          placeholder="Oración"/>
        <Button
          title="Enviar"
          color="#841584"
          accessibilityLabel="Enviar" />


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
