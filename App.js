import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import NewTaskScreen from "./screens/NewTaskScreen";
import { Provider } from "react-redux";
import store from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="NewTask" component={NewTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
