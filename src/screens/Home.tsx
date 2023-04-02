import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "../components/AppCardButton";
import { AppCard } from "../components/AppCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AppCardFeedBack } from "../components/AppCardFeedBack";
import { MaterialIcons } from "@expo/vector-icons";
import { AppUrgentDeliveries } from "../components/AppUrgentDeliveries";
import { TypeProducts, TypeStorageTemp } from "../@types/types";
import { useFocusEffect } from "@react-navigation/native";
import { GetClient } from "../asyncStorage/Client";
import { DeliveredStorage, GetStorage } from "../asyncStorage/Storage";
import { compareDate, dateFormat } from "../utils/FuncUtils";

export function Home() {
  const [storages, setStorages] = useState<TypeStorageTemp[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalOwing, setTotalOwing] = useState(0);

  useFocusEffect(
    useCallback(() => {
      handlerGetAll();
    }, [])
  );

  const handlerGetAll = async () => {
    const response = await GetStorage();
    const filter = response.sort(compareDate);
    setStorages(filter);
  };
  const buttonsMenu = [
    {
      name: "Clientes",
      icon: <SimpleLineIcons name="user" size={19} color="#9e9e9e" />,
      nameRouter: "clients",
    },
    {
      name: "Produtos",
      icon: (
        <MaterialCommunityIcons name="egg-easter" size={23} color="#9e9e9e" />
      ),
      nameRouter: "products",
    },
    {
      name: "Vendas",
      icon: <FontAwesome5 name="store" size={19} color="#9e9e9e" />,
      nameRouter: "storages",
    },
    {
      name: "Configu",
      icon: <Ionicons name="md-settings-outline" size={22} color="#9e9e9e" />,
      nameRouter: "settings",
    },
  ];

  const handlerDelete = async (id: string, clientID: string) => {
    const response = await DeliveredStorage(id, clientID);
    setStorages(response);
  };

  return (
    <>
      <View className="bg-[#a14bc9]  absolute w-full h-[70%] rounded-bl-[60vh]"></View>
      <View className="w-full h-full flex flex-col p-2  absolute z-10  items-center  justify-center ">
        <AppCard
          text={"Entregas Urgentes"}
          className="h-[63%] opacity-75"
          icon={
            <MaterialCommunityIcons
              name="book-open-variant"
              size={24}
              color="#9e9e9e"
            />
          }
          children={
            <ScrollView className="w-full h-[100%]">
              {storages.map((item, index) => (
                <View
                  key={item.id + index}
                  className="rounded-lg p-3  flex flex-col  bg-white  h-auto justify-center mt-2"
                >
                  <View className="w-full felx flex-row  h-auto m-2 relative">
                    <Text className="text-[18px] font-bold text-[#5a5a5a]">
                      {item.firstNameClient + " " + item.surNameClient}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handlerDelete(item.id, item.clientID)}
                      className="flex flex-row items-center absolute right-1 bg-[#6962c4] rounded-lg  p-2"
                    >
                      <Text className="text-white font-bold">Entregue</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex flex-row ">
                    <Text className="text-[15px] font-bold text-[#5a5a5a]">
                      Produto :
                    </Text>

                    <Text>{item.nameProduct}</Text>
                  </View>
                  <View>
                    <Text className="text-[15px] font-bold text-[#5a5a5a] text-center">
                      {dateFormat(String(item.deliveryDate))}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          }
        />
        <AppCard
          text={"Menu"}
          className="mt-2 "
          icon={<SimpleLineIcons name="menu" size={15} color="#9e9e9e" />}
          content={undefined}
        />
        <View className="w-full h-[10vh] mt-2 flex flex-row">
          {buttonsMenu.map((button, index) => (
            <Button
              key={button.name + index}
              text={button.name}
              className="w-[22%]"
              icon={button.icon}
              navigation={button.nameRouter}
            />
          ))}
        </View>

        <View className="w-full flex flex-row items-center justify-center p-2 ">
          <AppCardFeedBack
            className="w-[50%] h-[100%]"
            text="Pagos"
            color="text-green-400"
            money={totalPaid}
            icon={<MaterialIcons name="groups" size={30} color="#9e9e9e" />}
          />
          <AppCardFeedBack
            className="w-[50%] h-[100%]"
            text="Receber"
            color="text-red-400"
            money={totalOwing}
            icon={<MaterialIcons name="groups" size={30} color="#9e9e9e" />}
          />
        </View>
      </View>
    </>
  );
}
