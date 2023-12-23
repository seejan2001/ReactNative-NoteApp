import { StyleSheet, StatusBar, TextInput, View, Text } from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowButton from "../component/Button/ArrowButton";

export default Initial = () => {
  const [name, setName] = useState("");
  //   FUNCTIONS
  const handleChange = (text) => {
    setName(text);
  };

  const handleStorage = async () => {
    const user = { name: name };
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log("Error thrown from AsyncStorage");
    }
  };

  //   RETURN STATEMENT
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Enter Your Name</Text>
        <TextInput
          placeholder="Click For Entering Name"
          style={styles.inputField}
          onChangeText={(text) => handleChange(text)}
        />
        {name.length > 2 ? (
          <ArrowButton name="Next" onPress={() => handleStorage()} />
        ) : (
          ""
        )}
        <StatusBar style="auto" />
      </View>
    </>
  );
};
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    width: width - 50,
    borderWidth: 1,
    borderColor: "orange",
    height: 50,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    width: width - 50,
    fontWeight: "600",
    padding: 10,
  },
});
