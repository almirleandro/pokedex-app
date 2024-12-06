import tw from "twrnc";
import { ScreenWrapperNoScroll } from "../../shared/components/ScreenWrapper";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import pikachu from "../../assets/pikachu.png";

export default function Loading() {
  return (
    <ScreenWrapperNoScroll bgColor="#DC0A2D">
      <View
        style={tw`mt-15 mx-4 mb-4 flex-1 justify-center rounded-lg bg-white shadow-md`}
      >
        <Image
          style={tw`mx-auto aspect-square w-1/2 flex-shrink`}
          source={pikachu}
        />
        <Text style={tw`text-center`}>Loading Data...</Text>
      </View>
    </ScreenWrapperNoScroll>
  );
}
