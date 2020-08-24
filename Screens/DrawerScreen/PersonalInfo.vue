<template>
  <nb-container class="container" :style="{ backgroundColor: '#fff' }">
    <nb-content class="screen-wrapper">

      <text class="edit-txt">Edit personal information</text>
      <view class="personal-information">
        <view class="data">

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">First name</text>
              <text-input
                class="input-field"
                v-model="firstname">{{userData.firstName}}
              </text-input>
            </view>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Last name</text>
              <text-input
                class="input-field"
                v-model="lastname">{{userData.lastName}}
              </text-input>
            </view>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Gender</text>
              <text-input
                class="input-field"
                v-model="gender">Pull from DB
              </text-input>
            </view>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Mobile</text>
              <text-input
                class="input-field"
                v-model="mobile">6099152488
              </text-input>
            </view>
          </view>

        </view>
      </view>

      <text class="security-txt">Security</text>
      <view class="personal-information">
        <view class="data">

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Email</text>
              <text-input
                class="input-field"
                v-model="email">{{userData.email}}
              </text-input>
            </view>
          </view>

          <view class="data-field">
            <view class="horizontal-flex">
              <text class="input-heading">Password</text>
              <text-input
                class="input-field"
                v-model="password">*****
              </text-input>
            </view>
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
      firstname: "",
      lastname: "",
      gender: "",
      mobile: "",
      email: "",
      password: ""
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

.edit-txt {
  margin-top: 30;
  margin: 10%;
  font-size: 20;
  font-weight: 600;
}

.security-txt {
  margin-top: 10;
  margin: 10%;
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
  margin-bottom: 40;
  border-bottom-width: 1;
  border-color: rgb(201, 201, 201);
}

.input-heading {
  color: #f74c01;
  font-size: 16;
}

.input-field {
  font-size: 16;
  text-align: right;
  margin-bottom: 25;
  width: 60%;
}

.currentVal {
  color: black;
  font-size: 16;
  margin-left: 5;
}

.save-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin-top: 20;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60;
  border-width: 1;
  border-color: #e15e5e;
  background-color: transparent;
}

.save-txt {
  color: #e15e5e;
}
</style>