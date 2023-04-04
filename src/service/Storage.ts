import { TypeClient, TypeProducts, TypeStorageTemp } from "../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";

const NameStorageTemp = "@StorageTemp:331";
const NameStorageProduct = "@Product:331";
const NameStorageClient = "@Client:331";

export const GetStorage = async (): Promise<TypeStorageTemp[]> => {
  const response = await AsyncStorage.getItem(NameStorageTemp);
  const data: TypeStorageTemp[] = response ? JSON.parse(response) : [];

  return data.reverse();
};
//==============================================
export const CreateStorageDB = async (
  clientID: string,
  productID: string,
  amount: number,
  description: string,
  deliveryDate: Date,
  paymentDate: Date
) => {
  try {
    // Pegando dados do client
    const responseClient = await AsyncStorage.getItem(NameStorageClient);
    const dataClient: TypeClient[] = responseClient
      ? JSON.parse(responseClient)
      : [];

    const filterClient = dataClient.filter(
      (client: TypeClient) => client.id == clientID
    );

    // Pegando dados do produto
    const responseProduct = await AsyncStorage.getItem(NameStorageProduct);
    const dataProduct: TypeProducts[] = responseProduct
      ? JSON.parse(responseProduct)
      : [];

    const filterProduct = dataProduct.filter(
      (product: TypeProducts) => product.id == productID
    );
    // tabela de exibir
    let totalDivida = Number(amount) * parseInt(String(filterProduct[0].price));
    const NewStorage: TypeStorageTemp = {
      id: create_UUID(),
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
      paymentDate: paymentDate,
      created_at: new Date(),
      updeted_at: new Date(),
    };

    const responseStorage = await AsyncStorage.getItem(NameStorageTemp);
    const previousStorage = responseStorage ? JSON.parse(responseStorage) : [];
    const data = [...previousStorage, NewStorage];
    await AsyncStorage.setItem(NameStorageTemp, JSON.stringify(data));

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
export const DeleteStorage = async (
  id: string,
  clientID: string
): Promise<any> => {
  try {
    // pega todos os valores
    const responseStorageOwing = await AsyncStorage.getItem(NameStorageTemp);
    const previousStorageOwing: TypeStorageTemp[] = responseStorageOwing
      ? JSON.parse(responseStorageOwing)
      : [];
    // pega todos os valores
    const clientFilterOwing: TypeStorageTemp[] = previousStorageOwing.filter(
      (storage: TypeStorageTemp) => storage.clientID == clientID
    );
    // pega todos os valores
    const clientFilterStorage: TypeStorageTemp[] = previousStorageOwing.filter(
      (storage: TypeStorageTemp) => storage.id == id
    );

    const data = previousStorageOwing.filter(
      (item: TypeStorageTemp) => item.id !== id
    );
    await AsyncStorage.setItem(NameStorageTemp, JSON.stringify(data));

    // recuperando novo item
    const responseStorage = await AsyncStorage.getItem(NameStorageTemp);
    const previousStorage: TypeStorageTemp[] = responseStorage
      ? JSON.parse(responseStorage)
      : [];

    Toast.show({
      type: "success",
      text1: "Pedido Deletado com sucesso",
    });

    return previousStorage;
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
  created_at: Date
): Promise<any> => {
  try {
    const NewProduct: TypeStorageTemp = {
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
      created_at: created_at,
      updeted_at: new Date(),
    };
    const responseFilterCl = await AsyncStorage.getItem(NameStorageTemp);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeProducts) => item.id !== id
    );

    await AsyncStorage.setItem(NameStorageTemp, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(NameStorageTemp);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];
    await AsyncStorage.setItem(NameStorageTemp, JSON.stringify(data));

    const responseCurrent = await AsyncStorage.getItem(NameStorageTemp);
    const previousDataCurrent = responseCurrent
      ? JSON.parse(responseCurrent)
      : [];

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
  created_at: Date
): Promise<any> => {
  try {
    const NewProduct: TypeStorageTemp = {
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
      created_at: created_at,
      updeted_at: new Date(),
    };
    const responseFilterCl = await AsyncStorage.getItem(NameStorageTemp);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeProducts) => item.id !== id
    );

    await AsyncStorage.setItem(NameStorageTemp, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(NameStorageTemp);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];
    await AsyncStorage.setItem(NameStorageTemp, JSON.stringify(data));

    const responseCurrent = await AsyncStorage.getItem(NameStorageTemp);
    const previousDataCurrent = responseCurrent
      ? JSON.parse(responseCurrent)
      : [];

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
  GetStorage,
  DeleteStorage,
  CreateStorageDB,
  UpdateDelyvers,
  UpdatePayments,
};
