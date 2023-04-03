import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { Ionicons } from "@expo/vector-icons";
import { AppMenu } from "../../components/AppMenu";
import { CreateClientDB } from "../../service/Client";

export function CreateClient() {
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  //==============================================
  const handlerCreate = async (
    firstName: string,
    surName: string,
    email: string,
    phone: string,
    address: string
  ) => {
    await CreateClientDB(firstName, surName, email, phone, address);
  };
  //==============================================
  return (
    <>
      <View className="bg-[#8ccfc1] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>

      <View className="w-full h-[80%] flex flex-col p-2  absolute z-10  items-center ">
        <AppMenu text="Novo Cliente" routerBack="clients" />

        <View className="w-full flex flex-col bg-white h-full mt-10 rounded-xl p-2 item-center ">
          <ScrollView className="w-full  ">
            <View className="w-[100%] flex flex-col items-center p-2 ">
              <AppInput
                placeholder="EX: Mateus"
                className="h-[7vh] rounded-lg  "
                label={"Nome"}
                onChangeText={setFirstName}
                value={firstName}
              />
              <AppInput
                placeholder="EX: Borges"
                className="h-[7vh] rounded-lg "
                label={"Sobre nome"}
                onChangeText={setSurName}
                value={surName}
              />

              <AppInput
                placeholder="EX: (16) 9900-0000"
                className=" h-[7vh]"
                label={"Telefone"}
                keyboardType="numeric"
                onChangeText={setPhone}
                value={phone}
              />
              <AppInput
                placeholder="EX: Bairro, Rua, Numero"
                className="h-[7vh]"
                label={"Endereço"}
                onChangeText={setAdress}
                value={adress}
              />
              <AppInput
                placeholder="EX: mateus@gmail.com "
                className="h-[7vh]"
                label={"Email"}
                onChangeText={setEmail}
                value={email}
              />

              <AppButton
                onPress={() =>
                  handlerCreate(firstName, surName, email, phone, adress)
                }
                className="bg-green-500 w-[50%] mt-3 "
                icon={
                  <Ionicons name="create-outline" size={24} color="white" />
                }
                text="Criar"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
