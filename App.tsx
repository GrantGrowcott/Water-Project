import React, {useEffect} from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Bangers_400Regular } from "@expo-google-fonts/bangers";
import Home from "./components/Home";
import Calend from "./components/Calendar";
import Header from "./components/Header";
import Medical from "./components/Medical";


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Bangers_400Regular: Bangers_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => <Header />,
            animation: "none",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Calend" component={Calend} />
          <Stack.Screen name="Medical" component={Medical} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
