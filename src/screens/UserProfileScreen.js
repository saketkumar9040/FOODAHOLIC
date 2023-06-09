import react from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { colors } from "../globals/style";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { firebase } from "../firebase/FirebaseConfig";

import * as ImagePicker from "expo-image-picker";

import { getApps, initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9PAsVzy6WAUBE_EiO5HCMBdBa8w9QMW8",
  authDomain: "foodaholic-fd324.firebaseapp.com",
  projectId: "foodaholic-fd324",
  storageBucket: "foodaholic-fd324.appspot.com",
  messagingSenderId: "104513043816",
  appId: "1:104513043816:web:142d173b125fb356516add",
  measurementId: "G-PQ6FYZ2DPC",
};
// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const storage = getStorage(initializeApp(firebaseConfig));
const db = getFirestore(initializeApp(firebaseConfig));

const UserProfileScreen = ({ navigation }) => {
  NavigationBar.setBackgroundColorAsync("#ff4242");

  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [nameEdit, setNameEdit] = useState(false);
  const [addressEdit, setAddressEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserLoggedUid(user.uid);
        } else {
          setUserLoggedUid(null);
        }
      });
    };
    checkLogin();
  }, []);

  // console.log(userLoggedUid);

  const getUserData = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userLoggedUid);
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setUserData(doc.data());
      });
    } else {
      console.log("no User Profile found");
    }
  };
  useEffect(() => {
    getUserData();
  }, [userLoggedUid]);

  // console.log(userData);

  const handleName = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userLoggedUid);
    const doc = await docRef.get();
    if (!doc.empty) {
      if (name !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            name: name,
          });
          // console.log(doc.data())
        });
      }
    }
    alert("Name updated successfully");
    getUserData();
    setNameEdit(false);
  };

  const handleAddress = async () => {
    let docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userLoggedUid);
    let doc = await docRef.get();
    if (!doc.empty) {
      if (name !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            name: name,
          });
        });
      }
    }
    alert("Address updated successfully");
    getUserData();
    setAddressEdit(false);
  };

  useEffect(() => {
    if (image !== null) {
      uploadImageToStorage();
      setImage(null);
    }
  }, [image]);

  const handlePic = async () => {
    //  Launching  mobile  image  gallary  =========================>

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    // console.log(result);

    if (result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToStorage = async () => {
    //  CONVERT IMAGE TO BLOB  ===================================>

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    //  SET METADATA OF IMAGE   =====================================>

    const metadata = {
      contentType: "image/jpeg",
    };

    //  UPLOAD IMAGE ON FIREBASE STORAGE  =============================>

    const storageRef = ref(storage, "UserAvatar/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          //   SAVING TO URL TO USER - DATABSE ============================>

          const docRef = await firebase
            .firestore()
            .collection("UserData")
            .where("uid", "==", userLoggedUid);
          const doc = await docRef.get();

          if (!doc.empty) {
            // using doc.exists was not giving to output
            doc.forEach(async (doc) => {
              await doc.ref.update({
                avatar: downloadURL,
              });
            });
          }
          await getUserData();
          alert("Image Update Successfully");
        });
      }
    );
  };

  const handlePassword = async () => {
    const reAuthenticate = (oldPassword) => {
      const user = firebase.auth().currentUser;
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      return user.reauthenticateWithCredential(credentials);
    };

    let docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userLoggedUid);
    let doc = await docRef.get();

    reAuthenticate(oldPassword)
      .then(async () => {
        const user = firebase.auth().currentUser;
        await user
          .updatePassword(newPassword)
          .then(() => {
            if (!doc.empty) {
              doc.forEach(async (doc) => {
                await doc.ref.update({
                  password: newPassword,
                });
              });
              alert("Password updated successfully");
              setOldPassword("");
              setNewPassword("");
            }
          })
          .catch((error) => {
            alert("password updation failed");
            console.log(error);
          });
      })
      .catch((error) => {
        alert("Wrong Password");
        console.log(error);
        return;
      });
    // alert("Password changed successfully");
    setPasswordEdit(false);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("Logout successfully");
        navigation.navigate("loginScreen");
      })
      .catch((error) => {
        alert("system Error");
        console.log(error);
      });
  };

  // console.log(image)
  return (
    <>
      {passwordEdit === false ? (
        <View style={styles.userProfileContainer}>
          <TouchableOpacity
            style={styles.navContainer}
            onPress={() => navigation.navigate("homeScreen")}
          >
            <View style={styles.navBtn}>
              <FontAwesome name="arrow-left" size={28} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <View style={styles.avatarContainer}>
              {image !== null ? (
                <Image style={styles.image} source={{ uri: image }} />
              ) : (
                <Image
                  style={styles.image}
                  source={userData?.avatar ?{uri:userData?.avatar}:require("../../assets/avatar.jpg")}
                />
              )}
            </View>
            <TouchableOpacity onPress={() => handlePic()}>
              <Text style={styles.changeAvatar}>Change Pic</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              backgroundColor: colors.bgColor,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {nameEdit === false ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>{userData?.name}</Text>
                  <TouchableOpacity>
                    <Feather
                      name="edit"
                      size={24}
                      color="black"
                      onPress={() => {
                        setNameEdit(true);
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={userData?.name}
                    onChangeText={setName}
                    value={name}
                  />
                  <TouchableOpacity>
                    <Feather
                      name="save"
                      size={24}
                      color="red"
                      onPress={() => {
                        handleName();
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{userData?.email}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{userData?.phone}</Text>
              </View>
              {addressEdit === false ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>
                    {userData?.address
                      ? userData?.address
                      : "enter your address"}
                  </Text>
                  <TouchableOpacity>
                    <Feather
                      name="edit"
                      size={24}
                      color="black"
                      onPress={() => setAddressEdit(true)}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={userData?.address}
                    onChangeText={setAddress}
                    value={address}
                  />
                  <TouchableOpacity>
                    <Feather
                      name="save"
                      size={24}
                      color="red"
                      onPress={() => {
                        handleAddress();
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={{ backgroundColor: colors.bgColor, elevation: 10 }}
              onPress={() => setPasswordEdit(true)}
            >
              <Text style={styles.button}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: colors.bgColor, elevation: 10 }}
              onPress={() => handleLogout()}
            >
              <Text style={styles.button}>Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
          <StatusBar style="dark" />
        </View>
      ) : (
        <View style={styles.userProfileContainer}>
          <TouchableOpacity
            style={styles.navContainer}
            onPress={() => setPasswordEdit(false)}
          >
            <View style={styles.navBtn}>
              <FontAwesome name="arrow-left" size={28} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/avatar.jpg")}
              />
            </View>
          </View>
          <ScrollView
            style={{
              backgroundColor: colors.bgColor,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Old Password"
                  onChangeText={setOldPassword}
                  value={oldPassword}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter New Password"
                  onChangeText={setNewPassword}
                  value={newPassword}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: colors.bgColor, elevation: 10 }}
              onPress={() => handlePassword()}
            >
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
          <StatusBar style="dark" />
        </View>
      )}
    </>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    backgroundColor: colors.color1,
    alignItems: "center",
  },
  navContainer: {
    flexDirection: "row",
    width: "100%",
    height: "8%",
    marginTop: 45,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "28%",
    backgroundColor: colors.color1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: "50%",
    height: "80%",
    borderWidth: 5,
    borderRadius: 40,
    // marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  changeAvatar: {
    margin: 10,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: colors.color1,
    elevation: 10,
    borderRadius: 40,
    padding: 5,
    paddingHorizontal: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 15,
    marginVertical: 5,
    backgroundColor: colors.color1,
    borderRadius: 14,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 20,
    // marginLeft: 10,
    fontStyle: "italic",
    // fontWeight: 500,
    width: "80%",
  },
  navBtn: {
    backgroundColor: colors.bgColor,
    width: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  button: {
    fontSize: 17,
    alignSelf: "center",
    textAlign: "center",
    color: colors.text1,
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: 600,
    backgroundColor: colors.color1,
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 26,
  },
});
