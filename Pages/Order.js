import { View, Text } from "react-native";
import React from "react";
import { Searchbar, ProgressBar, MD3Colors, Surface } from "react-native-paper";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { SafeAreaView, FlatList } from "react-native";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Hexagon",
    image: require("../Images/PizzaHut.jpg"),
    progress: 0.7,
    rating: 4.2,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "H3 Canteen",
    image: require("../Images/apnaSweets.jpg"),
    progress: 0.3,
    rating: 3.5,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "H1 Canteen",
    image: require("../Images/mcDonloads.jpg"),
    progress: 0.5,
    rating: 4.8,
  },
];
export default function Order() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);
    const renderItem = ({ item }) => (
        <>
        <View className="w-[100%] h-20 bg-black flex flex-row justify-between">
          <View className="flex justify-center flex-row ml-2 self-center">
          <Image
              className="h-6 w-6 mb-2 mr-3 rounded-xl"
              source={require("../Images/Veg.png")}
            ></Image>
            <Text className="text-white text-xl">{item.title}</Text>
          </View>
          <View>
            <View className="flex flex-row">
              <View className="flex flex-col">
                <View className="flex flex-row mt-3 bg-red-800 border-2 border-green-400 h-10 mr-4">
                  <IconButton
                    className="mt-0 ml-0"
                    icon="minus"
                    iconColor="green"
                    size={20}
                    onPress={() => {
                      decreseItem(item);
                    }}
                  />
                  <Text className="text-white text-2xl">{item.count}</Text>
                  <IconButton
                    className="mt-0 mr-0"
                    icon="plus"
                    iconColor="green"
                    size={20}
                    onPress={() => {
                      addItem(item);
                    }}
                  />
                </View>
                <View className="w-24 flex justify-center flex-row ">
                  <Text className="text-white text-xl">
                    ₹{item.count * item.price}
                  </Text>
                </View>
              </View>
              <Image
                className="h-[72px] w-[72px] mr-2 mt-1 rounded-xl"
                source={item.image}
              ></Image>
            </View>
          </View>
        </View>
        <Divider />
      </>
      );
    return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        className="mt-12 w-11/12 ml-4 rounded-3xl"
      />
      <FlatList
        className="mt-3"
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
