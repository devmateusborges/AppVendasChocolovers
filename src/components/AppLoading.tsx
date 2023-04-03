import {
  ActivityIndicator,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export function AppLoading() {
  return (
    <>
      <ActivityIndicator
        className="absolute z-40 text-[#832896] bg-[#832896]"
        size="large"
      />
    </>
  );
}
