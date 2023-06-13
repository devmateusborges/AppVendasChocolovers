import { TypeSync } from "./../@types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import { TypeClient, TypeProducts, TypeSales } from "../@types/types";
import NetInfo from "@react-native-community/netinfo";
import store from "../store/index";
import { internetState, LoadingSync, messageLoading } from "../store/utilStore";
import Toast from "react-native-toast-message";
import { updateSyncActiveNo } from "./Sync";

const tableClient = "@Client:331";
const tableProduct = "@Product:331";
const tableSales = "@SalesTemp:331";
const tableSync = "@Sync:331";

// export const handerImportedSync = async (id: string) => {
//   const deleteTableItems = await firestore().collection("client").get();
//   deleteTableItems.forEach(async (documentSnapshot) => {
//     if (documentSnapshot.data().id == id) {
//       documentSnapshot.ref.delete();
//     }
//   });
// };

export const handlerSyncTables = async () => {
  const response = await AsyncStorage.getItem(tableSync);
  const data: TypeSync[] = response ? JSON.parse(response) : [];

  const filterSyncLocalActive = data.filter(
    (item: TypeSync) => item.active == "yes"
  );

  filterSyncLocalActive.filter(async (item: TypeSync) => {
    if (item.table == "client") {
      const responseCLient = await AsyncStorage.getItem(tableClient);
      const responseDataClient: TypeClient[] = responseCLient
        ? JSON.parse(responseCLient)
        : [];
      const dataClient: TypeClient[] = responseDataClient.filter(
        (itemClient: TypeClient) => itemClient.id == item.itemID
      );
      if (item.method == "INSERT") {
        await addFireBase(item, dataClient[0], item.table);
      }
      if (item.method == "DELETE") {
        await deleteFirebase(item.itemID, item.table);
      }
      if (item.method == "UPDATE") {
        await updateFirebase(item.itemID, item.table, dataClient[0]);
      }
    }
    if (item.table == "product") {
      const responseProduct = await AsyncStorage.getItem(tableProduct);
      const responseDataProduct: TypeProducts[] = responseProduct
        ? JSON.parse(responseProduct)
        : [];
      const dataProduct: TypeProducts[] = responseDataProduct.filter(
        (itemProduct: TypeProducts) => itemProduct.id == item.itemID
      );
      if (item.method == "INSERT") {
        await addFireBase(item, dataProduct[0], item.table);
      }
      if (item.method == "DELETE") {
        await deleteFirebase(item.itemID, item.table);
      }
      if (item.method == "UPDATE") {
        await updateFirebase(item.itemID, item.table, dataProduct[0]);
      }
    }
    if (item.table == "sales") {
      const responseSales = await AsyncStorage.getItem(tableSales);
      const responseDataSales: TypeSales[] = responseSales
        ? JSON.parse(responseSales)
        : [];
      const dataSales: TypeSales[] = responseDataSales.filter(
        (itemSales: TypeSales) => itemSales.id == item.itemID
      );
      if (item.method == "INSERT") {
        await addFireBase(item, dataSales[0], item.table);
      }
      if (item.method == "DELETE") {
        await deleteFirebase(item.itemID, item.table);
      }
      if (item.method == "UPDATE") {
        await updateFirebase(item.itemID, item.table, dataSales[0]);
      }
    }
  });
};

export const addFireBase = async (
  itemSync: TypeSync,
  item: any,
  table: "client" | "product" | "sales"
) => {
  try {
    store.dispatch(LoadingSync(true));
    const firebase = await firestore()
      .collection(table)
      .add(item)
      .then(async () => {
        store.dispatch(messageLoading("Carregando " + table + "..."));
        await updateSyncActiveNo(itemSync);
        Toast.show({
          type: "success",
          text1: "Atualizando tabela de " + table,
        });
      })
      .catch((error) => {
        store.dispatch(LoadingSync(false));
        Toast.show({
          type: "error",
          text1: error.message + " " + table,
        });
      });
    store.dispatch(LoadingSync(false));
  } catch (error) {
    store.dispatch(LoadingSync(false));
    Toast.show({
      type: "error",
      text1: "Verifique a conexão" + " " + table,
    });
  }
};

const deleteFirebase = async (
  id: string,
  table: "client" | "product" | "sales"
) => {
  // Get all users
  const deleteTableItems = await firestore().collection(table).get();
  deleteTableItems.forEach(async (documentSnapshot) => {
    if (documentSnapshot.data().id == id) {
      documentSnapshot.ref.delete();
    }
  });
};

const updateFirebase = async (
  id: string,
  table: "client" | "product" | "sales",
  item: any
) => {
  // Get all users
  const deleteTableItems = await firestore().collection(table).get();
  deleteTableItems.forEach(async (documentSnapshot) => {
    if (documentSnapshot.data().id == id) {
      documentSnapshot.ref.update(item);
    }
  });
};

export const unsubscribe = NetInfo.addEventListener((state) => {
  const conected = state.isConnected;
  if (conected) {
    store.dispatch(internetState(false));
  } else {
    store.dispatch(messageLoading("Conect em um wifi"));
    store.dispatch(internetState(true));
  }
  return conected;
});
