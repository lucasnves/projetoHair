import { Image, StyleSheet, Platform, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/GlobalContext';

export default function HomeScreen() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Ionicons size={180} name="person" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="extraMassiveBold">Profile</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="extraHugeBold">Step 1: Try it</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="large">npm run reset-project</ThemedText> to get a fresh{' '}
        </ThemedText>
      </ThemedView>

      <Button title="Log Out" onPress={handleSignOut} />
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
  headerImage: {
    color: '#dcdcdc',
    bottom: -45,
    left: 55,
    position: 'absolute',
  },
});
