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
import { TypeStorageTemp } from "../@types/types";
import { useFocusEffect } from "@react-navigation/native";
import { GetStorage, UpdateDelyvers } from "../service/Storage";
import { compareDate, dateFormat } from "../utils/FuncUtils";

export function Home() {
  const [storages, setStorages] = useState<TypeStorageTemp[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalOwing, setTotalOwing] = useState(0);
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
  //==============================================
  useFocusEffect(
    useCallback(() => {
      handlerGetAll();
      handlerPayments();
    }, [])
  );
  //==============================================
  const handlerGetAll = async () => {
    const response = await GetStorage();
    const filter = response.sort(compareDate);
    const filterActive = filter.filter(
      (item: TypeStorageTemp) => item.active == "yes"
    );

    setStorages(filterActive);
  };
  //==============================================

  const handlerDelivery = async ({
    id,
    clientID,
    productID,
    firstNameClient,
    surNameClient,
    phoneClient,
    nameProduct,
    priceProduct,
    totalPrice,
    deliveryDate,
    paymentDate,
    describe,
    status,
    active,
    amount,
    created_at,
    additionalPrice,
  }: TypeStorageTemp) => {
    const response = await UpdateDelyvers(
      id,
      clientID,
      productID,
      firstNameClient,
      surNameClient,
      phoneClient,
      nameProduct,
      priceProduct,
      totalPrice,
      deliveryDate,
      paymentDate,
      describe,
      status,
      "no",
      amount,
      created_at,
      additionalPrice
    );
    const filter = response.sort(compareDate);
    const filterOwings = filter.filter(
      (item: TypeStorageTemp) => item.active == "yes"
    );
    setStorages(filterOwings);
  };
  //==============================================
  const handlerPayments = async () => {
    const response: TypeStorageTemp[] = await GetStorage();
    const filterOwings: TypeStorageTemp[] = response.filter(
      (item: TypeStorageTemp) => item.status == "owing"
    );
    const filterPaits: TypeStorageTemp[] = response.filter(
      (item: TypeStorageTemp) => item.status == "pait"
    );
    let devendo = 0;
    for (let i = 0; i < filterOwings.length; i++) {
      devendo += filterOwings[i].totalPrice;
    }
    setTotalOwing(devendo);
    let pagos = 0;
    for (let i = 0; i < filterPaits.length; i++) {
      pagos += filterPaits[i].totalPrice;
    }
    setTotalPaid(pagos);
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
                      onPress={() => handlerDelivery(item)}
                      className="flex flex-row items-center absolute right-1 bg-[#6962c4] rounded-lg  p-2"
                    >
                      <Text className="text-white font-bold">Entregue</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex flex-row items-center mb-1">
                    <Text className="text-[16px] font-bold text-[#5a5a5a]">
                      {item.nameProduct}
                    </Text>
                    <Text className="text-[16px] ml-2 font-bold text-[#5a5a5a]">
                      {item.amount}X
                    </Text>
                  </View>
                  <View className="w-full flex flex-row justify-end">
                    <Text className="text-[15px] font-bold text-[#ff3333] text-center">
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
            nameRoute="paymentspait"
            icon={<MaterialIcons name="groups" size={30} color="#9e9e9e" />}
          />
          <AppCardFeedBack
            className="w-[50%] h-[100%]"
            text="Receber"
            nameRoute="paymentsowing"
            color="text-red-400"
            money={totalOwing}
            icon={<MaterialIcons name="groups" size={30} color="#9e9e9e" />}
          />
        </View>
      </View>
    </>
  );
}
