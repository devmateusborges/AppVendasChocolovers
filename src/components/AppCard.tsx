import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

function CardStyled({ ...rest }) {
  return (
    <View
      className="w-full bg-white   rounded-[20px] p-3  flex flex-col shadow-2xl shadow-black h-auto"
      {...rest}
    >
      <View className="w-full flex flex-row items-center">
        {rest.icon}
        <Text className="text-[15px] ml-2 font-bold text-[#797979]">
          {rest.text}
        </Text>
      </View>
      {rest.children && (
        <ScrollView className="h-[95%] ">{rest.children}</ScrollView>
      )}
    </View>
  );
}

const AppCard = styled(CardStyled);

export { AppCard };
