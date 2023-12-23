import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default ArrowButton = ({ name, w, onPress }) => {
  return (
    <TouchableOpacity style={styles.touchButton} onPress={onPress}>
      <Text style={styles.buttonName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchButton: {
    backgroundColor: "#ff4d4d",
    height: 40,
    width: 60,
    paddingLeft: 15,
    paddingTop: 8,
    borderRadius: 10,
  },
  buttonName: {
    color: "white",
    fontWeight: "300",
  },
});
