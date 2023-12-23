import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Alert, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useNote } from "./Contexthook";
import Notes from "../pages/Notes";

export default NoteDetail = (props) => {
  const { setNote, Note } = useNote();
  // const { item } = props.route.params;
  const [item, setItem] = useState(props.route.params.item);
  const { asyncStoreCall } = useNote();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let note = [];
    if (result !== null) note = JSON.parse(result);
    const newNote = note.filter((n) => n.id !== item.id);
    await AsyncStorage.setItem("notes", JSON.stringify(newNote));
    asyncStoreCall();
    props.navigation.goBack();
  };
  const displayDeleteAlert = () =>
    Alert.alert("Are You Sure?", "This will delete your Note permanently", [
      {
        text: "Delete",
        onPress: () => deleteNote(),
      },
      {
        text: "No thanks",
      },
    ]);

  const editContent = () => {
    setShowModal(true);
    setIsEdit(true);
  };
  const handleUpdate = async (title, desc, date) => {
    console.log(title, desc, date);
    let result = await AsyncStorage.getItem("notes");
    let data = [];
    if (result !== null) data = JSON.parse(result);

    const newNote = data.filter((n) => {
      if (n.id === item.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = date;
      }
      setItem(n);
      return n;
    });
    console.log("ChangedItem", newNote);
    setNote(newNote);
    await AsyncStorage.setItem("notes", JSON.stringify(newNote));
  };
  return (
    <View style={styles.container}>
      <Text>Time: {item.time}</Text>
      <Text>Title: {item.title}</Text>
      <Text>Description: {item.desc}</Text>
      <View style={styles.button}>
        <ArrowButton name="Delete" onPress={() => displayDeleteAlert()} />
        <ArrowButton name="Edit" onPress={() => editContent()} />
      </View>
      <Notes
        visible={showModal}
        setVisible={setShowModal}
        isEdit={isEdit}
        item={item}
        onSubmit={(title, desc, date) => handleUpdate(title, desc, date)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 50,
    margin: 10,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
});
