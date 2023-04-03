import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { Ionicons } from "@expo/vector-icons";
import { AppMenu } from "../../components/AppMenu";
import { GetByIdClient, UpdateClient } from "../../service/Client";
import { RouteProp } from "@react-navigation/native";
interface ClientView {
  route: RouteProp<{ params: { id: string } }, "params">;
}
export function ClientUpdate({ route }: ClientView) {
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [created, setcCreated] = useState<any>();
  const [owing, setOwing] = useState(0);
  const [paid, setcPaid] = useState(0);
  //==============================================
  useEffect(() => {
    handlerSelect(route.params.id);
  }, []);
  //==============================================
  const handlerSelect = async (id: string) => {
    const response = await GetByIdClient(id);
    setFirstName(response[0].firstName);
    setSurName(response[0].surName);
    setPhone(response[0].phone);
    setAdress(response[0].address);
    setEmail(response[0].email);
    setcCreated(response[0].created_at);
    setOwing(response[0].owing);
    setcPaid(response[0].paid);
  };
  //==============================================
  const handlerCreate = async (
    id: string,
    firstName: string,
    surName: string,
    email: string,
    phone: string,
    address: string,
    created_at: Date,
    owing: number,
    paid: number
  ) => {
    await UpdateClient(
      id,
      firstName,
      surName,
      email,
      phone,
      address,
      created_at,
      owing,
      paid
    );
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
                  handlerCreate(
                    route.params.id,
                    firstName,
                    surName,
                    email,
                    phone,
                    adress,
                    created,
                    owing,
                    paid
                  )
                }
                className="bg-green-500 w-[50%] mt-3 "
                icon={
                  <Ionicons name="create-outline" size={24} color="white" />
                }
                text="Atualizar"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
