import { TypeClient, TypeProducts, TypeSales } from "../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";
import { createSync } from "./Sync";
import store from "../store";
import { Loading } from "../store/utilStore";

const NameSalesTemp = "@SalesTemp:331";
const NameSalesProduct = "@Product:331";
const NameSalesClient = "@Client:331";

export const GetSales = async (): Promise<TypeSales[]> => {
  store.dispatch(Loading(true));
  const response = await AsyncStorage.getItem(NameSalesTemp);
  const data: TypeSales[] = response ? JSON.parse(response) : [];
  store.dispatch(Loading(false));
  return data.reverse();
};
//==============================================
export const CreateSalesDB = async (
  clientID: string,
  productID: string,
  amount: number,
  description: string,
  deliveryDate: Date,
  paymentDate: Date,
  additionalPrice: number
) => {
  try {
    store.dispatch(Loading(true));
    // Pegando dados do client
    const responseClient = await AsyncStorage.getItem(NameSalesClient);
    const dataClient: TypeClient[] = responseClient
      ? JSON.parse(responseClient)
      : [];

    const filterClient = dataClient.filter(
      (client: TypeClient) => client.id == clientID
    );

    // Pegando dados do produto
    const responseProduct = await AsyncStorage.getItem(NameSalesProduct);
    const dataProduct: TypeProducts[] = responseProduct
      ? JSON.parse(responseProduct)
      : [];

    const filterProduct = dataProduct.filter(
      (product: TypeProducts) => product.id == productID
    );
    // tabela de exibir
    let totalDivida = Number(amount) * parseInt(String(filterProduct[0].price));
    const id = create_UUID();
    const NewSales: TypeSales = {
      id: id,
      clientID: clientID,
      productID: productID,
      firstNameClient: filterClient[0].firstName,
      surNameClient: filterClient[0].surName,
      phoneClient: filterClient[0].phone,
      nameProduct: filterProduct[0].name,
      priceProduct: parseInt(String(filterProduct[0].price)),
      totalPrice: totalDivida,
      describe: description,
      amount: amount,
      status: "owing",
      active: "yes",
      deliveryDate: deliveryDate,
      additionalPrice: totalDivida + additionalPrice,
      paymentDate: paymentDate,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const responseSales = await AsyncStorage.getItem(NameSalesTemp);
    const previousSales = responseSales ? JSON.parse(responseSales) : [];
    const data = [...previousSales, NewSales];
    await AsyncStorage.setItem(NameSalesTemp, JSON.stringify(data));
    await createSync(id, "INSERT", "sales", "yes");

    store.dispatch(Loading(false));
    return Toast.show({
      type: "success",
      text1: "Parabens Cadastrou um novo pedido",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
export const DeleteSales = async (
  id: string,
  clientID: string
): Promise<any> => {
  try {
    store.dispatch(Loading(true));
    // pega todos os valores
    const responseSalesOwing = await AsyncStorage.getItem(NameSalesTemp);
    const previousSalesOwing: TypeSales[] = responseSalesOwing
      ? JSON.parse(responseSalesOwing)
      : [];

    const data = previousSalesOwing.filter((item: TypeSales) => item.id !== id);
    await AsyncStorage.setItem(NameSalesTemp, JSON.stringify(data));

    // recuperando novo item
    const responseSales = await AsyncStorage.getItem(NameSalesTemp);
    const previousSales: TypeSales[] = responseSales
      ? JSON.parse(responseSales)
      : [];
    await createSync(id, "DELETE", "sales", "yes");

    store.dispatch(Loading(false));

    Toast.show({
      type: "success",
      text1: "Pedido Deletado com sucesso",
    });

    return previousSales;
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
export const UpdateDelyvers = async (
  id: string,
  clientID: string,
  productID: string,
  firstNameClient: string,
  surNameClient: string,
  phoneClient: string,
  nameProduct: string,
  priceProduct: number,
  totalPrice: number,
  deliveryDate: Date,
  paymentDate: Date,
  describe: string,
  status: "owing" | "pait",
  active: "yes" | "no",
  amount: number,
  created_at: Date,
  additionalPrice: number
): Promise<any> => {
  try {
    store.dispatch(Loading(true));
    const NewProduct: TypeSales = {
      id: id,
      clientID: clientID,
      productID: productID,
      firstNameClient: firstNameClient,
      surNameClient: surNameClient,
      phoneClient: phoneClient,
      nameProduct: nameProduct,
      priceProduct: priceProduct,
      totalPrice: totalPrice,
      deliveryDate: deliveryDate,
      paymentDate: paymentDate,
      describe: describe,
      status: status,
      active: active,
      amount: amount,
      additionalPrice: additionalPrice,
      created_at: created_at,
      updated_at: new Date(),
    };
    const responseFilterCl = await AsyncStorage.getItem(NameSalesTemp);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeProducts) => item.id !== id
    );

    await AsyncStorage.setItem(NameSalesTemp, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(NameSalesTemp);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];
    await AsyncStorage.setItem(NameSalesTemp, JSON.stringify(data));

    const responseCurrent = await AsyncStorage.getItem(NameSalesTemp);
    const previousDataCurrent = responseCurrent
      ? JSON.parse(responseCurrent)
      : [];
    await createSync(id, "UPDATE", "sales", "yes");

    store.dispatch(Loading(false));

    Toast.show({
      type: "success",
      text1: "Parabens pela entrega",
    });
    return previousDataCurrent;
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
export const UpdatePayments = async (
  id: string,
  clientID: string,
  productID: string,
  firstNameClient: string,
  surNameClient: string,
  phoneClient: string,
  nameProduct: string,
  priceProduct: number,
  totalPrice: number,
  deliveryDate: Date,
  paymentDate: Date,
  describe: string,
  status: "owing" | "pait",
  active: "yes" | "no",
  amount: number,
  created_at: Date,
  additionalPrice: number
): Promise<any> => {
  try {
    store.dispatch(Loading(true));
    const NewProduct: TypeSales = {
      id: id,
      clientID: clientID,
      productID: productID,
      firstNameClient: firstNameClient,
      surNameClient: surNameClient,
      phoneClient: phoneClient,
      nameProduct: nameProduct,
      priceProduct: priceProduct,
      totalPrice: totalPrice,
      deliveryDate: deliveryDate,
      paymentDate: paymentDate,
      describe: describe,
      additionalPrice: additionalPrice,
      status: status,
      active: active,
      amount: amount,
      created_at: created_at,
      updated_at: new Date(),
    };
    const responseFilterCl = await AsyncStorage.getItem(NameSalesTemp);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeProducts) => item.id !== id
    );

    await AsyncStorage.setItem(NameSalesTemp, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(NameSalesTemp);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];
    await AsyncStorage.setItem(NameSalesTemp, JSON.stringify(data));

    const responseCurrent = await AsyncStorage.getItem(NameSalesTemp);
    const previousDataCurrent = responseCurrent
      ? JSON.parse(responseCurrent)
      : [];
    await createSync(id, "UPDATE", "sales", "yes");
    store.dispatch(Loading(false));

    Toast.show({
      type: "success",
      text1: "Efetuado com sucesso",
    });
    return previousDataCurrent;
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
export const StoragService = {
  GetSales,
  DeleteSales,
  CreateSalesDB,
  UpdateDelyvers,
  UpdatePayments,
};
