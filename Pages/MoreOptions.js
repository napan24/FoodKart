import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  Searchbar,
  Surface,
  IconButton,
  MD3Colors,
  Divider,
  Dialog, Portal, Provider
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MoreOptions({ navigation, route }) {
    const { data, URL ,canteenData} = route.params;
  const [name, setName] = useState(route.params.data.data[0].name);
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
    function confirmedOrders() {
        navigation.navigate("ConfirmedOrders", { data: data, URL: URL });
      }
      function RawMaterial() {
        navigation.navigate("RawMaterial", { data: data, URL: URL });
      }
      function ChangePassword() {
        navigation.navigate("ChangePassword", { data: data, URL: URL });
      }
      const CloseCanteen = async () => {
        var option="Close";
        const check = await fetch(
          URL+"/OpenCloseCanteen",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, option}),
          }
        );
        const result = await check.json();
        showDialog();
      };
      const OpenCanteen = async () => {
        var option="Open";
        const check = await fetch(
          URL+"/OpenCloseCanteen",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, option}),
          }
        );
        const result = await check.json();
        showDialog();
      };
    return (
      <Provider>  
        <View className="flex mt-8">
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Canteen Closed</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Text className="mt-4 self-center text-3xl">
          Options
        </Text>
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
        {canteenData[0].status==="Open"&&<Button
          onPress={() => {
            CloseCanteen();
          }}
          className="mt-2 self-center text-2xl w-[90%] bg-[#EBC500] h-16 flex flex-row justify-center rounded-3xl items-center"
          mode="contained"
        >
          <Text className="mt-11 text-xl text-white">Close Canteen</Text>
        </Button>}
        {canteenData[0].status==="Close"&&<Button
          onPress={() => {
            OpenCanteen();
          }}
          className="mt-2 self-center text-2xl w-[90%] bg-[#EBC500] h-16 flex flex-row justify-center rounded-3xl items-center"
          mode="contained"
        >
          <Text className="mt-11 text-xl text-white">Open Canteen</Text>
        </Button>}
      </View>
      </Provider>
  )
}

const styles = StyleSheet.create({})