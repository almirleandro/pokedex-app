import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw, { useDeviceContext } from "twrnc";
import React from "react";

export default function ScreenWrapper({ children, bgColor }) {
  return (
    <ScrollView style={tw`flex-1 bg-[${bgColor}]`}>
      <StatusBar style="light" />
      <SafeAreaView style={tw`flex-1`}>{children}</SafeAreaView>
    </ScrollView>
  );
}

export function ScreenWrapperNoScroll({ children, bgColor }) {
  useDeviceContext(tw);

  return (
    <View style={tw`flex-1 bg-[${bgColor}]`}>
      <StatusBar style="light" />
      <SafeAreaView style={tw`relative h-[100vh] flex-1`}>
        {children}
      </SafeAreaView>
    </View>
  );
}
