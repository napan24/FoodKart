import React, { useState, useEffect } from "react";
import {
  Button,
  Searchbar,
  Surface,
  IconButton,
  MD3Colors,
  Divider,
} from "react-native-paper";
import { View, Alert, Text, Image, FlatList, StyleSheet,TouchableOpacity,LogBox  } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Aloo Patties",
    progress: 0.7,
    rating: 4.2,
    price: 20,
    image: require("../Images/alooPatties.jpg"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Sandwich",
    progress: 0.3,
    rating: 3.5,
    price: 50,
    image: require("../Images/sandwich.jpg"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Meal",
    progress: 0.5,
    rating: 4.8,
    price: 80,
    image: require("../Images/meal.jpeg"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d62",
    title: "Maggi",
    progress: 0.5,
    rating: 4.8,
    price: 30,
    image: require("../Images/maggi.jpg"),
  },
];
const AboutPage = ({ route, navigation }) => {
  const { headerImage, title, rating } = route.params;
  const [profile,setProfile]=useState(route.params.data);
  const [canteenName,setCanteenName]=useState(route.params.title);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [itemList, addItemList] = useState([]);
  const [total, setTotal] = useState(0);
  const URL=route.params.URL;
  function addItem(item) {
    if (itemList && itemList.some((product) => product.title === item.title)) {
      const newState = itemList.map((obj) => {
        if (obj.title === item.title) {
          return { ...obj, count: obj.count + 1 };
        }
        return obj;
      });
      addItemList(newState);
    } else {
      var temp = item;
      temp.count = 1;
      var obj = itemList.concat(temp);
      addItemList(obj);
    }
    setTotal(total+item.price);
  }
  function decreseItem(item) {
    var check = true;
    setTotal(total-item.price);
    const newState = itemList.map((obj) => {
      if (obj.title === item.title) {
        if (obj.count - 1 == 0) {
          check = false;
        }
        return { ...obj, count: obj.count - 1 };
      }
      return obj;
    });
    if (check) {
      addItemList(newState);
    } else {
      var items = itemList.filter((obj) => obj.title !== item.title);
      addItemList(items);
    }
  }
  useEffect(() => {
    console.log("data", itemList);
  }, [itemList]);

  const renderItem = ({ item }) => (
    <>
      <View className="bg-white w-[100%] flex flex-row justify-between h-56 border-t-4 border-neutral-100">
        <View className="mt-12 ml-6">
          <Image
            className="h-6 w-6 mb-2 mr-6 rounded-xl"
            source={require("../Images/Veg.png")}
          ></Image>
          <Text className="text-xl">{item.title}</Text>
          <View>
            <Text className="text-lg">₹ {item.price}</Text>
          </View>
        </View>

        <View>
          <Image
            className="h-36 w-36 mt-6 mr-6 rounded-xl"
            source={item.image}
          ></Image>
          {itemList &&
          itemList.some((product) => product.title === item.title) ? (
            <View className="h-10 w-36 flex flex-row justify-between bg-white rounded-3xl border-4 border-neutral-100 ">
              <IconButton
                className="mt-0 ml-0"
                icon="minus"
                iconColor="green"
                size={20}
                onPress={() => {
                  decreseItem(item);
                }}
              />
              {itemList &&
                itemList
                  .filter((product) => product.title === item.title)
                  .map((filteredName) => (
                    <Text className="mt-0.5 text-lime-600 text-lg">
                      {filteredName.count}
                    </Text>
                  ))}
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
          ) : (
            <Button
              className="mr-6"
              mode="elevated"
              onPress={() => {
                addItem(item);
              }}
            >
              <Text>Add</Text>
            </Button>
          )}
        </View>
      </View>
      <Divider />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        className="my-4 w-11/12 ml-4 rounded-3xl bg-[#EBC500]"
      />
      {itemList.length > 0 && (
        <View className="h-20 w-[100%] bg-[#EBC500] rounded-t-3xl absolute bottom-0 z-10 flex flex-row justify-between">
          <Image
            className="h-14 w-14 mt-4 ml-2 rounded-[30px]"
            source={headerImage}
          ></Image>
          <TouchableOpacity onPress={() => navigation.navigate("Checkout", { items:itemList,total:total,data:profile,canteenName:canteenName,URL:URL })} className=" h-[80%] w-[40%] mt-2 mr-1 bg-white rounded-3xl flex flex-row justify-center">
            <View className="flex flex-col mt-1.5">
              <View className="flex flex-row">
                <Text className="text-lime-600 text-md mr-1">
                  {itemList.length} Item |
                </Text>
              <Text className="text-lime-600 text-md">₹{total} </Text>
              </View>
              <Text className="text-lime-600 text-xl">Checkout</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View className={itemList.length>0?"w-[100%] bg-white outline outline-offset-2 outline-4 mb-40":"w-[100%] bg-white outline outline-offset-2 outline-4 mb-20"}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
export default AboutPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
