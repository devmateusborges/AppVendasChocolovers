import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { AppAnimation } from "./AppAnimations";
import AnimationSync from "../../assets/animations/cloudSync.json";
import LoadingNormal from "../../assets/animations/loading.json";
import InternetError from "../../assets/animations/noInternet.json";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AppButton } from "./AppButton";
import { AntDesign } from "@expo/vector-icons";
import { LoadingSync, internetState } from "../store/utilStore";
export function AppLoading() {
  const Loading = useSelector((state: RootState) => state.util.loading);
  const LoadingSyncs = useSelector(
    (state: RootState) => state.util.loadingSync
  );
  const Message = useSelector((state: RootState) => state.util.messageLoading);
  const InternetLoading = useSelector(
    (state: RootState) => state.util.internetState
  );
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  return (
    <>
      <View className="w-full h-screen flex items-center justify-center bg-[#3d3d3d25] overflow-hidden">
        {Loading && (
          <View className="w-full h-screen flex flex-col items-center justify-center">
            <View className="w-64 h-64">
              <AppAnimation File={LoadingNormal} />
            </View>
            <Text className="font-bold text-[25px] text-[#383838]">
              Carregando...
            </Text>
          </View>
        )}
        {LoadingSyncs && (
          <View className="w-full h-screen flex items-center justify-center">
            <View>
              <AppButton
                className="shadow-none"
                icon={<AntDesign name="closecircle" size={24} color="black" />}
                onPress={() => {
                  dispatch(internetState(false)), dispatch(LoadingSync(false));
                }}
              />
            </View>

            <View className="w-64 h-64">
              <AppAnimation
                File={InternetLoading ? InternetError : AnimationSync}
              />
            </View>
            <Text className="font-bold  text-[18px]">{Message}</Text>
          </View>
        )}
      </View>
    </>
  );
}
