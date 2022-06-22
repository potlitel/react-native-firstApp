import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

const App = () => {
  const [selectedImage, setselectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    //console.info(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    setselectedImage = { localuri: pickerResult.uri };
  };

  let openShareDialog = async () => {
    if((! await Sharing.isAvailableAsync())){
      alert("Sharing is not available on your platform");
      return;
    }

    await Sharing.shareAsync(selectedImage.localuri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an Image!!!</Text>

      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={selectedImage !== null ? selectedImage.localuri : logo}
          style={styles.image}
        />
      </TouchableOpacity>

      {
        selectedImage ? (<TouchableOpacity
        style={styles.button}
        onPress={openShareDialog}
      >
        <Text style={styles.buttonText}>Share this image</Text>
      </TouchableOpacity>) : <View/>
      }
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
  image: { height: 200, width: 200, borderRadius: 100, resizeMode: "contain" },
  button: {
    backgroundColor: "deepskyblue",
    padding: 7,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 20 },
});

export default App;
