import { StyleSheet, View } from "react-native";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Text,
  ProgressBar,
  MD3Colors,
  Surface,
} from "react-native-paper";

export default function RawMaterial() {
  const item = { progress: 0.5 };

  return (
    <View className="flex justify-center items-center mt-12">
      <Text className="text-3xl">
        Inventory
      </Text>
      <Card className="mt-4 w-[90%]" mode="outlined">
        <Card.Content className="flex justify-center">
          <Text className="ml-4 pb-4 text-2xl" variant="titleLarge">Rice</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <ProgressBar
          className="mt-2 h-4"
          progress={item.progress}
          color={item.progress > 0.3 ? "#8BED4F" : MD3Colors.error50}
        />
      </Card>
      <Card className="mt-6 w-[90%]" mode="outlined">
        <Card.Content className="flex flex-row">
          <Text className="ml-4 pb-4 text-2xl" variant="titleLarge">Grains</Text>
          <Text className="ml-4 pb-4 text-xl mt-1" variant="titleLarge">Grains</Text>
        </Card.Content>
        <ProgressBar
          className="mt-2 h-4"
          progress={item.progress}
          color={item.progress > 0.3 ? "#8BED4F" : MD3Colors.error50}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
