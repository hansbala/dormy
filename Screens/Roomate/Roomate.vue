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
        <!-- TODO: Helper function to loop through users instead of hardcoding -->
        <view :style="{display: 'flex', flexDirection: 'row', justifyContent: 'center'}">
        <CardComponent :navigation="this.props.navigation" :item="cardItemsArr[0]"></CardComponent>
        <CardComponent :navigation="this.props.navigation" :item="cardItemsArr[0]"></CardComponent>
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
      isLoopingRequired: false,
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
          image: "https://firebasestorage.googleapis.com/v0/b/dormy-94adf.appspot.com/o/roommate%2Fman.jpg?alt=media&token=919f832c-bfff-4eaa-a246-edfbe3867586",
          bio: "Hey everyone, looking forward to some great ride shares!",
        },
        {
          realName: "Emiliy",
          image: "https://firebasestorage.googleapis.com/v0/b/dormy-94adf.appspot.com/o/roommate%2Fman.jpg?alt=media&token=919f832c-bfff-4eaa-a246-edfbe3867586",
          bio: "22 year-old looking for roommates in a new city.",
        },
      ],
    };
  },
  created() {
    this.fetchUsers();
  },
  components: {
    CardComponent,
  },
  methods: {
    handleCardEmpty() {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/iconsv2/logo.png")}
          />
          <Text style={styles.txt}> Sorry No More Users to View </Text>
        </View>
      );
    },
    handleCardRendering(item) {
      return <CardComponent item={item} />;
    },
    swipeLeft() {
      this.$refs._deckSwiper._root.swipeLeft();
    },
    swipeRight() {
      this.$refs._deckSwiper._root.swipeRight();
    },
    async fetchUsers() {
      let res = await getUsers();

      this.users = res;
      console.log("local array", this.cardItemsArr);
      console.log("the users stuff", this.users);
    },
    // postingFailed() {
    //     Alert.alert(
    //         "Failed to fetch users",
    //         "Error: " + errorMessage,
    //         { cancelable: false }
    //     );
    // }
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
</style>
