import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import logo from "./assets/react-native.png";
import * as ImagePicker from "expo-image-picker"
const App = () => {

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(permissionResult.granted === false){
      alert('Permission to access camera is required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.info(pickerResult);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!!!</Text>
      <Image source={logo} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Hello!!!")}
      >
        <Text style={styles.buttonText}>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 30, color: "#fff" },
  image: { height: 200, width: 200, borderRadius: 100 },
  button: { backgroundColor: "deepskyblue", padding: 7, marginTop: 10 , borderRadius:10},
  buttonText:{color:'#fff', fontSize:20}
});

export default App;
