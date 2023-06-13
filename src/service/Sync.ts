import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypeSync } from "../@types/types";
import Toast from "react-native-toast-message";
import { create_UUID } from "../utils/FuncUtils";
import firestore from "@react-native-firebase/firestore";
const tableSync = "@Sync:331";

//==============================================
export const getSync = async (): Promise<TypeSync[]> => {
  const response = await AsyncStorage.getItem(tableSync);
  const data = response ? JSON.parse(response) : [];
  return data.reverse();
};
//==============================================
export const createSync = async (
  itemID: string,
  method: "INSERT" | "UPDATE" | "DELETE",
  table: "client" | "product" | "sales",
  active: "yes" | "no"
) => {
  try {
    const newSync: TypeSync = {
      id: create_UUID(),
      itemID: itemID,
      method: method,
      table: table,
      active: active,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const response = await AsyncStorage.getItem(tableSync);
    const previousData = response ? JSON.parse(response) : [];

    const data = [...previousData, newSync];

    await AsyncStorage.setItem(tableSync, JSON.stringify(data));
    const firebase = await firestore().collection("sync").add(newSync);
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

export const updateSyncActiveNo = async ({
  id,
  itemID,
  method,
  table,
  created_at,
  updated_at,
}: TypeSync) => {
  try {
    const response = await AsyncStorage.getItem(tableSync);
    const previousData = response ? JSON.parse(response) : [];

    const filterNew = previousData.map((item: TypeSync) => item.id !== id);

    await AsyncStorage.setItem(tableSync, JSON.stringify(filterNew));

    const newSync: TypeSync = {
      id: id,
      itemID: itemID,
      method: method,
      table: table,
      active: "no",
      created_at: created_at,
      updated_at: updated_at,
    };

    const data = [...filterNew, newSync];

    await AsyncStorage.setItem(tableSync, JSON.stringify(data));
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};
//==============================================
