import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AppCard } from "../../components/AppCard";
import { AppMenu } from "../../components/AppMenu";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  RootStackParamList,
  TypeClient,
  TypeStorageTemp,
} from "../../@types/types";
import { useFocusEffect } from "@react-navigation/native";
import { DeleteClient, GetClient } from "../../service/Client";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { moneyFormat } from "../../utils/FuncUtils";
import { GetStorage } from "../../service/Storage";
export function Client() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<TypeClient[]>([]);
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
    const response = await GetClient();
    setData(response);
  };
  //==============================================
  const handlerDelete = async (id: string) => {
    const response = await DeleteClient(id);
    await handlerGetAll();
  };
  //==============================================
  const handlerFilter = async (filter: string) => {
    if (filter !== "") {
      const filterData = data.filter((client: TypeClient) =>
        client.firstName.toLowerCase().includes(filter.toLowerCase())
      );

      if (filterData.length == 0) {
        setMessageSearch("Esse Produto não esta cadastrado!");
      } else {
        setMessageSearch("");
        setData(filterData);
      }
    } else {
      const response = await GetClient();
      setData(response);
      setMessageSearch("");
    }
  };
  //==============================================

  //==============================================
  return (
    <>
      <View className="bg-[#8ccfc1]  absolute w-full h-[70vh] rounded-bl-[60vh]"></View>

      <View className="w-full h-[96%] flex flex-col p-2  absolute z-10  items-center ">
        <AppMenu
          text="Clientes"
          active={true}
          routerBack="home"
          setText={setSearch}
          messageError={messageSearch}
        />

        <AppCard
          className=" bg-transparent shadow-none"
          children={data.map((client: TypeClient, index) => (
            <TouchableOpacity
              key={client.id + index}
              onPress={() =>
                navigation.navigate("clientview", { id: client.id })
              }
              className="mt-2 bg-white p-2 rounded-lg"
            >
              <View className="flex flex-row items-center relative">
                <Feather name="user-check" size={45} color="#949494" />
                <Text className="text-[20px] font-bold capitalize text-[#949494] ml-2">
                  {client.firstName.substring(0, 10) +
                    " " +
                    client.surName.substring(0, 10)}
                </Text>
                <View className="flex flex-row absolute right-1 ">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("clientupdate", { id: client.id })
                    }
                  >
                    <Entypo name="edit" size={24} color="#52c274" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handlerDelete(client?.id)}
                    className="ml-5"
                  >
                    <MaterialIcons name="delete" size={24} color="#d86464" />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text className="font-semibold text-[#949494]">
                  Telefone : {client?.phone}
                </Text>
                <Text className="font-semibold text-[#949494]">
                  Endereço : {client?.address.substring(0, 30) + "..."}
                </Text>
                <Text className="font-semibold text-[#949494]">
                  Email : {client?.email.substring(0, 30)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("createclient")}
          className=" w-full h-14 absolute z-30 top-[93%]  flex flex-grow justify-end items-end"
        >
          <AntDesign name="pluscircle" size={50} color="#6fbd89" />
        </TouchableOpacity>
      </View>
    </>
  );
}
