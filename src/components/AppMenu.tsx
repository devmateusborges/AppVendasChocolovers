import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { styled } from "nativewind";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../@types/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

function MenuStyled({ ...rest }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [search, setsearch] = useState("");
  return (
    <>
      <View
        className="w-[90%] bg-white rounded-[20px] p-2  flex flex-row items-center shadow-2xl shadow-black z-20 relative"
        {...rest}
      >
        <TouchableOpacity onPress={() => navigation.navigate(rest.routerBack)}>
          <Ionicons
            name="chevron-back-circle-outline"
            size={34}
            color="#a3a3a3"
          />
        </TouchableOpacity>
        {rest.active ? (
          <>
            <TextInput
              className="w-[75%]"
              placeholder={rest.text}
              onChangeText={setsearch}
            />
            <TouchableOpacity onPress={() => rest.onclick(search)}>
              <Ionicons name="search-circle-sharp" size={44} color="#6fbd89" />
            </TouchableOpacity>
          </>
        ) : (
          <Text className="ml-2 text-[#a3a3a3] text-[20px] font-bold">
            {rest.text}
          </Text>
        )}
      </View>
      {rest.messageError != "" && (
        <View>
          <Text className="text-white">{rest.messageError}</Text>
        </View>
      )}
    </>
  );
}

const AppMenu = styled(MenuStyled);

export { AppMenu };
