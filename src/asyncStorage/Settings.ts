import { TypeProducts } from "../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";

const NameStorage = "@Product:331";

export const GetProduct = async (): Promise<any> => {
  const response = await AsyncStorage.getItem(NameStorage);
  const data = response ? JSON.parse(response) : [];
  return data;
};

export const CreateProductDB = async (
  name: string,
  describe: string,
  price: number,
  kg: number,
  stock: number,
  image?: string
) => {
  try {
    const NewProduct: TypeProducts = {
      id: create_UUID(),
      name: name,
      describe: describe,
      price: price,
      kg: kg,
      stock: stock,
      image: "",
      created_at: new Date(),
      updeted_at: new Date(),
    };
    const response = await AsyncStorage.getItem(NameStorage);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];

    await AsyncStorage.setItem(NameStorage, JSON.stringify(data));

    return Toast.show({
      type: "success",
      text1: "Produto cadastrado com sucesso",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

export const DeleteProduct = async (id: string): Promise<any> => {
  try {
    const response = await AsyncStorage.getItem(NameStorage);
    const responseData = response ? JSON.parse(response) : [];
    const data = responseData.filter((item: TypeProducts) => item.id !== id);
    await AsyncStorage.setItem(NameStorage, JSON.stringify(data));
    Toast.show({
      type: "success",
      text1: "Produto Deletado com sucesso",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

export const UpdateProduct = async (
  id: string,
  name: string,
  describe: string,
  price: number,
  kg: Number,
  stock: number,
  created_at: Date
): Promise<any> => {
  try {
    const NewProduct: TypeProducts = {
      id: id,
      name: name,
      describe: describe,
      price: price,
      kg: kg,
      stock: stock,
      image: "",
      created_at: created_at,
      updeted_at: new Date(),
    };
    const responseFilterCl = await AsyncStorage.getItem(NameStorage);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeProducts) => item.id !== id
    );

    await AsyncStorage.setItem(NameStorage, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(NameStorage);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];
    await AsyncStorage.setItem(NameStorage, JSON.stringify(data));

    Toast.show({
      type: "success",
      text1: "Produto Atualizado com sucesso",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
export const SettingsDeleteDB = async () => {
  await AsyncStorage.clear();
};
export const SettingsService = {
  SettingsDeleteDB,
};
