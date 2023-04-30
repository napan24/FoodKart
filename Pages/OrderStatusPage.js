import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Searchbar,
  ProgressBar,
  MD3Colors,
  Surface,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Chip,
} from "react-native-paper";
export default function OrderStatusPage({ navigation, route }) {
  const { data, URL } = route.params;
  const [name, setName] = useState(route.params.data.name);
  const [orders, setOrders] = useState();
  function MoreOptions() {
    navigation.navigate("MoreOptions", { data: data, URL: URL });
  }
  const getorders = async () => {
    const check = await fetch(URL + "/getorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const result = await check.json();
    setOrders(result.orders);
  };
  const orderStatus = async (item, value) => {
    const id = item._id;
    const check = await fetch(URL + "/orderStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, value }),
    });
    const result = await check.json();
    console.log(result);
  };
  useEffect(() => {
    setName(route.params.data.data[0].name);
  }, []);
  useEffect(() => {
    getorders();
  }, [name]);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  const showItems = ({ item }) => (
    <View className="mb-3 flex flex-row justify-between">
      <Text className="text-xl">{item.title}</Text>
      <Text className="text-xl">X {item.count}</Text>
    </View>
  );
  const renderItem = ({ item }) =>
    item.orderStatus === "Awaiting Confirmation" && (
      <Surface className="mt-4">
        <Card className="mt-3 mb-4 w-11/12 ml-4 bg-[#EBC500]">
          <Card.Content className="mt-3 ">
            <FlatList
              className="mt-3"
              data={item.items}
              renderItem={showItems}
              keyExtractor={(item) => item.id}
            />
          </Card.Content>
          <View className="flex flex-row mb-2 justify-around">
            <Button
              onPress={() => {
                orderStatus(item, "ACCEPT");
              }}
              className="mt-4 self-center text-2xl w-[40%] bg-green-900 h-12 flex flex-row justify-center rounded-3xl"
              mode="contained"
            >
              <Text className="mt-11 text-xl text-green-600">CONFIRM</Text>
            </Button>
            <Button
              onPress={() => {
                orderStatus(item, "DECLINE");
              }}
              className="mt-4 self-center text-2xl w-[40%] bg-red-900 h-12 flex flex-row justify-center rounded-3xl"
              mode="contained"
            >
              <Text className="mt-11 text-xl text-red-600">DECLINE</Text>
            </Button>
          </View>
        </Card>
      </Surface>
    );
  return (
    <>
      <FlatList
        className="mt-3"
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View className="flex flex-row">
        <Button
          onPress={() => {
            MoreOptions();
          }}
          className="mt-4 self-center text-2xl w-[100%] bg-[#EBC500] h-12 flex flex-row justify-center rounded-xl"
          mode="contained"
        >
          <Text className="mt-11 text-xl text-white">More Options</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
