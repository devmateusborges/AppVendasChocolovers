import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AppCard } from "../../components/AppCard";
import { AppMenu } from "../../components/AppMenu";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList, TypeStorageTemp } from "../../@types/types";
import { DeleteStorage, GetStorage } from "../../service/Storage";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { moneyFormat } from "../../utils/FuncUtils";
export function Storage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<TypeStorageTemp[]>([]);
  const [active, setNoActive] = useState<"yes" | "no">("yes");
  const [messageSearch, setMessageSearch] = useState("");
  //==============================================
  useFocusEffect(
    useCallback(() => {
      handlerGetAllStorage();
    }, [])
  );
  //==============================================
  const handlerGetAllStorage = async () => {
    const response = await GetStorage();
    setData(response);
  };
  //==============================================
  const handlerDelete = async (id: string, clientID: string) => {
    const response: TypeStorageTemp[] = await DeleteStorage(id, clientID);
    setData(response);
  };

  const handlerFilter = async (filter: string) => {
    if (filter !== "") {
      const filterData = data.filter((client: TypeStorageTemp) =>
        client.firstNameClient.toLowerCase().includes(filter.toLowerCase())
      );

      if (filterData.length == 0) {
        setMessageSearch("Venda não esta cadastrada!");
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

  const handlerFilterDelivered = async () => {
    const response: TypeStorageTemp[] = await GetStorage();
    const filterS = response.filter(
      (item: TypeStorageTemp) => item.active == "no"
    );
    setData(filterS);
  };
  //==============================================
  const handlerFilterNotDelivered = async () => {
    const response: TypeStorageTemp[] = await GetStorage();
    const filterS = response.filter(
      (item: TypeStorageTemp) => item.active == "yes"
    );
    setData(filterS);
  };
  //==============================================
  return (
    <>
      <View className="bg-[#d1637b] absolute w-full h-[80%] rounded-bl-[60vh]"></View>
      <View className="w-full h-[90%] flex flex-col p-2  absolute z-10  items-center">
        <AppMenu
          text="Vendas"
          active={true}
          routerBack="home"
          onclick={(text: string) => handlerFilter(text)}
          messageError={messageSearch}
        />
        <View className="w-[50%] flex flex-row items-center justify-center bg-[#ffff] p-2 rounded-b-lg">
          <TouchableOpacity
            onPress={() => handlerGetAllStorage()}
            className="mx-2 "
          >
            <Text className="font-bold">Todos</Text>
          </TouchableOpacity>
          <View className="border-r  border-l-black p-1"></View>
          {active == "yes" ? (
            <TouchableOpacity
              onPress={() => {
                handlerFilterNotDelivered(), setNoActive("no");
              }}
              className="mx-2"
            >
              <Text className="font-bold">Não Entregues</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handlerFilterDelivered(), setNoActive("yes");
              }}
              className="mx-2"
            >
              <Text className="font-bold">Entregues</Text>
            </TouchableOpacity>
          )}
        </View>
        <AppCard
          className=" bg-transparent shadow-none"
          children={data.map((storage, index) => (
            <View
              key={storage.id + index}
              className=" bg-white rounded-lg  mt-2"
            >
              <View className="w-full flex flex-row items-center relative">
                <View className="ml-2">
                  <Text className="text-[20px] font-bold capitalize text-[#949494] ">
                    {storage.firstNameClient + " " + storage.surNameClient}
                  </Text>
                  <Text className="font-semibold text-[#949494]">
                    {storage.phoneClient}
                  </Text>
                </View>
                <View className="flex flex-row absolute right-1 ">
                  <TouchableOpacity
                    className="ml-2"
                    onPress={() => handlerDelete(storage.id, storage.clientID)}
                  >
                    <MaterialIcons name="delete" size={24} color="#d86464" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="w-full  items-center justify-center p-2">
                <ScrollView>
                  <Text className="text-justify  text-[#747474] font-bold text-[15px]">
                    {storage.describe}
                  </Text>
                </ScrollView>
              </View>

              <View className="flex flex-col justify-center items-center   ">
                <View className="w-full flex flex-row items-center justify-center ">
                  <EvilIcons name="cart" size={25} color="#949494" />
                  <Text className="text-[20px] font-bold capitalize ml-2  text-[#949494] ">
                    Produto
                  </Text>
                </View>

                <View className="w-full flex flex-col  p-2  ">
                  <View className="w-[100%] flex flex-row items-center relative p-4 rounded-lg mt-2  bg-[#e6e7e7]">
                    <Ionicons name="md-egg-sharp" size={24} color="black" />
                    <Text className="text-[17px] font-bold text-[#3a3a3a]">
                      {storage.nameProduct}
                    </Text>
                    <Text>{storage.amount}X</Text>
                    <View className="absolute right-4">
                      <Text className="text-[17px] font-bold text-[#4d4d4d] bg-[#7abd6d] p-2 rounded-lg">
                        {moneyFormat(storage.priceProduct)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="w-full flex flex-row items-center justify-center mb-2 ">
                {storage.status == "owing" ? (
                  <Text className="bg-[#f33434] font-semibold text-[#ffffff] p-1 mr-2 rounded-lg text-[20px]">
                    Devendo
                  </Text>
                ) : (
                  <Text className="bg-[#6ba5a2] font-semibold text-[#ffffff] p-1 mr-2 rounded-lg text-[20px]">
                    Pago
                  </Text>
                )}

                <Text className="bg-[#ffa4a4] font-semibold text-[#ffffff] p-1 rounded-lg text-[20px]">
                  Total : {moneyFormat(storage.totalPrice)}
                </Text>
              </View>
            </View>
          ))}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("createstorage")}
          className=" h-14 absolute z-30 top-[100%]  right-5 "
        >
          <AntDesign name="pluscircle" size={50} color="#6fbd89" />
        </TouchableOpacity>
      </View>
    </>
  );
}
