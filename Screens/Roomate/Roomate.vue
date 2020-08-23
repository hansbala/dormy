<template>
  <!-- Add a loading screen to prevent seeing both the opt in page and the cards -->
  <view class="loading-wrapper" v-if="isLoading">
    <activity-indicator size="large" color="#f74c01" />
    <text>Loading roommates, Please wait..</text>
  </view>
  <!-- Only display the cards if the user has opted in (changing roommateStatus) -->
  <nb-container v-else-if="userData.roommateStatus">
    <nb-header class="header-wrapper">
      <view class="horizontal-flex">
        <view class="header-text">
          <text>Find Roommates</text>
        </view>
      </view>
    </nb-header>
    <scroll-view>
      <RefreshControl
        :refreshing="refreshing"
        :onRefresh="_onRefresh"
        :title="'Reloading roommates'"
      />
      <!-- Loop through the list of pairs of roommate cards -->
      <view
        :style="{display: 'flex', flexDirection: 'row', justifyContent: 'center'}"
        v-for="(cardPair, index) in roommateCardPairs"
        :key="index"
      >
        <!-- Loop through each pair, changing opacity to 0 if it's an empty card -->
        <view v-for="card in cardPair" :key="card.realName">
          <!-- TODO: use a different value for the key, potentially a user ID -->
          <CardComponent
            :class="[card.isEmpty ? 'emptyCard' : 'other']"
            :navigation="this.props.navigation"
            :item="card"
            :style="{margin: 7}"
          ></CardComponent>
        </view>
      </view>
    </scroll-view>
  </nb-container>
  <!-- TODO: Create the opt-in display and page -->
  <nb-container v-else>
    <text :style="{flex: 1, fontSize: 70}">TODO: Create the opt-in page</text>
  </nb-container>
</template>

<script>
import React from "react";
import { View, Text, Image, StyleSheet, RefreshControl } from "react-native";
import CardComponent from "./RoomateCard";
import { getUserData } from "../../api/settingsApi.js";
import { getUsers } from "../../api/roommatesApi.js";
import { firebaseAuth } from "../../environment/config.js";
import { Alert } from "react-native";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      users: [],
      alignment: 0,
      emptyCard: {
        realName: "", // Used as the key in the html v-for
        isEmpty: true,
      },
      // TODO: Pull these from firebase instead of hardcoding here
      cardItemsArr: [],
      roommateCardPairs: [],
      refreshing: false,
      userData: Object,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchUsers();
    this.fetchUserData();
  },
  components: {
    CardComponent,
  },
  methods: {
    // Fetches the current user's data and stores it in the userData field
    // Used to determine if the user has opted in to the roommate section
    async fetchUserData() {
      let res = await getUserData(
        firebaseAuth.currentUser.uid,
        this.retrievingUserFailed
      );
      this.userData = res;
      this.isLoading = false;
      console.log("Logging your user data: ", this.userData);
    },
    async fetchUsers() {
      let res = await getUsers();
      this.cardItemsArr = res;
      this.createPairsForDisplay();
    },
    // Take the array of roommate cards and turn it into an array of pairs of cards
    createPairsForDisplay() {
      var numCards = this.cardItemsArr.length;
      let roommatePairs = [];
      for (var i = 0; i < numCards; i++) {
        if (i + 1 < numCards) {
          roommatePairs.push([this.cardItemsArr[i], this.cardItemsArr[++i]]);
        } else {
          roommatePairs.push([this.cardItemsArr[i], this.emptyCard]);
        }
      }
      this.roommateCardPairs = roommatePairs;
    },
    _onRefresh() {
      this.refreshing = true;
      this.fetchUsers();
      this.refreshing = false;
    },
    // failureCallback() passed in when trying to get the current user's data
    retrievingUserFailed() {
      Alert.alert("Error getting user information", "Error: " + errorMessage, {
        cancelable: false,
      });
    },
  },
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
</script>

<style>
.container {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/*************************************** 

   Header Styling

****************************************/
.header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.header-text {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.horizontal-flex {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* Opacity should be 0 for empty cards */
.emptyCard {
  opacity: 0;
}

/* Loading indicator styles */
.loading-wrapper {
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
