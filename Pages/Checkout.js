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
import Icon from "react-native-vector-icons/Ionicons";


export default function Checkout({ route, navigation }) {
  const { items, total } = route.params;
  const [itemList, addItemList] = useState(items);
  const [sum, setSum] = useState(total);
  const [canteenName, setCanteenName] = useState(route.params.canteenName);
  const [profile,setProfile]=useState(route.params.data.data);
  const [email,setEmail]=useState(profile[0].email);
  const [visible, setVisible] = React.useState(false);
  const URL=route.params.URL;
  function CheckOut(){
    // var options = {
    //   description: 'Credits towards consultation',
    //   image: 'https://i.imgur.com/3g7nmJC.jpg',
    //   currency: 'INR',
    //   key: 'rzp_test_Vk9U14SoWfMZCT',
    //   amount: '5000',
    //   name: 'Acme Corp',
    //   order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
    //   prefill: {
    //     email: 'gaurav.kumar@example.com',
    //     contact: '9191919191',
    //     name: 'Gaurav Kumar'
    //   },
    //   theme: {color: '#53a20e'}
    // }
    // RazorpayCheckout.open(options).then((data) => {
    //   // handle success
    //   alert(`Success: ${data.razorpay_payment_id}`);
    // }).catch((error) => {
    //   // handle failure
    //   alert(`Error: ${error.code} | ${error.description}`);
    // });


  }
  function addItem(item) {
    if (itemList && itemList.some((product) => product.title === item.title)) {
      const newState = itemList.map((obj) => {
        if (obj.title === item.title) {
          return { ...obj, count: obj.count + 1 };
        }
        return obj;
      });
      addItemList(newState);
    }
    setSum(sum + item.price);
  }
  function decreseItem(item) {
    var check = true;
    setSum(sum - item.price);
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
  const checkout = async () => {
    const check = await fetch(URL+"/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, itemList,canteenName }),
    });
    const result = await check.json();
    showDialog();
  };
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const renderItem = ({ item }) => (
    <>
    {console.log(itemList)}
      <View className="w-[100%] h-20 bg-[#EBC500] flex flex-row justify-between">
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
              <View className="flex flex-row mt-3 bg-white border-2 border-green-400 h-10 mr-4">
                <IconButton
                  className="mt-0 ml-0"
                  icon="minus"
                  iconColor="green"
                  size={20}
                  onPress={() => {
                    decreseItem(item);
                  }}
                />
                <Text className="text-green-400 text-2xl">{item.count}</Text>
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
    <Provider>
      <SafeAreaView style={styles.container} className="flex">
        <View className="w-[100%] h-16 bg-white flex flex-row">
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Ordered Successfully</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
          <TouchableOpacity
            className="ml-2 mt-4"
            onPress={() => navigation.navigate("About")}
          >
            <Icon name="arrow-back-outline" size={30} color="black"></Icon>
          </TouchableOpacity>
          <Text className="text-2xl text-black mt-4 ml-4">Cart</Text>
        </View>
        <FlatList
          data={itemList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Divider />
        <View className="bg-white w-[100%] h-16 flex flex-row justify-end justify-between">
          <Text className="self-center text-xl ml-2">₹{sum}</Text>
          <Button
            onPress={() => {
              checkout();
            }}
            className=" self-center text-2xl text-white w-[50%] bg-green-600 h-[100%] flex flex-row justify-center rounded-none"
            mode="contained"
          >
            <Text className="mt-11">Make Payment</Text>
          </Button>
        </View>
      </SafeAreaView>
      </Provider>
    </>
  );
}
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
