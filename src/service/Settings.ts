import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteTablesASync = async () => {
  await AsyncStorage.clear();
};
