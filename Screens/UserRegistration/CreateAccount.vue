<!-- TODO: -->
<!-- - Autocorrect and autocapitalize on text entry -->
<!-- - return enter on keyboard goes to next entry -->
<template>
  <view class="container">
    <image class="dormy-icon" :source="require('../../assets/iconsv2/logo.png')" />
    <view class="user-entry-wrapper">
      <text class="input-classifier">Name</text>
      <text-input class="text-entry" :autoCorrect="false" v-model="realName" />
      <text class="input-classifier">Email</text>
      <text-input class="text-entry" :autoCorrect="false" :autoCapitalize="'none'" v-model="email" />
      <text class="input-classifier">Password</text>
      <text-input
        class="text-entry"
        :autoCorrect="false"
        :secureTextEntry="true"
        v-model="password"
      />
    </view>

    <touchable-opacity :on-press="createAccountHandler" class="signup-btn">
      <text class="signup-btn-text">Create Account</text>
    </touchable-opacity>

    <touchable-opacity :on-press="goSignIn" class="signin-link">
      <text class="signin-link-text">Already have an account?</text>
    </touchable-opacity>
  </view>
</template>

<script>
import { Alert } from "react-native";
import { firebaseAuth } from "../../environment/config.js";
import {
  createUserAccount,
  verifyUserEmail,
  addUserToCollection,
} from "../../api/userAuth.js";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      realName: "",
    };
  },
  methods: {
    createAccountFailure(error = "Failed to create your account with dormy!") {
      Alert.alert("Error", "" + error, { cancelable: false });
    },
    createAccountHandler() {
      if (this.realName === "") {
        this.createAccountFailure("Enter a valid name");
        return;
      }
      // Send over to the api to create the account
      createUserAccount(
        this.email,
        this.password,
        this.verifyEmail,
        this.createAccountFailure
      );
    },
    verifyEmail() {
      verifyUserEmail(this.addUserToFirestore, this.createAccountFailure);
    },
    addUserToFirestore() {
      addUserToCollection(
        this.email,
        this.realName,
        this.goSignIn,
        this.createAccountFailure
      );
    },
    goSignIn(flag = "empty") {
      if (flag === "empty") {
        this.navigation.navigate("Login");
      } else {
        Alert.alert(
          "Verification needed",
          "An email has been sent. Click on the link provided to verify your email!",
          { cancelable: false }
        );
        this.navigation.navigate("Login");
      }
    },
  },
};
</script>

<style>
.container {
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  margin: 50;
}
.dormy-icon {
  width: 120;
  height: 120;
}
.user-entry-wrapper {
}
.text-entry {
  width: 300;
  height: 50;
  border-color: #a9a9a9;
  border-width: 1;
  border-radius: 10;
  font-size: 14;
  padding: 5;
}
.input-classifier {
  color: #696969;
  font-size: 16;
  font-weight: bold;
  margin-top: 10;
  margin-bottom: 10;
}
.signup-btn {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 10;
  width: 100%;
  padding: 20;
}
.signup-btn-text {
  font-size: 20;
  color: #fff;
}
.signin-link {
}
.signin-link-text {
  font-size: 16;
  color: red;
}
</style>
