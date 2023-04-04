import React, { useCallback, useState } from "react";

import { AppMenu } from "../../components/AppMenu";
import { ScrollView, View, Text } from "react-native";
import { AppCard } from "../../components/AppCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GetProduct } from "../../service/Products";
import {
  RootStackParamList,
  TypeProducts,
  TypeStorageTemp,
} from "../../@types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { dateFormat, moneyFormat } from "../../utils/FuncUtils";
import { FontAwesome } from "@expo/vector-icons";
import { GetStorage } from "../../service/Storage";
export function PaymentsPait() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<TypeStorageTemp[]>([]);
  const [messageSearch, setMessageSearch] = useState("");
  //==============================================
  useFocusEffect(
    useCallback(() => {
      handlerGetAll();
    }, [])
  );
  //==============================================
  const handlerGetAll = async () => {
    const responseStorage = await GetStorage();
    const filterStorage = responseStorage.filter(
      (item: TypeStorageTemp) => item.status == "pait"
    );
    setData(filterStorage);
  };

  //==============================================
  const handlerFilter = async (filter: string) => {
    if (filter !== "") {
      const filterData = data.filter((client: TypeStorageTemp) =>
        client.firstNameClient.toLowerCase().includes(filter.toLowerCase())
      );

      if (filterData.length == 0) {
        setMessageSearch("Esse Produto não esta cadastrado!");
      } else {
        setMessageSearch("");
        setData(filterData);
      }
    } else {
      const response = await GetStorage();
      setData(response);
      setMessageSearch("");
    }
  };
  //==============================================
  return (
    <>
      <View className="bg-[#2fa373] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[96%]  flex flex-col p-2  absolute z-10  items-center">
        <AppMenu
          text="Positivos"
          active={true}
          routerBack="home"
          routerAdvance="paymentsowings"
          onclick={(text: string) => handlerFilter(text)}
          messageError={messageSearch}
        />
        <AppCard
          className=" bg-transparent shadow-none"
          children={
            <ScrollView>
              {data.map((item: TypeStorageTemp, index) => (
                <View
                  key={item.id + index}
                  className="bg-white p-2 rounded-lg mt-2"
                >
                  <View className="w-full flex flex-row items-center justify-center ">
                    <FontAwesome name="user" size={24} color="#585858" />
                    <Text className="ml-5 text-[#585858] text-[15px] font-bold">
                      {item.firstNameClient}
                    </Text>
                    <Text className="text-[#585858] w-[30%] text-[15px] font-bold mx-5">
                      {item.nameProduct}
                    </Text>
                    <Text className="bg-[#2fa373] p-2 text-white font-bold rounded-lg">
                      {moneyFormat(item.totalPrice)}
                    </Text>
                  </View>
                  <View className="w-full flex flex-row items-center justify-center">
                    <Text className="text-[#585858] font-bold">
                      {dateFormat(String(item.paymentDate))}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          }
        />
      </View>
    </>
  );
}
