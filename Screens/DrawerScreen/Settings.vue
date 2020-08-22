<template>
  <nb-container class="container" :style="{ backgroundColor: '#fff' }">
    <nb-content class="screen-wrapper">
      <view class="logo-wrapper">
        <text class="title-txt">Account Settings</text>

        <view class="data">
          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Username:</text>
              <text class="currentVal">{{userData.realName}}</text>
            </view>

            <text-input class="input-field" placeholder="Enter New Username" v-model="username"></text-input>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Password:</text>
              <text class="currentVal">******</text>
            </view>
            <text-input
              class="input-field"
              placeholder="Enter New Password"
              :secureTextEntry="true"
              v-model="password"
            ></text-input>
          </view>

          <view class="data-field">
            <text class="input-heading">Bio:</text>
            <text class="currentVal">{{userData.bio}}</text>
            <nb-textarea
              placeholder="This would be a prop value"
              :rowSpan="5"
              bordered
              v-model="bio"
            />
          </view>

        </view>
        <nb-button :on-press="updateChanges" class="save-btn">
          <nb-text class="save-txt">Save</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>


<script>
import { DrawerActions } from "react-navigation-drawer";
import { firebaseAuth } from "../../environment/config.js";
import { getUserData } from "../../api/settingsApi.js";
import { updateUserData } from "../../api/settingsApi.js";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      userData: Object,
      username: "",
      password: "",
      bio: "",
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      let res = await getUserData(
        firebaseAuth.currentUser.uid,
        this.postFailed
      );
      this.userData = res;
      console.log(this.userData);
    },
    postingFailed() {
      Alert.alert("Failed to fetch contacts", "Error: " + errorMessage, {
        cancelable: false,
      });
    },
    updateChanges() {
      if (this.username != "") {
      } else {
        this.username = this.userData.realName;
      }
      updateUserData(firebaseAuth.currentUser.uid, this.username);
    },
  },
};
</script>

<style>
.container {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.horizontal-flex {
  display: flex;
  flex-direction: row;
}

.menu-icon {
  width: 30;
  height: 30;
  padding-left: 10;
  padding-right: 10;
}

.title-txt {
  margin-top: 30;
  margin: 35;
  font-size: 20;
  font-weight: 600;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100;
  height: 100;
}

.data {
  width: 80%;
  margin-top: 20;
}

.data-field {
  margin-bottom: 20;
}

.input-heading {
  color: #f74c01;
  margin-bottom: 5;
  font-size: 16;
}

.currentVal {
  color: black;
  font-size: 16;
  margin-left: 5;
}

.input-field {
  border-width: 1;
  border-radius: 3;
  border-color: gray;
  width: 90%;
  padding: 10;
}

.save-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin-top: 20;
  margin-left: auto;
  margin-right: auto;
  border-width: 1;
  border-color: #e15e5e;
  background-color: transparent;
}

.save-txt {
  color: #e15e5e;
}
</style>