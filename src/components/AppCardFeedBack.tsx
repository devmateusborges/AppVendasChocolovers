import { TouchableOpacity, Text, View } from "react-native";
import { styled } from "nativewind";
import { Foundation } from "@expo/vector-icons";
import React from "react";
import { moneyFormat } from "../utils/FuncUtils";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../@types/types";

function ButtonStyled({ ...rest }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View
      className=" flex  bg-white  ml-2  rounded-lg shadow-lg shadow-black"
      {...rest}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate(rest.nameRoute)}
        className="w-full flex flex-col items-center justify-center"
      >
        <View className="flex flex-row">
          {rest.icon}

          <Text className="mt-2 font-bold text-[#9e9e9e] text-[15px] ml-2">
            {rest.text}
          </Text>
        </View>
        <View className="w-full flex flex-row items-center justify-center mt-2">
          <Text
            className={`font-bold ${
              rest.money > 5 ? "text-[25px]" : "text-[30px]"
            } ${rest.color}`}
          >
            {moneyFormat(rest.money)}
          </Text>
        </View>
        <View className="w-auto flex flex-row items-end justify-end">
          <View className="w-full flex items-end justify-end mr-2 ">
            <Foundation name="dollar-bill" size={24} color="#9e9e9e" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const AppCardFeedBack = styled(ButtonStyled);

export { AppCardFeedBack };
