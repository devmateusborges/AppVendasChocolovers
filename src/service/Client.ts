import { TypeClient, TypeStorageTemp } from "../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";

const table = "@Client:331";
const tableTemp = "@StorageTemp:331";
//==============================================
export const GetClient = async (): Promise<any> => {
  const response = await AsyncStorage.getItem(table);
  const data = response ? JSON.parse(response) : [];
  return data.reverse();
};
//==============================================
export const CreateClientDB = async (
  firstName: string,
  surName: string,
  email: string,
  phone: string,
  address: string
) => {
  try {
    const NewClient: TypeClient = {
      id: create_UUID(),
      firstName: firstName,
      surName: surName,
      email: email,
      phone: phone,
      address: address,
      owing: 0,
      paid: 0,
      created_at: new Date(),
    };
    const response = await AsyncStorage.getItem(table);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewClient];

    await AsyncStorage.setItem(table, JSON.stringify(data));

    return Toast.show({
      type: "success",
      text1: "Cliente cadastrado com sucesso",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
export const DeleteClient = async (id: string): Promise<any> => {
  try {
    const responseStorage = await AsyncStorage.getItem(tableTemp);
    const responseDataStorage = responseStorage
      ? JSON.parse(responseStorage)
      : [];
    const dataStorage = responseDataStorage.filter(
      (item: TypeStorageTemp) => item.clientID !== id
    );

    const response = await AsyncStorage.getItem(table);
    const responseData = response ? JSON.parse(response) : [];
    const data = responseData.filter((item: TypeClient) => item.id !== id);
    await AsyncStorage.setItem(table, JSON.stringify(data));
    Toast.show({
      type: "success",
      text1: "Cliente Deletado com sucesso",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
export const UpdateClient = async (
  id: string,
  firstName: string,
  surName: string,
  email: string,
  phone: string,
  address: string,
  created_at: Date,
  owing: number,
  paid: number
): Promise<any> => {
  try {
    const NewClient: TypeClient = {
      id: id,
      firstName: firstName,
      surName: surName,
      email: email,
      phone: phone,
      address: address,
      created_at: created_at,
      owing: owing,
      paid: paid,
      updeted_at: new Date(),
    };
    const responseFilterCl = await AsyncStorage.getItem(table);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeClient) => item.id !== id
    );

    await AsyncStorage.setItem(table, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(table);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewClient];
    await AsyncStorage.setItem(table, JSON.stringify(data));

    Toast.show({
      type: "success",
      text1: "Atualizado com sucesso",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
//ATUALIZA OS DEVEDORES E PAGADORES
export const UpdateClientExtern = async (
  id: string,
  firstName: string,
  surName: string,
  email: string,
  phone: string,
  address: string,
  created_at: Date,
  owing: number,
  paid: number
): Promise<any> => {
  try {
    const NewClient: TypeClient = {
      id: id,
      firstName: firstName,
      surName: surName,
      email: email,
      phone: phone,
      address: address,
      created_at: created_at,
      owing: owing,
      paid: paid,
      updeted_at: new Date(),
    };
    const responseFilterCl = await AsyncStorage.getItem(table);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeClient) => item.id !== id
    );

    await AsyncStorage.setItem(table, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(table);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewClient];
    await AsyncStorage.setItem(table, JSON.stringify(data));
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

export const UpdatePaidOwing = async (
  client: TypeClient[],
  owing: number,
  paid: number
) => {
  await UpdateClientExtern(
    client[0].id,
    client[0].firstName,
    client[0].surName,
    client[0].email,
    client[0].phone,
    client[0].address,
    client[0].created_at,
    owing,
    paid
  );
};
//==============================================
export const GetByIdClient = async (id?: string): Promise<TypeClient[]> => {
  const response = await AsyncStorage.getItem(table);
  const responseData = response ? JSON.parse(response) : [];
  const data = responseData.filter((item: TypeClient) => item.id == id);

  return data;
};
//==============================================
export const Clientervice = {
  GetClient,
  DeleteClient,
  CreateClientDB,
  GetByIdClient,
  UpdateClient,
};
