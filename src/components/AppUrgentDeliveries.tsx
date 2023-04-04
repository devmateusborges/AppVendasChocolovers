import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TypeProducts } from "../@types/types";
import { dateFormat } from "../utils/FuncUtils";

function AppUrgentDeliverie({ ...rest }) {
  const [product, setProduct] = useState<TypeProducts[]>();
  return (
    <View
      className="rounded-lg p-3  flex flex-col  bg-white  h-auto justify-center mt-2"
      {...rest}
    >
      <View className="w-full felx flex-row  h-auto m-2 relative">
        <Text className="text-[18px] font-bold text-[#5a5a5a]">
          {rest.firstName + " " + rest.surName}
        </Text>
        <TouchableOpacity className="flex flex-row items-center absolute right-1 bg-[#6962c4] rounded-lg  p-2">
          <Text className="text-white font-bold">Entregue</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row ">
        <Text className="text-[15px] font-bold text-[#5a5a5a]">Produto : </Text>

        <Text>{rest.nameProduct}</Text>
      </View>
      <View>
        <Text className="text-[15px] font-bold text-[#5a5a5a] text-center">
          {dateFormat(rest.dataDelivery)}
        </Text>
      </View>
    </View>
  );
}

const AppUrgentDeliveries = styled(AppUrgentDeliverie);
