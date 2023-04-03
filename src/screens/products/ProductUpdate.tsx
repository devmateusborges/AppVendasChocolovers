import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AppCard } from "../../components/AppCard";

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AppMenu } from "../../components/AppMenu";
import { AppInput } from "../../components/AppInput";
import { AppButton } from "../../components/AppButton";
import {
  CreateProductDB,
  GetByIdProduct,
  UpdateProduct,
} from "../../service/Products";
import { RouteProp } from "@react-navigation/native";
interface ProductView {
  route: RouteProp<{ params: { id: string } }, "params">;
}
export function ProductUpdate({ route }: ProductView) {
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [kg, setkg] = useState("");
  const [stock, setStock] = useState("");
  const [created, setCreated] = useState<any>();
  const [image, setImage] = useState("");
  //==============================================
  useEffect(() => {
    handlerSelect(route.params.id);
  }, []);
  //==============================================
  const handlerSelect = async (id: string) => {
    const response = await GetByIdProduct(id);
    setName(response[0].name);
    setDescribe(response[0].describe);
    setPrice(String(response[0].price));
    setkg(String(response[0].kg));
    setStock(String(response[0].stock));
    setCreated(response[0].created_at);
  };
  //==============================================
  const handlerCreate = async (
    id: string,
    name: string,
    describe: string,
    price: number,
    kg: number,
    stock: number,
    created_at: Date
  ) => {
    await UpdateProduct(id, name, describe, price, kg, stock, created_at);
  };
  //==============================================
  return (
    <>
      <View className="bg-[#da8ef1]   absolute w-full h-[70vh] rounded-bl-[60vh]"></View>

      <View className="w-full h-[80%] flex flex-col p-2  absolute z-10  items-center">
        <AppMenu text="Atualizar Produto" routerBack="products" />

        <View className="w-full flex flex-col bg-white h-full mt-10 rounded-xl p-2 item-center ">
          <View className="w-[70%]flex flex-col items-center ">
            <AppInput
              placeholder="EX: ovo trunfado..."
              className="h-[7vh] rounded-lg"
              label={"Nome"}
              onChangeText={setName}
              value={name}
            />
            <ScrollView className="w-full">
              <AppInput
                placeholder="EX: chocolate preto"
                className=" h-[7vh]"
                label={"Descrição"}
                onChangeText={setDescribe}
                value={describe}
              />
              <AppInput
                placeholder="EX: 14.60"
                className="h-[7vh]"
                label={"Preço"}
                keyboardType="numeric"
                onChangeText={setPrice}
                value={String(price)}
              />
              <AppInput
                placeholder="EX: 1k, 500g"
                className="h-[7vh]"
                label={"KG"}
                keyboardType="numeric"
                onChangeText={setkg}
                value={kg}
              />
              <AppInput
                placeholder="EX: 15"
                className="h-[7vh]"
                label={"Quantidade estoque"}
                keyboardType="numeric"
                onChangeText={setStock}
                value={stock}
              />
            </ScrollView>
            <AppButton
              onPress={() =>
                handlerCreate(
                  route.params.id,
                  name,
                  describe,
                  Number(price),
                  Number(kg),
                  Number(stock),
                  created
                )
              }
              className="bg-green-500 w-[50%] mt-3 "
              icon={<Ionicons name="create-outline" size={24} color="white" />}
              text="Atualizar"
            />
          </View>
        </View>
      </View>
    </>
  );
}
