import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./Pages/Home";
import AboutPage from "./Pages/About";
import Checkout from "./Pages/Checkout";
import Navigator1 from "./Pages/Navigator";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import OrderStatusPage from "./Pages/OrderStatusPage";
import ConfirmedOrders from "./Pages/ConfirmedOrders";
import MoreOptions from "./Pages/MoreOptions";
import RawMaterial from "./Pages/RawMaterial";
import ChangePassword from "./Pages/ChangePassword";
import OrderHistory from "./Pages/OrderHistory";
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen name="About" component={AboutPage} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="OrderStatusPage" component={OrderStatusPage} />
          <Stack.Screen name="ConfirmedOrders" component={ConfirmedOrders} />
          <Stack.Screen name="MoreOptions" component={MoreOptions} />
          <Stack.Screen name="RawMaterial" component={RawMaterial} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});