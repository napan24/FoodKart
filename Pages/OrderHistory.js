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
export default function OrderHistory({ navigation ,route}) {
  const {URL,data}=route.params;
  const [orders,setOrders]=useState();
  const searchOrders = async () => {
    const email=data.data[0].email;
    const check = await fetch(URL + "/searchOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await check.json();
    setOrders(result.data);
  };
  useEffect(() => {
    searchOrders();
  }, [data])
  const showItems = ({ item }) => (
    <View className="mb-3 flex flex-row justify-between">
      <Text className="text-xl">{item.title}</Text>
      <Text className="text-xl">X {item.count}</Text>
    </View>
  );
  const renderItem = ({ item }) =>
    (
      <Surface className="mt-4">
        <Card className="mt-3 mb-4 w-11/12 ml-4 bg-[#EBC500]">
          <Card.Content className="mt-3 ">
            <FlatList
              className="mt-3"
              data={item.items}
              renderItem={showItems}
              keyExtractor={(item) => item.id}
            />
            <Text className="text-xl mt-2 text-white">OTP-{item.OTP}</Text>
          </Card.Content>
        </Card>
      </Surface>
    );
    return (
    <View>
      <Text className="mt-12 self-center text-2xl">Order History</Text>
      <FlatList
        className=""
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({})