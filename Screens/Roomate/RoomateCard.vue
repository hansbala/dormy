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

          <!-- Name, TODO: Add the age-->
          <view v-if="!item.isEmpty" class="profile-info" :style="{alignItems: 'center'}">
            <text class="profile-info-txt">{{item.realName}}</text>
            <text class="compatibility">{{cosineSim(item.lifestyleHabits, lifestyleHabits)}}</text>
          </view>

          <!-- Budget  -->
          <view class="profile-info">
            <text class="profile-ppm">${{item.budget}}</text>
            <text :style="{color: '#808080', flex: 1}">/ Mo</text>
          </view>

          <!-- Location  -->
          <view class="address-preview-wrapper">
            <image
              :style="{margin: 5, marginLeft: 10, height: 20, width: 20}"
              :source="require('../../assets/iconsv2/location-icon.png')"
            />
            <text :style="{flex: 1}">{{item.preferredLocation}}</text>
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
  props: {
    item: {
      type: Object,
    },
    // This is the array of habits passed in from the roommate screen that is
    // Used with item.lifestyleHabits to compute a compatibility score
    lifestyleHabits: {
      type: Array,
    },
    navigation: {
      type: Object,
    },
  },
  methods: {
    goToRoommate() {
      this.navigation.navigate("RoommateCardExpanded");
    },

    // Calculates the similarity score using cosine similarity
    cosineSim(A, B) {
      var dotproduct = 0;
      var mA = 0;
      var mB = 0;
      for (let i = 0; i < A.length; i++) {
        // here you missed the i++
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
      }
      mA = Math.sqrt(mA);
      mB = Math.sqrt(mB);
      var similarity = dotproduct / (mA * mB);
      return Math.round(100*similarity);
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

.compatibility {
  flex: 2;
  margin: 10;
  font-size: 15;
  font-weight: bold;
  text-align: right;
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
