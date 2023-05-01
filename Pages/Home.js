import { StatusBar } from "expo-status-bar";
import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View} from "react-native";
import { Searchbar,ProgressBar, MD3Colors,Surface } from "react-native-paper";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { SafeAreaView, FlatList } from "react-native";
import { Chip } from "react-native-paper";
import {db} from "./configPeople"
import {ref,onValue} from "firebase/database"
export default function Home({ navigation ,route}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [canteenData,setCanteenData]=React.useState();
  const onChangeSearch = (query) => setSearchQuery(query);
  const [profile,setProfile]=useState(route.params.data);
  const [people,setPeople]=useState(0);
  // const [peopleCount,setPeopleCount]=useState("10);
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Hexagon",
      image: require("../Images/Hexagon.jpeg"),
      progress:0.8,
      rating:4.2
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "H3 Canteen",
      image: require("../Images/H3.jpeg"),
      progress:0.3,
      rating:3.5
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Nescafe",
      image: require("../Images/Nescafe.jpeg"),
      progress:0.5,
      rating:4.8
    },
  ];
  useEffect(() => {
    onValue(ref(db, '/'), querySnapShot => {
      let data = querySnapShot.val() || {};
      console.log(data);
    });
  }, []);
  const CanteenData = async () => {
    const check = await fetch(
      URL+"/getCanteenData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const result = await check.json();
    setCanteenData(result.data);
  };
  useEffect(() => {
    CanteenData();
  }, [profile]);
  useEffect(() => {
    console.log(canteenData);
  }, [canteenData])
  function OrderHistory(){
    navigation.navigate("OrderHistory", { data: profile, URL: URL });
  }
  const URL=route.params.URL;
  const renderItem = ({ item }) => (   
    canteenData&&canteenData.find(o => o.name === item.title).status=="Open"&&<Surface>
      <Card className="mt-3 mb-4 w-11/12 ml-4 " onPress={() => navigation.navigate("About", { title: item.title,rating: item.rating,headerImage:item.image,data:profile,URL:URL })}>
        <Card.Cover source={item.image} />
        <Card.Content className="mt-3 ">
          <View className="flex flex-row justify-between">
            <Title> {item.title} </Title>
            <Chip
              className="bg-green-500	text-white rounded-xl p-0"
              onPress={() => console.log("Pressed")}
            >
              Open
            </Chip>
          </View>
          <ProgressBar
          className="mt-4" 
          progress={item.progress} color={item.progress<0.5?"#8BED4F":MD3Colors.error50} />
        </Card.Content>
      </Card>
    </Surface>
  );

  return (
    <>
    <Text className="mt-12 text-2xl self-center">Canteens IIITDMJ</Text>
      {canteenData&&<FlatList
        className="mt-3"
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />}
      <Button
          onPress={() => {
            OrderHistory();
          }}
          className="mt-2 self-center text-2xl w-[90%] bg-[#EBC500] h-12 flex flex-row justify-center rounded-3xl items-center"
          mode="contained"
        >
          <Text className="mt-11 text-xl text-white">Order History</Text>
        </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
