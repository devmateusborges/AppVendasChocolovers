import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AppCard } from "../../components/AppCard";

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AppMenu } from "../../components/AppMenu";
import { AppInput } from "../../components/AppInput";
import { AppButton } from "../../components/AppButton";
import { CreateProductDB } from "../../asyncStorage/Products";

export function CreateProduct() {
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [kg, setkg] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const handlerCreate = async (
    name: string,
    describe: string,
    price: number,
    kg: number,
    stock: number,
    image?: string
  ) => {
    await CreateProductDB(name, describe, price, kg, stock);
  };
  return (
    <>
      <View className="bg-[#da8ef1]   absolute w-full h-[70vh] rounded-bl-[60vh]"></View>

      <View className="w-full h-[80%] flex flex-col p-2  absolute z-10  items-center">
        <AppMenu text="Novo Produto" routerBack="products" />

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
                value={price}
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
                keyboardType="numeric"
                label={"Quantidade estoque"}
                onChangeText={setStock}
                value={stock}
              />
            </ScrollView>
            <AppButton
              onPress={() =>
                handlerCreate(
                  name,
                  describe,
                  Number(price),
                  Number(kg),
                  Number(stock)
                )
              }
              className="bg-green-500 w-[50%] mt-3 "
              icon={<Ionicons name="create-outline" size={24} color="white" />}
              text="Criar"
            />
          </View>
        </View>
      </View>
    </>
  );
}
