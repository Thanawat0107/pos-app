import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import useCustomFonts from './src/hooks/useCustomFonts';
import React, { useCallback } from 'react';
import Loading from './src/components/Loading';
import AppContent from './AppContent';
import * as ExpoLinking from "expo-linking"; // ✅ import ให้ถูก

// ✅ config linking (รองรับทั้ง Expo Go และ build จริง)
const linking = {
  prefixes: [ExpoLinking.createURL("/"), "posapp://"], // ✅ ใช้ ExpoLinking
  config: {
    screens: {
      RootTabs: {
        path: "",
        screens: {
          Home: "",
        },
      },
    },
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer linking={linking} onReady={onLayoutRootView}>
          <AppContent />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
