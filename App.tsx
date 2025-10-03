
import { Platform, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Index from './src/screens';
import { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Esconde a navigation bar do Android
    if (Platform.OS === 'android') {
      SystemNavigationBar.navigationHide();
    }
  }, []);


  
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Index />
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
