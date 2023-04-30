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
export default function MoreOptions({ navigation, route }) {
    const { data, URL } = route.params;
  const [name, setName] = useState(route.params.data.name);
    function confirmedOrders() {
        navigation.navigate("ConfirmedOrders", { data: data, URL: URL });
      }
      function RawMaterial() {
        navigation.navigate("RawMaterial", { data: data, URL: URL });
      }
      function ChangePassword() {
        navigation.navigate("ChangePassword", { data: data, URL: URL });
      }
    return (
    <View className="flex mt-8">
        <Button
          onPress={() => {
            confirmedOrders();
          }}
          className="mt-4 self-center text-2xl w-[90%] bg-[#EBC500] h-16 flex flex-row justify-center rounded-3xl items-center"
          mode="contained"
        >
          <Text className=" text-xl text-white">Confirmed Orders</Text>
        </Button>
        <Button
          onPress={() => {
            RawMaterial();
          }}
          className="mt-2 self-center text-2xl w-[90%] bg-[#EBC500] h-16 flex flex-row justify-center rounded-3xl items-center"
          mode="contained"
        >
          <Text className="mt-11 text-xl text-white">Raw Material Left</Text>
        </Button>
        <Button
          onPress={() => {
            ChangePassword();
          }}
          className="mt-2 self-center text-2xl w-[90%] bg-[#EBC500] h-16 flex flex-row justify-center rounded-3xl items-center"
          mode="contained"
        >
          <Text className="mt-11 text-xl text-white">Change Password</Text>
        </Button>
      </View>
  )
}

const styles = StyleSheet.create({})