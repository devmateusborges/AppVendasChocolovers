import { TouchableOpacity, Text, View } from "react-native";
import { styled } from "nativewind";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../@types/types";

import React from "react";

function ButtonStyled({ ...rest }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View
      className=" flex items-center justify-center bg-white  ml-2  rounded-lg shadow-lg shadow-black"
      {...rest}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate(rest.navigation, {})}
        className="flex items-center justify-center"
      >
        {rest.icon}
        <Text className="mt-2 font-bold text-[#9e9e9e] text-[11px]">
          {rest.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Button = styled(ButtonStyled);

export { Button };
