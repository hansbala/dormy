<template>
  <view class="container">
    <nb-content>
      <text class="section-header">Background Information</text>
      <view class="section">
        <text class="section-descriptor">Bio</text>
        <nb-textarea
          :placeholder="'Tell us about yourself! Let others know about your hobbies, interests, and career!'"
          class="description-entry-box"
          v-model="roommateProfileData.bio"
        />
      </view>
      <view class="section">
        <text class="section-descriptor">What's your expected budget?</text>
        <view class="slider-wrapper">
          <view class="text-wrapper">
            <text>
              <text class="monthly-asking-price">${{ roommateProfileData.budget }}</text>/ month
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
            :placeholder="'Where are you looking? (Required)'"
            class="location-entry-box"
            v-model="roommateProfileData.location"
          />
        </view>
      </view>
      <!-- Move in date input box -->
      <view class="section">
        <text class="section-descriptor">Preferred Move in Date</text>
        <view class="location-picker">
          <image class="icon" :source="require('../../assets/iconsv2/cal.png')" />
          <text-input :placeholder="'Move in date (Required)'" class="location-entry-box" />
        </view>
      </view>
      <!-- Duration of stay input box -->
      <!-- TODO: Change the icon to a new clock icon -->
      <view class="section">
        <text class="section-descriptor">Duration of Stay</text>
        <view class="location-picker">
          <image class="icon" :source="require('../../assets/iconsv2/roommateLocation.png')" />
          <text-input :placeholder="'Months of stay (Required)'" class="location-entry-box" />
        </view>
      </view>

      <!-- Roommate lifestyle questions -->
      <text class="section-header" :style="{marginTop: '15%'}">Lifestyle and Habits</text>
      <view class="section" :style="{marginTop: '5%'}">
        <text
          class="section-descriptor"
        >This will help us match you with the most compatible roommates!</text>
        <!-- Cleanliness -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Cleanliness</text>
          <text class="lifestyle-score">{{cleanliness}}/10</text>
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
        <!-- Sleep Schedule  -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Bedtime</text>
          <text class="lifestyle-score">{{bedtime}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="bedtimeChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">Early</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Night Owl</text>
        </view>
        <!-- Tobacco Use Preference -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Tobacco</text>
          <text class="lifestyle-score">{{tobacco}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="tobaccoChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">Never</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Regularly</text>
        </view>
        <!-- Alcohol Level -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Drinking</text>
          <text class="lifestyle-score">{{alcohol}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="alcoholChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">Never</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Regularly</text>
        </view>
        <!-- Drug Use -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Drug Use</text>
          <text class="lifestyle-score">{{drugUse}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="drugUseChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">Never</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Regularly</text>
        </view>
        <!-- Interaction / Personality -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Personality</text>
          <text class="lifestyle-score">{{personality}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="personalityChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">Introvert</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Extrovert</text>
        </view>
        <!-- Eating Habits -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Meals</text>
          <text class="lifestyle-score">{{eatingHabits}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="eatingHabitsChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">At Home</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Take Out</text>
        </view>
        <!-- Work Habits -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Work Habits</text>
          <text class="lifestyle-score">{{workHabits}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="workHabitsChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">At home</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Out and About</text>
        </view>
        <!-- Guests -->
        <view class="questionnaire">
          <text class="lifestyle-description" :style="{textAlign: 'left', flex: 1}">Friends over?</text>
          <text class="lifestyle-score">{{guests}}/10</text>
        </view>
        <slider
          class="slider-actual"
          :value="1"
          :minimumValue="1"
          :maximumValue="10"
          :step="1"
          :onValueChange="guestsChanged"
          :minimumTrackTintColor="'#f74c01'"
          :maximumTrackTintColor="'#f74c01'"
          :thumbTintColor="'#ffffff'"
          :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
        />
        <view class="questionnaire" :style="{marginTop: -5}">
          <text class="lifestyle-extremes" :style="{textAlign: 'left'}">Rarely</text>
          <text class="lifestyle-extremes" :style="{textAlign: 'right'}">Regularly</text>
        </view>
      </view>
      <view class="post-btn-wrapper">
        <nb-button class="post-btn" :on-press="submitPressed">
          <nb-text>Complete Profile</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </view>
</template>

<script>
import { Slider } from "react-native-elements";
import { Alert } from "react-native";
import { firebaseAuth } from "../../environment/config.js";
import { addRoommateProfile } from "../../api/roommatesApi.js";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      // TODO: Implement the move in and duration of stay variables
      roommateProfileData: {
        bio: "",
        location: "",
        budget: 1000,
        // moveInDate: "",
        // durationOfStay: "",
        lifestyleHabits: Array,
      },
      cleanliness: 1,
      bedtime: 1,
      tobacco: 1,
      alcohol: 1,
      drugUse: 1,
      personality: 1,
      guests: 1,
      eatingHabits: 1,
      workHabits: 1,
    };
  },
  methods: {
    budgetChanged(value) {
      this.roommateProfileData.budget = Math.ceil(value);
    },
    cleanlinessChanged(value) {
      this.cleanliness = Math.ceil(value);
    },
    bedtimeChanged(value) {
      this.bedtime = Math.ceil(value);
    },
    tobaccoChanged(value) {
      this.tobacco = Math.ceil(value);
    },
    alcoholChanged(value) {
      this.alcohol = Math.ceil(value);
    },
    drugUseChanged(value) {
      this.drugUse = Math.ceil(value);
    },
    personalityChanged(value) {
      this.personality = Math.ceil(value);
    },
    guestsChanged(value) {
      this.guests = Math.ceil(value);
    },
    eatingHabitsChanged(value) {
      this.eatingHabits = Math.ceil(value);
    },
    workHabitsChanged(value) {
      this.workHabits = Math.ceil(value);
    },
    // TODO: Add preferred move in date and duration of stay to the firebase
    submitPressed() {
      // Ensure required fields are filled in
      if (
        this.roommateProfileData.bio === "" ||
        this.roommateProfileData.location === ""
      ) {
        Alert.alert(
          "Failed to Create Profile",
          "Please fill in all the required fields",
          {
            cancelable: false,
          }
        );
        return;
      }
      let lifestyleHabits = [
        this.cleanliness,
        this.bedtime,
        this.tobacco,
        this.alcohol,
        this.drugUse,
        this.personality,
        this.eatingHabits,
        this.workHabits,
        this.guests,
      ];
      this.roommateProfileData.lifestyleHabits = lifestyleHabits;
      addRoommateProfile(
        firebaseAuth.currentUser.uid,
        this.roommateProfileData
      );
      // Return to the roommate page once everything is successfully completed
      // Using .push as it rerenders the page (necessary after changing bool roomate status)
      this.navigation.push("Roommate");
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
  height: 100;
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
  margin-top: 10%;
}

.lifestyle-score {
  text-align: right;
  flex: 1;
  margin-top: 10%;
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

.post-btn-wrapper {
  margin-top: 15%;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  margin-bottom: 10%;
}
.post-btn {
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #f74c01;
}

.location-entry-box {
  padding-left: 5px;
  flex: 1;
}
</style>