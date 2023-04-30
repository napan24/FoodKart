import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { IconButton,Button, TextInput, Text } from "react-native-paper";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();
const Login = ({ route, navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "191505894999-ohc8drk334fg22uf4j1ai4dtdlvcb9uq.apps.googleusercontent.com",
    iosClientId:
      "191505894999-ohc8drk334fg22uf4j1ai4dtdlvcb9uq.apps.googleusercontent.com",
    androidClientId:
      "191505894999-ohc8drk334fg22uf4j1ai4dtdlvcb9uq.apps.googleusercontent.com",
    webClientId:
      "191505894999-ohc8drk334fg22uf4j1ai4dtdlvcb9uq.apps.googleusercontent.com",
  });
  const URL="https://74b1-110-227-52-249.ngrok-free.app";
  React.useEffect(() => {
    if (response?.type === "success") {
      const {
        authentication: { accessToken },
      } = response;
      fetchUserInfo(accessToken);
    }
  }, [response]);
  async function fetchUserInfo(token) {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const details = await response.json();
    const email = details.email;
    const name = details.name;
    console.log(email);
    // if(details.hd=="iiitdmj.ac.in"){
    //   console.log("entered");
    //   check(email,name);
    // }
    check(email, name);
    // if (result && result.length > 0) {
    //   console.log("exist");
    // } else {
    //   const signup = await fetch("/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, name }),
    //   });
    //   const result = await check.json();
    //   console.log(result);
    // }
  }
  const check = async (email, name) => {
    const check = await fetch(
      URL+"/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      }
    );
    const result = await check.json();
    navigation.navigate("Home", { data: result,URL:URL });
  };
  const CanteenLogin = async (email, password) => {
    const check = await fetch(
      URL+"/canteenLogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const result = await check.json();
    console.log(result);
    if(result&&result.data.length>0){
      navigation.navigate("OrderStatusPage", { data: result,URL:URL });
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../Images/BackgroundLogin.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.box}>
          <Text variant="displayLarge" className="mt-16 mb-32 text-[#EBC500]">
            FoodKart
          </Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ width: "90%" }}
            className="mb-4 bg-[#EBC500]"
            left={<TextInput.Icon icon="email" />}
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{ width: "90%" }}
            className="bg-[#EBC500]"
            left={<TextInput.Icon icon="key" />}
          />
          <Button
            onPress={() => {
              CanteenLogin(email,password);
            }}
            className="mt-4 self-center text-2xl w-[50%] bg-[#EBC500] h-[8%] flex flex-row justify-center rounded-3xl"
            mode="contained"
          >
            <Text className="mt-11 text-xl text-black">LOGIN</Text>
          </Button>
          <Text variant="titleLarge" className="mt-4 text-[#EBC500]">
            Or Login Using
          </Text>
          {/* <Image src={require("../Images/PizzaHut.jpg")} alt="my image" /><Button title="" ></Button> */}
          <View className="w-[100%] flex justify-around flex-row">
            <TouchableOpacity
              onPress={() => {
                promptAsync();
              }}
              className="mt-4"
            >
              <Image
                className="w-16 h-16"
                source={require("../Images/google.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          {/* <ImageBackground source={require("../Images/google.png")}>
          <Button
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync();
            }}
          />
          </ImageBackground> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  imageWrapper: {
    width: 200,
    height: 300,
    borderRadius: 20,
  },
  box: {
    height: 600,
    width: 350,
    backgroundColor: "rgba(255, 255, 255, .25)",
    display: "flex",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
export default Login;
