import tw from "twrnc";
import ScreenWrapper, {
  ScreenWrapperNoScroll,
} from "../../shared/components/ScreenWrapper";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "../../shared/components/Loading";

export default function PokemonListingScreen() {
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const filteredData = data?.results?.filter((item) =>
    item.name.includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    let ignore = false;
    const effectCleanUp = () => {
      ignore = true;
    };

    async function fetchData() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=1025`,
        );
        const data = await response.json();
        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        console.log({ error });
      }
    }

    fetchData();

    return effectCleanUp;
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScreenWrapperNoScroll bgColor="#DC0A2D">
      <View style={tw`px-4 pb-5 pt-4`}>
        <Text style={tw`mb-2 text-2xl font-bold text-white`}>Pokédex</Text>
        <View style={tw`flex-row`}>
          <View
            style={tw`flex-1 flex-row items-center justify-center rounded-3xl bg-white px-4 shadow-md`}
          >
            <FontAwesome
              name="search"
              size={12}
              color="#DC0A2D"
              style={tw`mr-2 w-3`}
            />
            <TextInput
              style={tw`flex-1 text-xs font-bold text-[#666666]`}
              placeholder="Name"
              onChangeText={setSearchText}
              value={searchText}
            />
          </View>
        </View>
      </View>
      <FlatList
        style={tw`m-1 rounded-lg bg-white shadow-md`}
        contentContainerStyle={tw`gap-2 px-3 py-6`}
        columnWrapperStyle={tw`gap-2`}
        numColumns={3}
        data={filteredData}
        renderItem={({ item }) => {
          const pokemonId = item.url.split("pokemon/")[1].slice(0, -1);

          return (
            <Pressable
              style={tw`relative aspect-square max-w-[32%] flex-1 rounded-lg border-2 border-[#EFEFEF] px-2 py-1`}
              key={pokemonId}
              onPress={() => navigation.navigate("Pokemon", { pokemonId })}
            >
              <View
                style={tw`absolute bottom-0 left-0 right-0 h-[40%] rounded-md bg-[#EFEFEF]`}
              ></View>
              <Text style={tw`text-right text-xs text-[#666666]`}>
                #{pokemonId}
              </Text>
              <Image
                style={tw`mx-auto aspect-square flex-shrink`}
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
                }}
              />
              <Text
                numberOfLines={1}
                style={tw`text-center text-xs capitalize text-[#1D1D1D]`}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </ScreenWrapperNoScroll>
  );
}
