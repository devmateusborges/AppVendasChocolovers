import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { AppMenu } from "../../components/AppMenu";
import { SettingsDeleteDB, SettingsService } from "../../service/Settings";
import { AppCard } from "../../components/AppCard";
import * as Clipboard from "expo-clipboard";
export function Exemple() {
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [storage, setStorage] = useState("");

  const fetchCopiedTextClient = async () => {
    const response = {
      id: "8aa14ec0-d2b7-11ed-afa1-0242ac120002",
      firstName: "Mateus",
      surName: "Borges",
      email: "mateus@gmail.com",
      phone: "1699582454",
      address: "jardim canada",
      created_at: "04/04/2023, 03:59:53",
      updeted_at: "04/04/2023, 03:59:53",
    };
    await Clipboard.setStringAsync(JSON.stringify(response));
    const text1 = await Clipboard.getStringAsync();
    setClient(text1);
  };
  const fetchCopiedTextProduct = async () => {
    const response = {
      id: "2798e990-d2b8-11ed-afa1-0242ac120002",
      name: "Coxinha",
      describe: "Coxinha de frango",
      price: 15,
      kg: 500,
      stock: 15,
      image: "",
      created_at: "04/04/2023, 03:59:53",
      updeted_at: "04/04/2023, 03:59:53",
    };
    await Clipboard.setStringAsync(JSON.stringify(response));
    const text1 = await Clipboard.getStringAsync();
    setProduct(text1);
  };
  const fetchCopiedTextStorage = async () => {
    const response = {
      id: "a79361d4-d2b8-11ed-afa1-0242ac120002",
      clientID: "8aa14ec0-d2b7-11ed-afa1-0242ac120002",
      productID: "2798e990-d2b8-11ed-afa1-0242ac120002",
      firstNameClient: "Mateus",
      surNameClient: "Borges",
      phoneClient: "1699582454",
      nameProduct: "Coxinha",
      priceProduct: 15,
      totalPrice: 15,
      deliveryDate: "04/07/2023, 03:59:53",
      paymentDate: "04/06/2023, 03:59:53",
      describe: "Sem descrição",
      status: "owing | pait",
      active: "yes | no",
      amount: 5,
      created_at: "04/04/2023, 03:59:53",
      updeted_at: "04/04/2023, 03:59:53",
    };
    await Clipboard.setStringAsync(JSON.stringify(response));
    const text1 = await Clipboard.getStringAsync();
    setStorage(text1);
  };
  return (
    <>
      <View className="bg-[#AE63D1] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>
      <View className="w-full h-[90%] flex flex-col p-2  bg-[#ffff] absolute z-10  items-center">
        <AppMenu
          text="Exemplos Importaçoes"
          active={false}
          routerBack="settings"
        />
        <AppCard
          className=" bg-transparent shadow-none"
          children={
            <View className="w-full flex flex-col">
              <View className="w-full flex flex-col items-center justify-center p-5 rounded-b-lg bg-[#8ccfc1] mt-5 shadow-2xl shadow-black">
                <Text className="text-[#ffffff] font-bold text-[25px]">
                  CLIENTES
                </Text>
                <View className="w-full flex felx-col mt-5 ">
                  <Text className="text-[#ffffff] text-[15px] font-semibold">
                    &#x0005B; &#x0007B; id:
                    &#x00027;95225508-d2b5-11ed-afa1-0242ac120002&#x00027; ,
                    firstName: &#x00027;Mateus&#x00027;, surName:
                    &#x00027;Borges&#x00027;, email:
                    &#x00027;mateus@gmail.com&#x00027;,
                    phone:&#x00027;1699258452&#x00027;, address:&#x00027;jardim
                    canada&#x00027;, created_at: &#x00027;04/04/2023,
                    03:59:53&#x00027;, updeted_at: &#x00027;04/04/2023,
                    03:59:53&#x00027;, &#x0005D; &#x0005D;
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => fetchCopiedTextClient()}
                  className="w-[50%] flex items-center justify-center mt-5 p-2 bg-[#4c746b] rounded-lg  font-bold"
                >
                  <Text className="text-white font-bold">Copiar exemplo</Text>
                </TouchableOpacity>
              </View>

              <View className="w-full flex flex-col items-center justify-center p-5 rounded-b-lg bg-[#da8ef1] mt-5  shadow-2xl shadow-black">
                <Text className="text-[#ffffff] font-bold text-[25px]">
                  PRODUTOS
                </Text>
                <View className="w-full flex felx-col mt-5 ">
                  <Text className="text-[#ffffff] text-[15px] font-semibold">
                    <Text className="text-[#ffffff] text-[15px] font-semibold">
                      &#x0005B; &#x0007B; id:
                      &#x00027;2fdef762-d2b7-11ed-afa1-0242ac120002&#x00027; ,
                      name: &#x00027;Coxinha&#x00027;, describe:
                      &#x00027;Coxinha de frango&#x00027;, price:
                      &#x00027;15.00&#x00027;, kg:&#x00027;1&#x00027;,
                      stock:&#x00027;15&#x00027;, image: &#x00027;&#x00027;,
                      created_at: &#x00027;04/04/2023, 03:59:53&#x00027;,
                      updeted_at: &#x00027;04/04/2023, 03:59:53&#x00027;
                      &#x0005D; &#x0005D;
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => fetchCopiedTextProduct()}
                  className="w-[50%] flex items-center justify-center mt-5 p-2 bg-[#664370] rounded-lg  font-bold"
                >
                  <Text className="text-white font-bold">Copiar exemplo</Text>
                </TouchableOpacity>
              </View>

              <View className="w-full flex flex-col items-center justify-center p-5 rounded-b-lg bg-[#d1637b] mt-5  shadow-2xl shadow-black">
                <Text className="text-[#ffffff] font-bold text-[25px]">
                  VENDAS
                </Text>
                <View className="w-full flex felx-col mt-5 ">
                  <Text className="text-[#ffffff] text-[15px] font-semibold">
                    &#x0005B; &#x0007B; id:
                    &#x00027;03e20b01-4e67-41e2-8cb8-d6a7f5dd96be&#x00027; ,
                    clientID:
                    &#x00027;95225508-d2b5-11ed-afa1-0242ac120002&#x00027;,
                    productID:
                    &#x00027;2fdef762-d2b7-11ed-afa1-0242ac120002&#x00027;,
                    firstNameClient: &#x00027;Mateus&#x00027;,
                    surNameClient:&#x00027;Borges&#x00027;,
                    phoneClient:&#x00027;1699258452&#x00027;, nameProduct:
                    &#x00027;coxinha&#x00027;, priceProduct:
                    &#x00027;15.00&#x00027;, totalPrice: &#x00027;15.00&#x00027;
                    deliveryDate: &#x00027;04/07/2023, 03:59:53&#x00027;,
                    paymentDate: &#x00027;04/07/2023, 03:59:53&#x00027;
                    describe: &#x00027;descrição&#x00027;, status:
                    &#x00027;owing | pait&#x00027; active: &#x00027;yes |
                    no&#x00027;, amount: &#x00027;5&#x00027; created_at:
                    &#x00027;04/04/2023, 03:59:53&#x00027; updeted_at:
                    &#x00027;04/04/2023, 03:59:53&#x00027;, &#x0005D; &#x0005D;
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => fetchCopiedTextStorage()}
                  className="w-[50%] flex items-center justify-center mt-5 p-2 bg-[#7e3c4a] rounded-lg  font-bold"
                >
                  <Text className="text-white font-bold">Copiar exemplo</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </View>
    </>
  );
}
