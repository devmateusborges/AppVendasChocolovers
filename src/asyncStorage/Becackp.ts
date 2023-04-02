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

export const Storageervice = {
  GetStorage,
  DeleteStorage,
};
