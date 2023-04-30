import { StyleSheet, Text, View } from "react-native";
import React,{useState} from "react";
import { HelperText, TextInput, Button } from "react-native-paper";

export default function ChangePassword({ navigation, route }) {
    const { data, URL } = route.params;
    const [name, setName] = useState(route.params.data.data[0].name);
  const [newPassword, setNewPassword] = React.useState("123");
  const [CheckNewPassword, setCheckNewPassword] = React.useState("123");
  const onChangenewPassword = (text) => setNewPassword(text);
  const onChangeCheckNewPassword = (text) => setCheckNewPassword(text);
  const ChangePassword = async () => {
    if(newPassword!==CheckNewPassword){
        return;
    }
    console.log(newPassword);
    const check = await fetch(
      URL+"/changePassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,newPassword }),
      }
    );
    const result = await check.json();
      console.log(result);
  };
  return (
    <>
      <View className="flex items-center">
        <Text className="mt-24 text-2xl">Change Password</Text>
        <View className="flex mt-12">
          <TextInput
            className="h-20 w-96 mb-4 text-xl"
            label="New Password"
            value={newPassword}
            onChangeText={onChangenewPassword}
          />
          <TextInput
            className="h-20 w-96 text-xl"
            label="Confirm Password"
            value={CheckNewPassword}
            onChangeText={onChangeCheckNewPassword}
          />
        </View>
        <Button
            onPress={() => {
                ChangePassword();
              }}
          className="mt-4 self-center text-2xl w-[90%] bg-[#EBC500] h-16 flex flex-row justify-center rounded-3xl items-center"
          mode="contained"
        >
          <Text className="mt-11 text-xl text-white">Change Password</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
