import React, { useCallback, useEffect, useState } from "react";

import { AppMenu } from "../../components/AppMenu";
import { View, Text, ScrollView } from "react-native";
import { AppCard } from "../../components/AppCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { RootStackParamList, TypeSales } from "../../@types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { dateFormat, moneyFormat } from "../../utils/FuncUtils";
import { FontAwesome } from "@expo/vector-icons";
import { GetSales } from "../../service/Sales";
export function PaymentsOwing() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<TypeSales[]>([]);
  const [messageSearch, setMessageSearch] = useState("");
  const [search, setSearch] = useState("");
  //==============================================
  useEffect(() => {
    handlerFilter(search);
  }, [search]);
  //==============================================
  useFocusEffect(
    useCallback(() => {
      handlerGetAll();
    }, [])
  );
  //==============================================
  const handlerGetAll = async () => {
    const responseSales = await GetSales();
    const filterSales = responseSales.filter(
      (item: TypeSales) => item.status == "owing"
    );
    setData(filterSales);
  };

  //==============================================
  const handlerFilter = async (filter: string) => {
    if (filter !== "") {
      const filterData = data.filter((client: TypeSales) =>
        client.firstNameClient.toLowerCase().includes(filter.toLowerCase())
      );

      if (filterData.length == 0) {
        setMessageSearch("Esse Produto não esta cadastrado!");
      } else {
        setMessageSearch("");
        setData(filterData);
      }
    } else {
      const response = await GetSales();
      setData(response);
      setMessageSearch("");
    }
  };
  //==============================================
  return (
    <>
      <View className="bg-[#ee2020] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[96%]  flex flex-col p-2  absolute z-10  items-center">
        <AppMenu
          text="COBRANÇAS"
          active={true}
          routerBack="home"
          routerAdvance="paymentsowings"
          setText={setSearch}
          messageError={messageSearch}
        />
        <AppCard
          className=" bg-transparent shadow-none"
          children={
            <ScrollView>
              {data.map((item: TypeSales, index) => (
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
                      {dateFormat(String(item.paymentDate))}
                    </Text>
                    <Text className="bg-[#f14d4d] p-2 text-white font-bold rounded-lg">
                      {moneyFormat(item.totalPrice)}
                    </Text>
                  </View>
                  <View className="w-full flex flex-row items-center justify-center">
                    <Text className="text-[#585858] font-bold mr-1">
                      {item.amount}X
                    </Text>
                    <Text className="text-[#585858] font-bold">
                      {item.nameProduct}
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
