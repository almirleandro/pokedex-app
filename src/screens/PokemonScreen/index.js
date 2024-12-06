import tw from "twrnc";
import ScreenWrapper, {
  ScreenWrapperNoScroll,
} from "../../shared/components/ScreenWrapper";
import { FlatList, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "../../shared/components/Loading";

export default function PokemonScreen({ route }) {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const { pokemonId } = route.params;
  const navigation = useNavigation();

  const typeColor = getTypeColor(data?.types?.[0].type.name);

  useEffect(() => {
    let ignore = false;
    const effectCleanUp = () => {
      ignore = true;
    };

    async function fetchData() {
      try {
        const response = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`),
        ]);
        const data1 = await response[0].json();
        const data2 = await response[1].json();
        if (!ignore) {
          setData(data1);
          setData2(data2);
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
    <ScreenWrapper bgColor={typeColor}>
      <View style={tw`flex-row items-center px-6 py-6 pb-44`}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome
            name="arrow-left"
            size={20}
            color="white"
            style={tw`mr-2`}
          />
        </Pressable>
        <Text style={tw`mx-2 flex-1 text-2xl font-bold capitalize text-white`}>
          {data.name}
        </Text>
        <Text style={tw`text-xs font-bold text-white`}>#{data.id}</Text>
      </View>
      <View
        style={tw`m-1 flex-1 gap-4 rounded-lg bg-white px-5 pb-5 pt-14 shadow-md`}
      >
        <Image
          style={tw`absolute -top-[144px] aspect-square w-[200px] flex-shrink self-center`}
          source={{
            uri: data.sprites.other["official-artwork"].front_default,
          }}
        />
        <View style={tw`flex-row justify-center gap-4`}>
          {data.types.map((type) => {
            return (
              <TypeBadge
                key={type.type.name}
                type={type.type.name}
                typeColor={typeColor}
              />
            );
          })}
        </View>
        <Text style={tw`text-center text-sm font-bold text-[${typeColor}]`}>
          About
        </Text>
        <View style={tw`flex-1 flex-row`}>
          <View style={tw`flex-1 border-r border-[#E0E0E0]`}>
            <Text style={tw`mb-3 text-center text-xs text-[#1D1D1D]`}>
              {+data.weight / 10} kg
            </Text>
            <Text style={tw`text-center text-xs text-[#666666]`}>Weight</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`mb-3 text-center text-xs text-[#1D1D1D]`}>
              {+data.height / 10} m
            </Text>
            <Text style={tw`text-center text-xs text-[#666666]`}>Height</Text>
          </View>
        </View>
        <Text style={tw`py-4 text-xs text-[#1D1D1D]`}>
          {data2.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            .flavor_text.replace(/\n/g, " ")}
        </Text>
        <Text style={tw`text-center text-sm font-bold text-[${typeColor}]`}>
          Base Stats
        </Text>
        <View>
          <Stats stats={data.stats} typeColor={typeColor} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

function TypeBadge({ type }) {
  const typeColor = getTypeColor(type);
  return (
    <View style={tw`rounded-xl bg-[${typeColor}] px-3 py-0.5`}>
      <Text style={tw`text-xs font-bold capitalize text-white`}>{type}</Text>
    </View>
  );
}

function Stats({ stats, typeColor }) {
  return stats.map((stat) => {
    const statName = getStatName(stat.stat.name);
    const num = (+stat.base_stat * 100) / 255;
    return (
      <View style={tw`w-full flex-row`} key={statName}>
        <Text style={tw`w-10 text-right text-xs font-bold text-[${typeColor}]`}>
          {statName}
        </Text>
        <View style={tw`mx-3 border-l border-[#E0E0E0]`} />
        <Text style={tw`w-10 text-xs`}>{stat.base_stat}</Text>
        <View style={tw`flex-1 justify-center`}>
          <View style={tw`w-[${num}%] h-1 bg-[${typeColor}]`} />
        </View>
      </View>
    );
  });
}

function getStatName(stat) {
  switch (stat) {
    case "hp":
      return "HP";
    case "attack":
      return "ATK";
    case "defense":
      return "DEF";
    case "special-attack":
      return "SATK";
    case "special-defense":
      return "SDEF";
    case "speed":
      return "SPE";
  }
}

function getTypeColor(type) {
  switch (type) {
    case "grass":
      return "#74CB48";
    case "fire":
      return "#F57D31";
    case "water":
      return "#6493EB";
    case "bug":
      return "#A7B723";
    case "electric":
      return "#F9CF30";
    case "ghost":
      return "#70559B";
    case "normal":
      return "#AAA67F";
    case "psychic":
      return "#FB5584";
    case "steel":
      return "#B7B9D0";
    case "dark":
      return "#75574C";
    case "dragon":
      return "#7037FF";
    case "fairy":
      return "#E69EAC";
    case "fighting":
      return "#C12239";
    case "flying":
      return "#A891EC";
    case "ice":
      return "#9AD6DF";
    case "rock":
      return "#B69E31";
    case "poison":
      return "#A43E9E";
    case "ground":
      return "#DEC16B";
    default:
      return "#DC0A2D";
  }
}
