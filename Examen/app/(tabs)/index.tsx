import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { Video } from 'expo-av';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const handleLogoPress = async () => {
    const url = 'https://www.linkedin.com/in/esteban-arévalo-49e'; // Ensure correct LinkedIn URL
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    } catch (error) {
      console.error('An error occurred while trying to open the URL:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }

    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenido!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Hola, mi nombre es Esteban</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Aqui estoy yo</ThemedText>
        <View style={styles.videoContainer}>
          <Video
            source={require('@/assets/Yo.mp4')}
            style={styles.video}
            shouldPlay
            isLooping
            isMuted
          />
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/LinkedIn.png')} // Path to your logo file
            style={styles.logo}
          />
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 8,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
