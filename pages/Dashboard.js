import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import ArrowButton from "../component/Button/ArrowButton";
import Notes from "./Notes";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Message from "../component/Message";
import { useNote } from "../component/Contexthook";

export default Dashboard = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const { note, setNote, asyncStoreCall } = useNote();

  const shiftToModalComponent = () => {
    setVisible(true);
  };

  const displayNoteInDashboard = async (title, desc) => {
    // let result = [...note, Dashboard];
    // setNote(result);
    let object = {
      id: Date.now(),
      title: title,
      desc: desc,
      time: Date.now(),
    };
    console.log("Inside object", object);
    let result = [...note, object];
    setNote(result);
    await AsyncStorage.setItem("notes", JSON.stringify(result));
  };

  const shiftNextPage = (item) => {
    navigation.navigate("NoteDetail", { item });
  };

  return (
    <View>
      <View style={styles.hero}>
        <View>
          <Text style={styles.headTitle}>Note App</Text>
        </View>
      </View>
      <View style={styles.collection}>
        <View style={styles.mapping}>
          {!note.length ? (
            <View style={styles.textfield}>
              <Text>ADD NOTES</Text>
            </View>
          ) : null}
          <FlatList
            data={note}
            numColumns={2}
            renderItem={({ item }) => (
              <Message
                title={item.title}
                desc={item.desc}
                onPress={() => shiftNextPage(item)}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.addButton}>
        <View>
          {/* REDIRECT TO MODAL PAGE */}
          <ArrowButton name="Add" onPress={() => shiftToModalComponent()} />
        </View>
      </View>
      <Notes
        visible={visible}
        setVisible={setVisible}
        onSubmit={(title, desc) => displayNoteInDashboard(title, desc)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  heroTitle: {
    color: "white",
    marginTop: 10,
  },
  headTitle: {
    fontSize: 25,
    color: "white",
    padding: 5,
    marginLeft: 10,
    fontWeight: "200",
  },
  hero: {
    marginTop: 20,
    backgroundColor: "#ff4d4d",
    padding: 15,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    width: Dimensions.get("window").width - 50,
    alignItems: "flex-end",
  },
  collection: {
    Width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
    alignItems: "center",
    justifyContent: "center",
  },
  textfield: {
    margin: 100,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  mapping: {
    padding: 1,
    height: Dimensions.get("window").height - 170,
    width: Dimensions.get("window").width - 40,
  },
});
