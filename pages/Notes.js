import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { Modal } from "react-native";
import ArrowButton from "../component/Button/ArrowButton";

export default Notes = ({ visible, setVisible, onSubmit, isEdit, item }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleTitle = (text) => setTitle(text);
  const handleNote = (text) => setNote(text);

  useEffect(() => {
    if (isEdit) {
      setTitle(item.title);
      setNote(item.desc);
    }
  }, [isEdit]);

  const handleBack = () => {
    if (isEdit) {
      onSubmit(title, note, Date.now());
    } else {
      if (title == "" && note == "") {
        console.log("Null");
      } else {
        onSubmit(title, note);
      }
    }
    if (!isEdit) {
      setTitle("");
      setNote("");
    }
    setVisible(false);
  };

  return (
    <Modal visible={visible} style={styles.modal}>
      <View style={styles.backBtn}>
        <ArrowButton name="Back" onPress={() => handleBack()} />
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Title"
          value={title}
          style={styles.title}
          onChangeText={(text) => handleTitle(text)}
        />
        <TextInput
          placeholder="Note"
          value={note}
          multiline
          style={styles.note}
          onChangeText={(text) => handleNote(text)}
        />
      </View>
    </Modal>
  );
};
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    zIndex: -1,
    paddingHorizontal: 30,
  },
  headTop: {
    width: Dimensions.get("window").width,
    height: 50,
    flexDirection: "row",
    alignItems: "space-start",
    justifyContent: "space-start",
  },
  backBtn: {
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    height: 80,
    width: width - 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "white",
  },
});
