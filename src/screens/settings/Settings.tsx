import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AppMenu } from "../../components/AppMenu";
import { AppCard } from "../../components/AppCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../@types/types";
import { useNavigation } from "@react-navigation/native";

import { handlerSyncTables, unsubscribe } from "../../service/Becackp";
import { LoadingSync, internetState } from "../../store/utilStore";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { deleteTablesASync } from "../../service/settings";

// To unsubscribe to these update, just use:

export function Settings() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const InternetLoading = useSelector(
    (state: RootState) => state.util.internetState
  );
  const dispatch = useDispatch();

  const handlerAsyncAll = async () => {
    const response1 = await handlerSyncTables();
  };
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
                onPress={() => handlerAsyncAll()}
                className="w-full bg-[#5493b8] p-5 flex items-center rounded-lg mt-5"
              >
                <Text className="text-white font-bold">Sincronizar dados</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-full bg-[#fd0a0a] p-5 flex items-center rounded-lg mt-5"
                onPress={() => deleteTablesASync()}
              >
                <Text className="text-white font-bold">Apagar Tudo</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </>
  );
}
