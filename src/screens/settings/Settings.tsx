import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { AppMenu } from "../../components/AppMenu";
import { SettingsDeleteDB } from "../../service/Settings";

export function Settings() {
  return (
    <>
      <View className="bg-[#AE63D1] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[100vh] flex flex-col p-2  absolute z-10  items-center">
        <AppMenu text="Configurações" active={true} routerBack="home" />
        <Text>Configuração</Text>
        <TouchableOpacity
          className="w-full bg-[#fd0a0a] p-2 flex items-center rounded-lg"
          onPress={() => SettingsDeleteDB()}
        >
          <Text className="text-white font-bold">Delete All</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
