import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

function ButtonStyled({ ...rest }) {
  return (
    <TouchableOpacity
      className="rounded-lg p-3  flex flex-row justify-center items-center shadow-lg shadow-black"
      {...rest}
    >
      {rest.icon}
      <Text className="text-[15px] ml-2 font-bold text-[#ffffff]">
        {rest.text}
      </Text>
    </TouchableOpacity>
  );
}

const AppButton = styled(ButtonStyled);

export { AppButton };
