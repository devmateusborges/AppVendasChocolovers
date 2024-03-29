import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AppMenu } from "../../components/AppMenu";
import { TypeClient, TypeSales } from "../../@types/types";
import { RouteProp } from "@react-navigation/native";
import { GetByIdClient } from "../../service/Client";
import { GetSales, UpdatePayments } from "../../service/Sales";
import { dateFormat, moneyFormat } from "../../utils/FuncUtils";
interface ClientView {
  route: RouteProp<{ params: { id: string } }, "params">;
}

export function ClientView({ route }: ClientView) {
  const [data, setData] = useState<TypeClient[]>([]);
  const [dataSales, setDataSales] = useState<TypeSales[]>([]);
  const [owing, setOwing] = useState(0);
  const [pait, setPait] = useState(0);
  //==============================================
  useEffect(() => {
    handlerSelectClient(route.params.id);
    handlerSelectSales(route.params.id);
  }, []);
  //==============================================
  const handlerSelectClient = async (id: string) => {
    const response = await GetByIdClient(id);
    const responseSales = await GetSales();

    const filterSales = responseSales.filter(
      (item: TypeSales) => item.clientID == id
    );

    let Owings = 0;
    let Pait = 0;
    for (let i = 0; i < filterSales.length; i++) {
      if (filterSales[i].status == "owing") {
        Owings += filterSales[i].totalPrice;
      } else if (filterSales[i].status == "pait") {
        Pait += filterSales[i].totalPrice;
      }
    }
    setOwing(Owings);
    setPait(Pait);
    setData(response);
  };
  //==============================================
  const handlerSelectSales = async (id: string) => {
    const response = await GetSales();
    const filter = response.filter((Sales: TypeSales) => Sales.clientID == id);

    setDataSales(filter);
  };
  //==============================================
  const handlerPaymentsPaint = async ({
    id,
    clientID,
    productID,
    firstNameClient,
    surNameClient,
    phoneClient,
    nameProduct,
    priceProduct,
    totalPrice,
    deliveryDate,
    paymentDate,
    describe,
    status,
    active,
    amount,
    created_at,
    additionalPrice,
  }: TypeSales) => {
    const response = await UpdatePayments(
      id,
      clientID,
      productID,
      firstNameClient,
      surNameClient,
      phoneClient,
      nameProduct,
      priceProduct,
      totalPrice,
      deliveryDate,
      paymentDate,
      describe,
      "pait",
      active,
      amount,
      created_at,
      additionalPrice
    );

    const filterSales = response.filter(
      (item: TypeSales) => item.clientID == route.params.id
    );

    let Owings = 0;
    let Pait = 0;
    for (let i = 0; i < filterSales.length; i++) {
      if (filterSales[i].status == "owing") {
        Owings += filterSales[i].totalPrice;
      } else if (filterSales[i].status == "pait") {
        Pait += filterSales[i].totalPrice;
      }
    }
    setOwing(Owings);
    setPait(Pait);
    const filterClient = response.filter(
      (item: TypeSales) => item.clientID == route.params.id
    );
    setDataSales(filterClient);
  };
  //==============================================
  const handlerPaymentsOwing = async ({
    id,
    clientID,
    productID,
    firstNameClient,
    surNameClient,
    phoneClient,
    nameProduct,
    priceProduct,
    totalPrice,
    deliveryDate,
    paymentDate,
    describe,
    status,
    active,
    amount,
    created_at,
    additionalPrice,
  }: TypeSales) => {
    const response = await UpdatePayments(
      id,
      clientID,
      productID,
      firstNameClient,
      surNameClient,
      phoneClient,
      nameProduct,
      priceProduct,
      totalPrice,
      deliveryDate,
      paymentDate,
      describe,
      "owing",
      active,
      amount,
      created_at,
      additionalPrice
    );

    const filterSales = response.filter(
      (item: TypeSales) => item.clientID == route.params.id
    );

    let Owings = 0;
    let Pait = 0;
    for (let i = 0; i < filterSales.length; i++) {
      if (filterSales[i].status == "owing") {
        Owings += filterSales[i].additionalPrice;
      } else if (filterSales[i].status == "pait") {
        Pait += filterSales[i].additionalPrice;
      }
    }
    setOwing(Owings);
    setPait(Pait);
    const filterClient = response.filter(
      (item: TypeSales) => item.clientID == route.params.id
    );
    setDataSales(filterClient);
  };
  //==============================================
  return (
    <>
      <View className="bg-[#8ccfc1] absolute w-full h-[70vh]  rounded-bl-[60vh]"></View>

      <View className="w-full h-[100vh] flex flex-col p-2  absolute z-10  items-center">
        <AppMenu
          text={"Pagamentos " + data[0]?.firstName.substring(0, 10)}
          active={false}
          routerBack="clients"
          routerAdvance="createclient"
        />
        <View className="w-full flex flex-col p-2 bg-[#ffffff98] h-[80%] mt-5 rounded-lg">
          <ScrollView>
            {dataSales.map((item) => (
              <View key={item.id}>
                {item.status == "owing" ? (
                  <View className="flex flex-col bg-[#ffffff] p-2 mt-2 rounded-lg">
                    <View className="flex flex-col relative">
                      <Text className="text-[#acacac] text-[20px] font-bold">
                        {item.nameProduct}
                      </Text>
                      <View className="absolute right-0">
                        <Text className=" bg-[#e05f5f] p-2 text-white font-bold text-[20px] rounded-lg">
                          {moneyFormat(item.totalPrice)}
                        </Text>
                      </View>
                      <Text className="text-[#acacac] text-[18px] font-semibold ">
                        Agendado para : {dateFormat(String(item.paymentDate))}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handlerPaymentsPaint(item)}
                        className=" w-[100%] bg-[#e05f5f] items-center justify-center p-2 rounded-lg"
                      >
                        <Text className="text-white font-bold">
                          Pagamento efetuado
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View className="flex flex-col bg-[#ffffff] mt-2 p-2 rounded-lg">
                    <View className="flex flex-col relative">
                      <Text className="text-[#9c9c9c] text-[20px] font-bold">
                        {item.nameProduct}
                      </Text>
                      <View className="absolute right-0">
                        <Text className="  bg-[#5fe09f] p-2 text-white font-bold text-[20px] rounded-lg">
                          {moneyFormat(item.additionalPrice)}
                        </Text>
                      </View>
                      <Text className="text-[#aaaaaa] text-[18px] font-semibold ">
                        Agendado para : {dateFormat(String(item.paymentDate))}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handlerPaymentsOwing(item)}
                        className=" w-[100%] bg-[#5fe09f] items-center justify-center p-2 rounded-lg"
                      >
                        <Text className="text-white font-bold">
                          Reverter Pagamento
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="w-full flex flex-row items-center justify-center">
          <Text className="bg-[#5fe09f] p-5 text-white rounded-lg text-[20px]">
            {moneyFormat(pait)}
          </Text>
          <Text className="bg-[#e05f5f] p-5 text-white rounded-lg text-[20px] ml-2">
            {moneyFormat(owing)}
          </Text>
        </View>
      </View>
    </>
  );
}
