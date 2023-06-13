import { TypeProducts } from "../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";
import { createSync } from "./Sync";
import store from "../store";
import { Loading } from "../store/utilStore";

const tableProduct = "@Product:331";

export const GetProduct = async (): Promise<any> => {
  const response = await AsyncStorage.getItem(tableProduct);
  const data = response ? JSON.parse(response) : [];
  return data.reverse();
};
//==============================================
export const CreateProductDB = async (
  name: string,
  describe: string,
  price: number,
  kg: number,
  stock: number,
  image?: string
) => {
  try {
    store.dispatch(Loading(true));
    const id = create_UUID();
    const NewProduct: TypeProducts = {
      id: id,
      name: name,
      describe: describe == "" ? "sem descrição" : describe,
      price: price,
      kg: kg,
      stock: stock,
      image: "",
      created_at: new Date(),
      updated_at: new Date(),
    };
    const response = await AsyncStorage.getItem(tableProduct);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];

    await AsyncStorage.setItem(tableProduct, JSON.stringify(data));
    await createSync(id, "INSERT", "product", "yes");
    store.dispatch(Loading(false));
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
//==============================================
export const DeleteProduct = async (id: string): Promise<any> => {
  try {
    //============================================================================
    store.dispatch(Loading(true));
    const response = await AsyncStorage.getItem(tableProduct);
    const responseData = response ? JSON.parse(response) : [];
    const data = responseData.filter((item: TypeProducts) => item.id !== id);
    await AsyncStorage.setItem(tableProduct, JSON.stringify(data));
    await createSync(id, "DELETE", "product", "yes");
    store.dispatch(Loading(false));
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
//==============================================
export const UpdateProduct = async (
  id: string,
  name: string,
  describe: string,
  price: number,
  kg: Number,
  stock: number,
  created_at: Date,
  updated_at: Date
): Promise<any> => {
  try {
    store.dispatch(Loading(true));
    const NewProduct: TypeProducts = {
      id: id,
      name: name,
      describe: describe == "" ? "sem descrição" : describe,
      price: price,
      kg: kg,
      stock: stock,
      image: "",
      created_at: created_at,
      updated_at: updated_at,
    };
    const responseFilterCl = await AsyncStorage.getItem(tableProduct);
    const responseFilter = responseFilterCl ? JSON.parse(responseFilterCl) : [];

    const dataFilter = responseFilter.filter(
      (item: TypeProducts) => item.id !== id
    );

    await AsyncStorage.setItem(tableProduct, JSON.stringify(dataFilter));
    const response = await AsyncStorage.getItem(tableProduct);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, NewProduct];
    await AsyncStorage.setItem(tableProduct, JSON.stringify(data));
    await createSync(id, "UPDATE", "product", "yes");
    store.dispatch(Loading(false));
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
//==============================================
export const GetByIdProduct = async (id?: string): Promise<TypeProducts[]> => {
  store.dispatch(Loading(true));
  const response = await AsyncStorage.getItem(tableProduct);
  const responseData = response ? JSON.parse(response) : [];
  const data = responseData.filter((item: TypeProducts) => item.id == id);
  store.dispatch(Loading(false));

  return data;
};
//==============================================
export const FilterProduct = async (filter: string): Promise<any> => {
  store.dispatch(Loading(true));
  const response = await AsyncStorage.getItem(tableProduct);
  const responseData = response ? JSON.parse(response) : [];
  const data = responseData.filter((item: TypeProducts) => item.name == filter);
  store.dispatch(Loading(false));

  return data;
};
//==============================================
export const Productervice = {
  FilterProduct,
  GetProduct,
  DeleteProduct,
  CreateProductDB,
  GetByIdProduct,
  UpdateProduct,
};
