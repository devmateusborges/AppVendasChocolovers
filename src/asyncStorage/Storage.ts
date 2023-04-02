import { dataProducts } from "./../../assets/aquive";
import {
  TypeClient,
  TypeProducts,
  TypeStorageTemp,
  TypeStorages,
} from "../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";
import { UpdateClient, UpdateClientExtern, UpdatePaidOwing } from "./Client";

const NameStorage = "@Storage:331";
const NameStorageTemp = "@StorageTemp:331";
const NameStorageProduct = "@Product:331";
const NameStorageClient = "@Client:331";

export const GetStorage = async (): Promise<TypeStorageTemp[]> => {
  const response = await AsyncStorage.getItem(NameStorageTemp);
  const data: TypeStorageTemp[] = response ? JSON.parse(response) : [];

  return data.reverse();
};

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
      status: "devendo",
      deliveryDate: deliveryDate,
      paymentDate: paymentDate,
      created_at: new Date(),
      updeted_at: new Date(),
    };

    const responseStorage = await AsyncStorage.getItem(NameStorageTemp);
    const previousStorage = responseStorage ? JSON.parse(responseStorage) : [];
    const data = [...previousStorage, NewStorage];
    await AsyncStorage.setItem(NameStorageTemp, JSON.stringify(data));

    //Cadastrar Nova Divida No Perfil
    const responseStorageOwing = await AsyncStorage.getItem(NameStorageTemp);
    const previousStorageOwing = responseStorageOwing
      ? JSON.parse(responseStorageOwing)
      : [];

    const clientFilterOwing: TypeStorageTemp[] = previousStorageOwing.filter(
      (storage: TypeStorageTemp) => storage.clientID == clientID
    );

    let sumTotal: number = 0;
    for (let i = 0; i < clientFilterOwing.length; i++) {
      sumTotal += clientFilterOwing[i].totalPrice;
    }

    await UpdatePaidOwing(filterClient, sumTotal, 0);

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

    let sumTotal: number = 0;
    for (let i = 0; i < clientFilterOwing.length; i++) {
      sumTotal += clientFilterOwing[i].totalPrice;
    }
    // recurepa cliente e pega os dados dele
    const responseStorageClient = await AsyncStorage.getItem(NameStorageClient);
    const previousStorageClient: TypeClient[] = responseStorageClient
      ? JSON.parse(responseStorageClient)
      : [];

    const clientFilterClient1: TypeClient[] = previousStorageClient.filter(
      (storage: TypeClient) => storage.id == clientID
    );

    let newSub = sumTotal - clientFilterStorage[0].totalPrice;

    await UpdatePaidOwing(clientFilterClient1, newSub, 0);

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

export const GetByIdStorage = async (id?: string): Promise<TypeStorages[]> => {
  const response = await AsyncStorage.getItem(NameStorage);
  const responseData = response ? JSON.parse(response) : [];
  const data = responseData.filter((item: TypeStorages) => item.id == id);

  return data;
};

export const FilterStorage = async (filter: string): Promise<any> => {
  const response = await AsyncStorage.getItem(NameStorage);
  const responseData = response ? JSON.parse(response) : [];
  const data = responseData.filter((item: TypeStorages) => item.id == filter);

  return data;
};

export const DeliveredStorage = async (
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

    let sumTotal: number = 0;
    for (let i = 0; i < clientFilterOwing.length; i++) {
      sumTotal += clientFilterOwing[i].totalPrice;
    }
    // recurepa cliente e pega os dados dele
    const responseStorageClient = await AsyncStorage.getItem(NameStorageClient);
    const previousStorageClient: TypeClient[] = responseStorageClient
      ? JSON.parse(responseStorageClient)
      : [];

    const clientFilterClient1: TypeClient[] = previousStorageClient.filter(
      (storage: TypeClient) => storage.id == clientID
    );

    let newSub = sumTotal - clientFilterStorage[0].totalPrice;

    await UpdatePaidOwing(clientFilterClient1, newSub, 0);

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
      text1: "Parabens Pela entrega",
    });

    return previousStorage;
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

export const Storageervice = {
  FilterStorage,
  GetStorage,
  DeleteStorage,
  CreateStorageDB,
  GetByIdStorage,
};
