import { Home } from "./src/screens/Home";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StatusBar, View } from "react-native";
import { Products } from "./src/screens/products/Products";
import { Client } from "./src/screens/client/Client";
import { Settings } from "./src/screens/settings/Settings";
import { Sales } from "./src/screens/sales/Sales";
import { CreateClient } from "./src/screens/client/CreateClient";
import { CreateProduct } from "./src/screens/products/CreateProduct";
import { CreateSales } from "./src/screens/sales/CreateSales";
import Toast from "react-native-toast-message";
import { ClientView } from "./src/screens/client/ClientView";
import { ClientUpdate } from "./src/screens/client/ClientUpdate";
import { ProductUpdate } from "./src/screens/products/ProductUpdate";
import { PaymentsOwing } from "./src/screens/Payments/Owing";
import { PaymentsPait } from "./src/screens/Payments/Pait";
import { AppLoading } from "./src/components/AppLoading";
import store from "./src/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={true}
        backgroundColor={"#ca8ccf"}
      />
      <Provider store={store}>
        <View className="w-full absolute z-30 top-6">
          <Toast position="top" bottomOffset={10} />
        </View>
        <View className="w-full flex items-center justify-center absolute z-30  ">
          <AppLoading />
        </View>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="clients" component={Client} />
            <Stack.Screen name="products" component={Products} />
            <Stack.Screen name="settings" component={Settings} />
            <Stack.Screen name="sales" component={Sales} />

            <Stack.Screen name="createclient" component={CreateClient} />
            <Stack.Screen name="createproduct" component={CreateProduct} />
            <Stack.Screen name="createsales" component={CreateSales} />
            {/* @ts-ignore */}
            <Stack.Screen name="clientview" component={ClientView} />
            {/* @ts-ignore */}
            <Stack.Screen name="clientupdate" component={ClientUpdate} />
            {/* @ts-ignore */}
            <Stack.Screen name="productupdate" component={ProductUpdate} />

            <Stack.Screen name="paymentsowing" component={PaymentsOwing} />
            <Stack.Screen name="paymentspait" component={PaymentsPait} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
