<template>
  <nb-container class="container" :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-left>
        <touchable-opacity :on-press="navToMenu">
          <image class="menu-icon" :source="require('../../assets/iconsv2/arrow-left.png')" />
        </touchable-opacity>
      </nb-left>
      <!-- <nb-body>
        <nb-title>Personal Information</nb-title>
      </nb-body>
      <nb-right /> -->
    </nb-header>
    <nb-content class="screen-wrapper">
      <text class="edit-info-txt">Edit personal info</text>
      <view class="personal-information">
        <view class="data">

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">First name</text>
            </view>
            <text-input
              class="input-field"
              :secureTextEntry="false"
              v-model="username">{{userData.realName}}
            </text-input>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Last name</text>
            </view>
            <text-input
              class="input-field"
              :secureTextEntry="false">{{userData.realName}}
            </text-input>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Gender</text>
            </view>
            <text-input
              class="input-field"
              :secureTextEntry="false">Call to gender from DB
            </text-input>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Email</text>
            </view>
            <text-input
              class="input-field"
              :secureTextEntry="false">weed420@brown.edu
            </text-input>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Phone number</text>
            </view>
            <text-input
              class="input-field"
              :secureTextEntry="false">911
            </text-input>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Password</text>
            </view>
            <text-input
              class="input-field"
              :secureTextEntry="false"
              v-model="password">*****
            </text-input>
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
    navToMenu() {
      this.navigation.navigate('Home');
    },
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

.edit-info-txt {
  margin-top: 30;
  margin: 35;
  font-size: 20;
  font-weight: 600;
}

.personal-information {
  display: flex;
  justify-content: center;
  align-items: center;
}

.data {
  width: 80%;
}

.data-field {
  margin-bottom: 20;
  border-bottom-width: 1;
  border-color: rgb(204, 204, 204);
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
  width: 90%;
  margin-top: 5;
  margin-bottom: 25;
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