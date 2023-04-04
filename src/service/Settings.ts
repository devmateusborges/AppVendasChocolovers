import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypeClient, TypeProducts, TypeStorageTemp } from "../@types/types";
import Toast from "react-native-toast-message";

const tableTemp = "@StorageTemp:331";
const tableProduct = "@Product:331";
const tableClient = "@Client:331";

export const ExportData = async () => {
  const responseClient = await AsyncStorage.getItem(tableClient);
  const dataClient: TypeClient[] = responseClient
    ? JSON.parse(responseClient)
    : [];

  const responseProduct = await AsyncStorage.getItem(tableProduct);
  const dataProduct: TypeProducts[] = responseProduct
    ? JSON.parse(responseProduct)
    : [];

  const responseStorage = await AsyncStorage.getItem(tableTemp);
  const dataStorage: TypeStorageTemp[] = responseStorage
    ? JSON.parse(responseStorage)
    : [];
  Toast.show({
    type: "success",
    text1: "Dados exportados com sucesso",
  });
  return {
    clientes: dataClient,
    produtos: dataProduct,
    vendas: dataStorage,
  };
};

export const ImportDataClient = async (client: any) => {
  await AsyncStorage.setItem(tableClient, JSON.stringify(client));
  Toast.show({
    type: "success",
    text1: "Dados do Cliente",
  });
};

export const ImportDataProduct = async (client: any) => {
  await AsyncStorage.setItem(tableProduct, JSON.stringify(client));
  Toast.show({
    type: "success",
    text1: "Dados do Produto",
  });
};

export const ImportDataStorage = async (client: any) => {
  await AsyncStorage.setItem(tableTemp, JSON.stringify(client));
  Toast.show({
    type: "success",
    text1: "Dados do Vendas",
  });
};
export const SettingsDeleteDB = async () => {
  await AsyncStorage.clear();
};
export const SettingsService = {
  ImportDataClient,
  ImportDataProduct,
  ImportDataStorage,
  ExportData,
  SettingsDeleteDB,
};
