import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { AppMenu } from "../../components/AppMenu";
import { SettingsDeleteDB, SettingsService } from "../../service/Settings";
import { AppCard } from "../../components/AppCard";
import * as Clipboard from "expo-clipboard";
export function ExportData() {
  const [text, setText] = useState<String>("");

  const handlerExport = async () => {
    const response = await SettingsService.ExportData();
    await Clipboard.setStringAsync(JSON.stringify(response));
  };

  const fetchCopiedText = async () => {
    const text1 = await Clipboard.getStringAsync();
    setText(text1);
  };
  return (
    <>
      <View className="bg-[#AE63D1] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[90%] flex flex-col p-2  bg-[#ffff] absolute z-10  items-center">
        <AppMenu
          text="Exportação de dados"
          active={false}
          routerBack="settings"
        />
        <AppCard
          className=" bg-transparent shadow-none"
          children={
            <View>
              <Text className="text-end">{text}</Text>
              <TouchableOpacity
                onPress={() => handlerExport()}
                className="w-full bg-[#54acb8] p-5 flex items-center rounded-lg mt-5"
              >
                <Text className="text-white font-bold">Copiar Json</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => fetchCopiedText()}
                className="w-full bg-[#54acb8] p-5 flex items-center rounded-lg mt-5"
              >
                <Text className="text-white font-bold">Gerar JSON</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </>
  );
}
