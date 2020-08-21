<template>
  <TouchableOpacity :disabled="item.isEmpty" :on-press="() => goToRoommate()">
    <nb-card class="card">
      <nb-cardItem cardBody>
        <view>
          <image
            :style="{
              height: 180,
              width: 180,
              flex: 1,
              alignItems: 'center'
           }"
            :source="{uri: item.image}"
          />

          <!-- Name, TODO: Add the compatibility score and potentially the age-->
          <view class="profile-info">
            <text class="profile-info-txt">{{item.realName}}</text>
          </view>

          <!-- Budget for the room. TODO: Don't hardcode, pull from a user account-->
          <view class="profile-info">
            <text class="profile-ppm">${{item.budget}}</text>
            <text :style="{color: '#808080', flex: 1}">/ Mo</text>
          </view>

          <!-- Roommate location. TODO: Don't hardcode, pull from a user account -->
          <view class="address-preview-wrapper">
            <image
              :style="{margin: 5, marginLeft: 10, height: 20, width: 20}"
              :source="require('../../assets/iconsv2/location-icon.png')"
            />
            <text :style="{flex: 1, alignText: 'center'}">{{item.preferredLocation}}</text>
          </view>
        </view>
      </nb-cardItem>
    </nb-card>
  </TouchableOpacity>
</template>

<script>
import React from "react";
import { View, ImageBackground } from "react-native";
export default {
  mounted() {
    this.show();
  },
  props: {
    item: {
      type: Object,
    },
    navigation: {
      type: Object,
    },
  },
  methods: {
    show() {
      console.log("card doc: ", this.item);
    },
    goToRoommate() {
      this.navigation.navigate("RoommateCardExpanded");
    },
  },
  components: {},
};
</script>

<style>
.profile-info {
  flex-direction: row;
}

.profile-info-txt {
  flex: 2;
  margin: 10;
  margin-left: 13;
  font-size: 20;
  font-weight: bold;
}

.profile-ppm {
  margin-left: 13;
  margin-bottom: 10;
  margin-right: 10;
  font-size: 15;
  font-weight: bold;
  color: #43464b;
}

.address-preview-wrapper {
  flex-direction: row;
  flex: 1;
  background-color: #eee;
  align-items: center;
}
</style>
