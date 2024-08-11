import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Player } from '@/components/Player';
import { VerseDay } from '@/components/VerseDay';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo-church.png')}
          style={styles.logo}
        />
      }>
      <ThemedView style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:10, height:'100%' }}>
        <ThemedText
          type="title"
          style={{ textAlign: 'center', marginTop: 16, marginBottom: 8 }}>
          Bienvenidos a nuestra radio
        </ThemedText>
        <VerseDay />
        <Player />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50
  },
});
