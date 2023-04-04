import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { AppMenu } from "../../components/AppMenu";
import { SettingsDeleteDB } from "../../service/Settings";
import { AppCard } from "../../components/AppCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../@types/types";
import { useNavigation } from "@react-navigation/native";

export function Settings() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <>
      <View className="bg-[#AE63D1] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[90%] flex flex-col p-2  bg-[#ffff] absolute z-10  items-center">
        <AppMenu text="Configurações" active={false} routerBack="home" />
        <AppCard
          className=" bg-transparent shadow-none"
          children={
            <View>
              <Text className="text-justify text-[15px] text-[#ffffff] bg-[#646464] mt-5 p-5 rounded-lg font-bold">
                Atenção antes de selecionar qualquer opção. Nós não nos
                responsabilizamos por perdas de dados ou alteração. Atenção
                Acione o suporte se necessário!
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("exportdata")}
                className="w-full bg-[#54acb8] p-5 flex items-center rounded-lg mt-5"
              >
                <Text className="text-white font-bold">Exportar Dados</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("importdata")}
                className="w-full bg-[#54b86d] p-5 flex items-center rounded-lg mt-5"
              >
                <Text className="text-white font-bold">Importar Dados</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("exemple")}
                className="w-full bg-[#b85b54] p-5 flex items-center rounded-lg mt-5"
              >
                <Text className="text-white font-bold">Exemplos</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                className="w-full bg-[#fd0a0a] p-5 flex items-center rounded-lg mt-5"
                onPress={() => SettingsDeleteDB()}
              >
                <Text className="text-white font-bold">Apagar Tudo</Text>
              </TouchableOpacity> */}
            </View>
          }
        />
      </View>
    </>
  );
}
