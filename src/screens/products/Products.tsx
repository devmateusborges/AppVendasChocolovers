import React, { useCallback, useEffect, useState } from "react";

import { AppMenu } from "../../components/AppMenu";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AppCard } from "../../components/AppCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DeleteProduct, GetProduct } from "../../service/Products";
import { RootStackParamList, TypeProducts } from "../../@types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { moneyFormat } from "../../utils/FuncUtils";

export function Products() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<TypeProducts[]>([]);
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
    const response = await GetProduct();
    setData(response);
  };
  //==============================================
  const handlerDelete = async (id: string) => {
    const response = await DeleteProduct(id);
    await handlerGetAll();
  };
  //==============================================
  const handlerFilter = async (filter: string) => {
    if (filter !== "") {
      const filterData = data.filter((client: TypeProducts) =>
        client.name.toLowerCase().includes(filter.toLowerCase())
      );

      if (filterData.length == 0) {
        setMessageSearch("Esse Produto não esta cadastrado!");
      } else {
        setMessageSearch("");
        setData(filterData);
      }
    } else {
      const response = await GetProduct();
      setData(response);
      setMessageSearch("");
    }
  };
  //==============================================
  return (
    <>
      <View className="bg-[#da8ef1] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[96%]  flex flex-col p-2  absolute z-10  items-center">
        <AppMenu
          text="Produtos"
          active={true}
          routerBack="home"
          routerAdvance="createproduct"
          setText={setSearch}
          messageError={messageSearch}
        />
        <AppCard
          className=" bg-transparent shadow-none"
          children={data.map((product, index) => (
            <View key={product.id + index} className="mt-1 bg-white rounded-lg">
              <View
                key={product.id + index}
                className=" bg-white p-1  rounded-lg flex flex-row  relative "
              >
                {product.image !== "" ? (
                  <Image
                    className="w-16 h-16 rounded-full"
                    source={{
                      uri: product.image,
                    }}
                  />
                ) : (
                  <View className="w-[20%] flex justify-center">
                    <MaterialCommunityIcons
                      name="egg-easter"
                      size={50}
                      color="#cf8cca"
                    />
                  </View>
                )}
                <View className="w-60 flex flex-col my-2">
                  <Text className="text-[17px] text-justify font-bold text-[#949494]">
                    {product.name.substring(0, 20)}
                  </Text>
                  <Text className="text-justify font-semibold text-[#949494]">
                    {product.describe}
                  </Text>

                  <Text className="text-[17px] bg-green-200 font-semibold text-[#949494] p-1 rounded-lg">
                    Preço : {moneyFormat(product.price)}
                  </Text>
                </View>
                <View className="flex flex-row absolute right-1 mt-1">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("productupdate", { id: product.id })
                    }
                  >
                    <Entypo name="edit" size={24} color="#52c274" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handlerDelete(product?.id)}
                    className="ml-5"
                  >
                    <MaterialIcons name="delete" size={24} color="#d86464" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("createproduct")}
          className=" w-full h-14 absolute z-30 top-[93%]  flex flex-grow justify-end items-end"
        >
          <AntDesign name="pluscircle" size={50} color="#6fbd89" />
        </TouchableOpacity>
      </View>
    </>
  );
}
