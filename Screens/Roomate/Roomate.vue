<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header class="header-wrapper">
      <view class="horizontal-flex">
        <view class="header-text">
          <text>Find Roommates</text>
        </view>
      </view>
    </nb-header>
    <scroll-view>
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
          ></CardComponent>
        </view>
      </view>
    </scroll-view>
  </nb-container>
</template>

<script>
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CardComponent from "./RoomateCard";
import { getUsers } from "../../api/roommatesApi.js";
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
      cardItemsArr: [
        {
          realName: "Maddie",
          image:
            "https://firebasestorage.googleapis.com/v0/b/dormy-94adf.appspot.com/o/roommate%2Fman.jpg?alt=media&token=919f832c-bfff-4eaa-a246-edfbe3867586",
          bio: "Clean, Easy going, Virgo Looking to share 2 bd Apartment...",
        },
        {
          realName: "Sarah",
          image:
            "https://firebasestorage.googleapis.com/v0/b/dormy-94adf.appspot.com/o/roommate%2Fman.jpg?alt=media&token=919f832c-bfff-4eaa-a246-edfbe3867586",
          bio: "Hey everyone, looking forward to some great ride shares!",
        },
        {
          realName: "Emiliy",
          image:
            "https://firebasestorage.googleapis.com/v0/b/dormy-94adf.appspot.com/o/roommate%2Fman.jpg?alt=media&token=919f832c-bfff-4eaa-a246-edfbe3867586",
          bio: "22 year-old looking for roommates in a new city.",
        },
      ],
      roommateCardPairs: [],
    };
  },
  created() {
    this.fetchUsers();
    this.createPairsForDisplay();
  },
  components: {
    CardComponent,
  },
  methods: {
    async fetchUsers() {
      let res = await getUsers();

      this.users = res;
    },
    // Take the array of roommate cards and turn it into an array of pairs of cards
    createPairsForDisplay() {
      var numCards = this.cardItemsArr.length;
      for (var i = 0; i < numCards; i++) {
        if (i + 1 < numCards) {
          this.roommateCardPairs.push([
            this.cardItemsArr[i],
            this.cardItemsArr[++i],
          ]);
        } else {
          this.roommateCardPairs.push([this.cardItemsArr[i], this.emptyCard]);
        }
      }
      return this.roommateCardPairs;
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
</style>
