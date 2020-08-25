<template>
  <view class="container">
    <nb-content>
      <text class="section-header">Background Information</text>
      <view class="section">
        <text class="section-descriptor">Bio</text>
        <text-input
          :placeholder="'Tell us about yourself! (Interests, career, hobbies)'"
          class="description-entry-box"
        />
      </view>
      <view class="section">
        <text class="section-descriptor">What's your expected budget?</text>
        <view class="slider-wrapper">
          <view class="text-wrapper">
            <text>
              <text class="monthly-asking-price">${{ budget }}</text>/ month
            </text>
          </view>
          <slider
            class="slider-actual"
            :value="1000"
            :minimumValue="100"
            :maximumValue="5000"
            :step="50"
            :onValueChange="budgetChanged"
            :minimumTrackTintColor="'#f74c01'"
            :maximumTrackTintColor="'#f74c01'"
            :thumbTintColor="'#ffffff'"
            :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
          />
        </view>
      </view>
      <!-- Space for user to enter preferred location -->
      <view class="section">
        <text class="section-descriptor">Location</text>
        <view class="location-picker">
          <image class="icon" :source="require('../../assets/iconsv2/roommateLocation.png')" />
          <text-input
            :placeholder="' Where are you looking? (Required)'"
            class="location-entry-box"
          />
        </view>
      </view>
      <!-- Move in date input box -->
      <view class="section">
        <text class="section-descriptor">Preferred Move in Date</text>
        <view class="location-picker">
          <image class="icon" :source="require('../../assets/iconsv2/cal.png')" />
          <text-input :placeholder="' Move in date (Required)'" class="location-entry-box" />
        </view>
      </view>
      <!-- Duration of stay input box -->
      <!-- TODO: Change the icon to a new clock icon -->
      <view class="section">
        <text class="section-descriptor">Duration of Stay</text>
        <view class="location-picker">
          <image class="icon" :source="require('../../assets/iconsv2/roommateLocation.png')" />
          <text-input :placeholder="' Months of stay (Required)'" class="location-entry-box" />
        </view>
      </view>

      <!-- Roommate lifestyle questions -->
      <text class="section-header">Lifestyle and Habits</text>
      <view class="section" :style="{marginTop: '5%'}">
        <text
          class="section-descriptor"
        >This will help us match you with the most compatible roommates!</text>
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Cleanliness</text>
          <text :style="{textAlign: 'right', flex: 1 }">{{cleanliness}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="cleanlinessChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">Messy</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Spotless</text>
        </view>
      </view>
    </nb-content>
  </view>
</template>

<script>
import { Slider } from "react-native-elements";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      budget: 1000,
      cleanliness: 1,
    };
  },
  methods: {
    budgetChanged(value) {
      this.budget = Math.ceil(value);
    },
    cleanlinessChanged(value) {
      this.cleanliness = Math.ceil(value);
    },
  },
  components: {
    Slider,
  },
};
</script>

<style>
/* Container Styles */
.container {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.section {
  margin: 40px;
  margin-bottom: 0px;
}
.section-descriptor {
  font-size: 14;
  margin-bottom: 20;
}

.description-entry-box {
  height: 50;
  border-color: #a9a9a9;
  border-width: 1;
  border-radius: 5;
  padding: 10;
}

.monthly-asking-price {
  font-weight: bold;
}

.lifestyle-description {
  font-size: 16;
}

.lifestyle-extremes {
  font-size: 12;
  flex: 1;
  color: rgb(133, 133, 133);
}

.slider-wrapper {
  border-color: #a9a9a9;
  border-width: 1;
  border-radius: 10;
  padding-left: 20;
  padding-right: 20;
  padding-top: 10;
  padding-bottom: 10;
  flex: 1;
  justify-content: center;
}
.slider-actual {
  flex: 1;
}

.text-wrapper {
  flex-direction: row;
  flex: 1;
  justify-content: center;
  padding-bottom: 10;
  border-bottom-color: #a9a9a9;
  border-bottom-width: 0.2;
}

.icon {
  width: 20px;
  height: 20px;
}

.location-picker {
  flex-direction: row;
  border-color: #a9a9a9;
  border-width: 1;
  padding: 10;
  border-radius: 5;
}

.questionnaire {
  flex-direction: row;
}

.section-header {
  margin-top: 7%;
  font-size: 20;
  font-weight: bold;
  text-align: center;
}
</style>