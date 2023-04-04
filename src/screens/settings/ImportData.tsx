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

export function ImportData() {
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [storage, setStorage] = useState("");

  const handlerClient = (text: string) => {
    const response = SettingsService.ImportDataClient(text);
  };
  const handlerProduct = (text: string) => {
    const response = SettingsService.ImportDataClient(text);
  };
  const handlerStorage = (text: string) => {
    const response = SettingsService.ImportDataClient(text);
  };
  return (
    <>
      <View className="bg-[#AE63D1] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[90%] flex flex-col p-2  bg-[#ffff] absolute z-10  items-center">
        <AppMenu
          text="Importação de dados"
          active={false}
          routerBack="settings"
        />
        <AppCard
          className=" bg-transparent shadow-none"
          children={
            <View className="w-full flex flex-col">
              <View className="w-full flex flex-col items-center justify-center p-5 rounded-b-lg bg-[#8ccfc1] mt-5 shadow-2xl shadow-black">
                <Text className="text-[#ffffff] font-bold text-[25px]">
                  CLIENTES
                </Text>
                <View className="w-full flex felx-col mt-5 ">
                  <Text className="text-[#ffffff] text-[15px] font-semibold">
                    *Copie seus dados em json aqui
                  </Text>
                  <TextInput
                    className="w-full bg-[#ffffff] p-2 text-white rounded-lg mt-3"
                    placeholder="EX: {nome: 'Mateus'...}"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setClient}
                    value={client}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handlerClient(client)}
                  className="w-[50%] flex items-center justify-center mt-5 p-2 bg-[#4c746b] rounded-lg  font-bold"
                >
                  <Text className="text-white font-bold">Inserir dados</Text>
                </TouchableOpacity>
              </View>

              <View className="w-full flex flex-col items-center justify-center p-5 rounded-b-lg bg-[#da8ef1] mt-5  shadow-2xl shadow-black">
                <Text className="text-[#ffffff] font-bold text-[25px]">
                  PRODUTOS
                </Text>
                <View className="w-full flex felx-col mt-5 ">
                  <Text className="text-[#ffffff] text-[15px] font-semibold">
                    *Copie seus dados em json aqui
                  </Text>
                  <TextInput
                    className="w-full bg-[#ffffff] p-2 text-white rounded-lg mt-3"
                    placeholder="EX: {nome: 'Mateus'...}"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setProduct}
                    value={product}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handlerProduct(product)}
                  className="w-[50%] flex items-center justify-center mt-5 p-2 bg-[#664370] rounded-lg  font-bold"
                >
                  <Text className="text-white font-bold">Inserir dados</Text>
                </TouchableOpacity>
              </View>

              <View className="w-full flex flex-col items-center justify-center p-5 rounded-b-lg bg-[#d1637b] mt-5  shadow-2xl shadow-black">
                <Text className="text-[#ffffff] font-bold text-[25px]">
                  VENDAS
                </Text>
                <View className="w-full flex felx-col mt-5 ">
                  <Text className="text-[#ffffff] text-[15px] font-semibold">
                    *Copie seus dados em json aqui
                  </Text>
                  <TextInput
                    className="w-full bg-[#ffffff] p-2 text-white rounded-lg mt-3"
                    placeholder="EX: {nome: 'Mateus'...}"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setStorage}
                    value={storage}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handlerStorage(storage)}
                  className="w-[50%] flex items-center justify-center mt-5 p-2 bg-[#7e3c4a] rounded-lg  font-bold"
                >
                  <Text className="text-white font-bold">Inserir dados</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </View>
    </>
  );
}
