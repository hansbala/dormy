<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header class="header-wrapper">
      <view class="horizontal-flex">
        <view class="header-text">
          <text>Find Roomates</text>
        </view>
      </view>
    </nb-header>
    <scroll-view :style="{ flex: 1, padding: 12 }">
      <view v-for="todo in cardItemsArr" :key="todo.realName" >
        <CardComponent :item="todo"></CardComponent>
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
      cardItemsArr: [
        {
          realName: "Maddie",
          image: "../../assets/Images/rmate-woman1.jpeg",
          bio: "Clean, Easy going, Virgo Looking to share 2 bd Apartment...",
        },
        {
          realName: "Sarah",
          image: "../../assets/Images/rmate-woman1.jpeg",
          bio: "Hey everyone, looking forward to some great ride shares!",
        },
        {
          realName: "Emiliy",
          image: "../../assets/Images/rmate-woman1.jpeg",
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
