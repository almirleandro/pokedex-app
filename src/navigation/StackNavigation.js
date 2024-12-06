import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonListingScreen from "../screens/PokemonListScreen";
import { createStaticNavigation } from "@react-navigation/native";
import PokemonScreen from "../screens/PokemonScreen";
import tw from "twrnc";

const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: PokemonListingScreen,
    Pokemon: PokemonScreen,
  },
  screenOptions: {
    headerShown: false,
    contentStyle: tw`bg-[#DC0A2D]`,
  },
});

const StackNavigation = createStaticNavigation(RootStack);

export default StackNavigation;
