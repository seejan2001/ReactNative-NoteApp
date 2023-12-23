import { TouchableOpacity } from "react-native";
import { Text, StyleSheet } from "react-native";
export default Message = ({ title, desc, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={1} style={styles.subtitle}>
        {desc}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 150,
    height: 150,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "300",
  },
});
