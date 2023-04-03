import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsDeleteDB = async () => {
  await AsyncStorage.clear();
};
export const SettingsService = {
  SettingsDeleteDB,
};
