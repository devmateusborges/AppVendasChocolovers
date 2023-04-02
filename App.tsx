import { Home } from "./src/screens/Home";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StatusBar, View } from "react-native";
import { Products } from "./src/screens/products/Products";
import { Client } from "./src/screens/client/Client";
import { Settings } from "./src/screens/settings/Settings";
import { Storage } from "./src/screens/storage/Storage";
import { CreateClient } from "./src/screens/client/CreateClient";
import { CreateProduct } from "./src/screens/products/CreateProduct";
import { CreateStorage } from "./src/screens/storage/CreateStorage";
import Toast from "react-native-toast-message";
import { ClientView } from "./src/screens/client/ClientView";
import { ClientUpdate } from "./src/screens/client/ClientUpdate";
import { ProductUpdate } from "./src/screens/products/ProductUpdate";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={true}
        backgroundColor={"#ca8ccf"}
      />
      <View className="w-full absolute z-30 top-6">
        <Toast position="top" bottomOffset={10} />
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
          <Stack.Screen name="storages" component={Storage} />

          <Stack.Screen name="createclient" component={CreateClient} />
          <Stack.Screen name="createproduct" component={CreateProduct} />
          <Stack.Screen name="createstorage" component={CreateStorage} />
          {/* @ts-ignore */}
          <Stack.Screen name="clientview" component={ClientView} />
          {/* @ts-ignore */}
          <Stack.Screen name="clientupdate" component={ClientUpdate} />
          {/* @ts-ignore */}
          <Stack.Screen name="productupdate" component={ProductUpdate} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
