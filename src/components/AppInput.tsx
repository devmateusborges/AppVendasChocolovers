import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
};

export function AppInput({ label, ...rest }: Props) {
  return (
    <View className="flex flex-col mt-2 w-full">
      <Text className="font-semibold text-[15px] text-[#797979]">{label}</Text>

      <TextInput
        className="w-[100%] shadow-xl  shadow-[#a0a0a0] p-2 bg-[#dddddd] rounded-lg"
        {...rest}
      />
    </View>
  );
}
