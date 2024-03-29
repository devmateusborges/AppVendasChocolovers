import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppMenu } from "../../components/AppMenu";
import { AppInput } from "../../components/AppInput";
import { AppButton } from "../../components/AppButton";
import DatePicker from "react-native-date-picker";
import { Entypo } from "@expo/vector-icons";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { TypeClient, TypeProducts } from "../../@types/types";
import { GetClient } from "../../service/Client";
import { useFocusEffect } from "@react-navigation/native";
import { GetProduct } from "../../service/Products";
import { CreateSalesDB } from "../../service/Sales";
import { dateFormat, moneyFormat } from "../../utils/FuncUtils";

export function CreateSales() {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [openDateDelivery, setOpenDateDelivery] = useState(false);
  const [openDatePayment, setOpenDatePayment] = useState(false);
  const [amount, setAmount] = useState("1");
  const [description, setDescription] = useState("sem descrição");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [additionalPrice, setAdditionalPrice] = useState("0");
  const dataDropdownClient: any[] = [];
  const dataDropdownProduct: any[] = [];
  //==============================================
  useFocusEffect(
    useCallback(() => {
      handlerGetCLient();
      handlerGetProduct();
    }, [dataDropdownClient, dataDropdownProduct])
  );
  //==============================================
  const handlerGetCLient = async () => {
    const response = await GetClient();
    await response.map((client: TypeClient) => {
      return dataDropdownClient.push({
        key: client.id,
        value: client.firstName + " " + client.surName,
      });
    });
  };
  //==============================================
  const handlerGetProduct = async () => {
    const response = await GetProduct();
    await response.map((Product: TypeProducts) => {
      return dataDropdownProduct.push({
        key: Product.id,
        value:
          Product.name +
          " - " +
          moneyFormat(Product.price) +
          " - " +
          Product.describe.substring(0, 15),
      });
    });
  };
  //==============================================
  const handlerCreate = async (
    clientID: string,
    productID: string,
    amount: number,
    description: string,
    deliveryDate: Date,
    paymentDate: Date,
    additionalPrice: number
  ) => {
    await CreateSalesDB(
      clientID,
      productID,
      amount,
      description,
      deliveryDate,
      paymentDate,
      additionalPrice
    );
  };
  //==============================================
  return (
    <>
      <View className="bg-[#d1637b] absolute w-full h-[70vh] rounded-bl-[60vh]"></View>

      <View className="w-full h-[100vh] flex flex-col p-2  absolute z-10  items-center">
        <AppMenu text="Novo Pedido" routerBack="sales" />

        <View className="w-full flex flex-col bg-white h-full mt-10 rounded-xl p-2 item-center ">
          <View className="w-[100%] h-[85%] flex flex-col items-center  p-2">
            <ScrollView className="w-full">
              <Text className="mt-4 text-[#969595] font-bold">Cliente</Text>
              <TouchableOpacity onPress={() => null}>
                <SelectList
                  boxStyles={{
                    borderColor: "#fff",
                    backgroundColor: "#dddddd",
                    height: 57,
                    alignItems: "center",
                  }}
                  setSelected={(val: React.SetStateAction<string>) => {
                    setSelectedClient(val);
                  }}
                  placeholder="Selecione o Cliente"
                  data={dataDropdownClient}
                  save="key"
                />
              </TouchableOpacity>
              <Text className="mt-4 text-[#969595] font-bold">
                Selecione o Produto
              </Text>
              <SelectList
                boxStyles={{
                  borderColor: "#fff",
                  backgroundColor: "#dddddd",
                  height: 57,
                  alignItems: "center",
                }}
                setSelected={(val: React.SetStateAction<string>) =>
                  setSelectedProduct(val)
                }
                data={dataDropdownProduct}
                placeholder="Selecione o Produto"
                save="key"
              />
              <AppInput
                placeholder="EX: 5"
                className="h-[7vh] rounded-lg"
                label={"Quantidade "}
                onChangeText={setAmount}
                keyboardType="numeric"
                value={amount}
              />
              <AppInput
                placeholder="EX: R$: 5"
                className="h-[7vh] rounded-lg"
                label={"Preço adicional"}
                onChangeText={setAdditionalPrice}
                keyboardType="numeric"
                value={additionalPrice}
              />
              <AppInput
                placeholder="EX: chocolate preto"
                className=" h-[7vh]"
                label={"Descrição"}
                onChangeText={setDescription}
                value={description}
              />
              <Text className="mt-4 text-[#969595] font-bold">
                Data de entrega
              </Text>
              <AppButton
                onPress={() => setOpenDateDelivery(true)}
                className="bg-[#d1637b] w-[100%]  "
                icon={<Entypo name="back-in-time" size={24} color="#ffffff" />}
                text={dateFormat(String(deliveryDate))}
              />
              <Text className="mt-4 text-[#969595] font-bold">
                Data de Pagamento
              </Text>
              <DatePicker
                theme="light"
                fadeToColor="#929292"
                textColor="#949494"
                mode="date"
                modal
                open={openDateDelivery}
                date={deliveryDate}
                onConfirm={(date) => {
                  setOpenDateDelivery(false);
                  setDeliveryDate(date);
                }}
                onCancel={() => {
                  setOpenDateDelivery(false);
                }}
              />
              <AppButton
                onPress={() => setOpenDatePayment(true)}
                className="bg-[#d1637b] w-[100%]  "
                icon={<Entypo name="back-in-time" size={24} color="#ffffff" />}
                text={dateFormat(String(paymentDate))}
              />
              <DatePicker
                theme="light"
                fadeToColor="#929292"
                textColor="#949494"
                mode="date"
                modal
                open={openDatePayment}
                date={paymentDate}
                onConfirm={(date) => {
                  setOpenDatePayment(false);
                  setPaymentDate(date);
                }}
                onCancel={() => {
                  setOpenDatePayment(false);
                }}
              />
            </ScrollView>
            <AppButton
              onPress={() =>
                handlerCreate(
                  selectedClient,
                  selectedProduct,
                  Number(amount),
                  description,
                  deliveryDate,
                  paymentDate,
                  Number(additionalPrice)
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
