import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Text,
  ProgressBar,
  MD3Colors,
  Surface,
} from "react-native-paper";
import {db} from "./config"
import {ref,onValue} from "firebase/database"
export default function RawMaterial() {
  const [weight,setWeight]=useState("");
  const item = { progress: 0.5 };

  useEffect(() => {
    onValue(ref(db, '/'), querySnapShot => {
      let data = querySnapShot.val() || {};
      setWeight(data.weight);
    });
  }, []);

  return (
    <View className="flex justify-center items-center mt-12">
      <Text className="text-3xl">Inventory</Text>
      <Card className="mt-6 w-[90%]" mode="outlined">
        <Card.Content className="flex flex-row">
          <Text className="ml-4 pb-4 text-2xl" variant="titleLarge">
            Grains-
          </Text>
          <Text className="ml-4 pb-4 text-xl mt-1" variant="titleLarge">
            {weight}gms
          </Text>
        </Card.Content>
        <ProgressBar
          className="mt-2 h-4"
          progress={weight/100}
          color={weight/100 > 0.3 ? "#8BED4F" : MD3Colors.error50}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
