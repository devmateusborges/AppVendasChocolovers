import { TypeClient, TypeSales } from "../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";
import { createSync } from "./Sync";
import store from "../store";
import { Loading } from "../store/utilStore";

const table = "@Client:331";
const tableTemp = "@SalesTemp:331";
//==============================================
export const GetClient = async (): Promise<any> => {
  store.dispatch(Loading(true));
  const response = await AsyncStorage.getItem(table);
  const data = response ? JSON.parse(response) : [];
  store.dispatch(Loading(false));
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
    store.dispatch(Loading(true));

    const id = create_UUID();
    const NewClient: TypeClient = {
      id: id,
      firstName: firstName,
      surName: surName,
      email: email == "" ? "email@gmail.com" : email,
      phone: phone == "" ? "(00) 000000000" : phone,
      address: address == "" ? "enderço não colocado" : address,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const response = await AsyncStorage.getItem(table);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewClient];
    await createSync(id, "INSERT", "client", "yes");
    await AsyncStorage.setItem(table, JSON.stringify(data));
    store.dispatch(Loading(false));
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
    store.dispatch(Loading(true));
    const responseSales = await AsyncStorage.getItem(tableTemp);
    const responseDataSales = responseSales ? JSON.parse(responseSales) : [];
    const dataSales = responseDataSales.filter(
      (item: TypeSales) => item.clientID !== id
    );

    const response = await AsyncStorage.getItem(table);
    const responseData = response ? JSON.parse(response) : [];
    const data = responseData.filter((item: TypeClient) => item.id !== id);
    await AsyncStorage.setItem(table, JSON.stringify(data));
    await createSync(id, "DELETE", "client", "yes");
    store.dispatch(Loading(false));

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
  created_at: Date
): Promise<any> => {
  try {
    store.dispatch(Loading(true));
    const NewClient: TypeClient = {
      id: id,
      firstName: firstName,
      surName: surName,
      email: email,
      phone: phone,
      address: address,
      created_at: created_at,
      updated_at: new Date(),
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
    await createSync(id, "UPDATE", "client", "yes");
    store.dispatch(Loading(false));
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
export const GetByIdClient = async (id?: string): Promise<TypeClient[]> => {
  store.dispatch(Loading(true));
  const response = await AsyncStorage.getItem(table);
  const responseData = response ? JSON.parse(response) : [];
  const data = responseData.filter((item: TypeClient) => item.id == id);
  store.dispatch(Loading(false));
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
