<template>
  <view class="container">
    <!-- Loading indicator used when an upload is in progress -->
    <view class="loading-wrapper" v-if="loading">
      <activity-indicator size="large" color="#f74c01" />
      <text>Creating your listing! Please wait..</text>
    </view>
    <!-- Otherwise conditionally render the add housing fields -->
    <nb-container v-else>
      <nb-header class="header-wrapper">
        <view class="horizontal-flex">
          <nb-button class="left-arrow" :on-press="goToHousing" light>
            <image class="icon" :source="require('../../assets/iconsv2/arrow-left.png')" />
          </nb-button>
          <view class="header-text">
            <nb-text>Add Housing Listing</nb-text>
          </view>

          <nb-button class="info-btn" light>
            <image class="icon" :source="require('../../assets/iconsv2/more-info.png')" />
          </nb-button>
        </view>
      </nb-header>
      <nb-content>
        <!-- Add image section -->
        <view class="section">
          <text class="section-descriptor">Add Images</text>
          <view class="image-picker">
            <touchable-opacity :on-press="imagePicker" class="image-selector">
              <image class="icon-big" :source="require('../../assets/iconsv2/add-image.png')" />
            </touchable-opacity>
            <view
              class="img-preview-section"
              v-for="selected_img in imageSelectedUri"
              :key="selected_img"
            >
              <image v-if="imagePicked" class="image-preview" :source="{uri: selected_img}" />
            </view>
          </view>
        </view>
        <!-- monthly asking price slider -->
        <view class="section">
          <text class="section-descriptor">Add Monthly Asking Price</text>
          <view class="slider-wrapper">
            <view class="text-wrapper">
              <text>
                <text class="monthly-asking-price">${{ monthlyAskingPrice }}</text>a month
              </text>
            </view>
            <slider
              class="slider-actual"
              :value="1000"
              :minimumValue="100"
              :maximumValue="5000"
              :step="50"
              :onValueChange="askingPriceChanged"
              :minimumTrackTintColor="'#f74c01'"
              :maximumTrackTintColor="'#f74c01'"
              :thumbTintColor="'#ffffff'"
              :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
            />
          </view>
        </view>
        <!-- Number of bedrooms -->
        <view class="section">
          <text class="section-descriptor">Number of Bedrooms</text>
          <view class="picker">
            <touchable-opacity
              class="individual-picker"
              :on-press="selectStudio"
              :class="[numberOfBedrooms.studioSelected ? 'bg-dormy-orange' : '']"
            >
              <text>Studio</text>
            </touchable-opacity>
            <touchable-opacity
              class="individual-picker"
              :on-press="selectOneBedroom"
              :class="[numberOfBedrooms.oneSelected ? 'bg-dormy-orange' : '']"
            >
              <text>1</text>
            </touchable-opacity>
            <touchable-opacity
              class="individual-picker"
              :on-press="selectTwoBedroom"
              :class="[numberOfBedrooms.twoSelected ? 'bg-dormy-orange' : '']"
            >
              <text>2</text>
            </touchable-opacity>
            <touchable-opacity
              class="individual-picker"
              :on-press="selectThreePlusBedroom"
              :class="[numberOfBedrooms.threePlusSelected ? 'bg-dormy-orange' : '']"
            >
              <text>3+</text>
            </touchable-opacity>
          </view>
        </view>
        <!-- Number of bathrooms -->
        <view class="section">
          <text class="section-descriptor">Number of Bathrooms</text>
          <view class="picker">
            <touchable-opacity
              class="individual-picker"
              :on-press="selectOneBathroom"
              :class="[numberOfBathrooms.oneSelected ? 'bg-dormy-orange' : '']"
            >
              <text>1</text>
            </touchable-opacity>
            <touchable-opacity
              class="individual-picker"
              :on-press="selectTwoBathroom"
              :class="[numberOfBathrooms.twoSelected ? 'bg-dormy-orange' : '']"
            >
              <text>2</text>
            </touchable-opacity>
            <touchable-opacity
              class="individual-picker"
              :on-press="selectThreeBathroom"
              :class="[numberOfBathrooms.threeSelected ? 'bg-dormy-orange' : '']"
            >
              <text>3</text>
            </touchable-opacity>
            <touchable-opacity
              class="individual-picker"
              :on-press="selectFourPlusBathroom"
              :class="[numberOfBathrooms.fourPlusSelected ? 'bg-dormy-orange' : '']"
            >
              <text>4+</text>
            </touchable-opacity>
          </view>
        </view>
        <!-- Square footage slider -->
        <view class="section">
          <text class="section-descriptor">Square Feet</text>
          <view class="slider-wrapper">
            <view class="text-wrapper">
              <text>
                <text class="monthly-asking-price">{{ squareFootage }} sqft</text>
              </text>
            </view>
            <slider
              class="slider-actual"
              :value="1000"
              :minimumValue="100"
              :maximumValue="5000"
              :step="50"
              :onValueChange="squareFootageChanged"
              :minimumTrackTintColor="'#f74c01'"
              :maximumTrackTintColor="'#f74c01'"
              :thumbTintColor="'#ffffff'"
              :thumbStyle="{borderColor: '#f74c01', borderRadius: 25, borderWidth: 1.5}"
            />
          </view>
        </view>
        <!-- Location picker (just a text box right now) -->
        <view class="section">
          <text class="section-descriptor">Location</text>
          <view class="location-picker">
            <image class="icon" :source="require('../../assets/iconsv2/destination.png')" />
            <text-input
              :placeholder="'Enter the house address here (Required)'"
              class="location-entry-box"
              v-model="houseLocation"
            />
          </view>
        </view>

        <!-- Description -->
        <view class="section">
          <text class="section-descriptor">Description</text>
          <text-input
            :placeholder="'Enter a brief description here (Optional)'"
            class="description-entry-box"
            v-model="description"
          />
        </view>

        <!-- Phone Number -->
        <view class="section">
          <text class="section-descriptor">Phone Number</text>
          <text-input
            :placeholder="'Enter phone number here (required)'"
            class="description-entry-box"
            v-model="phoneNumber"
          />
        </view>

        <!-- House Type (Apartment / House / Room in apartment) -->
        <view class="section horizontal-flex" :style="{alignItems: 'center'}">
          <view class="horizontal-flex">
            <text>Select Housing Type:</text>
          </view>
          <nb-picker
            mode="dropdown"
            placeholder="Select Housing Type"
            headerBackButtonText="Back"
            :selectedValue="housingTypeValue"
            :onValueChange="onHousingTypeChange"
          >
            <nb-item v-for="type in housingTypes" :key="type" :label="type" :value="type" />
          </nb-picker>
        </view>

        <!-- Rental Type (Renting / Sub-leasing) -->
        <view class="section horizontal-flex" :style="{alignItems: 'center'}">
          <view class="horizontal-flex">
            <text>Select Rental Type:</text>
          </view>
          <nb-picker
            mode="dropdown"
            placeholder="Select Rental Type"
            headerBackButtonText="Back"
            :selectedValue="rentalTypeValue"
            :onValueChange="onRentalTypeChange"
          >
            <nb-item v-for="type in rentalTypes" :key="type" :label="type" :value="type" />
          </nb-picker>
        </view>

        <!-- Bottom Post Ride Share Button -->
        <view class="post-btn-wrapper">
          <nb-button class="post-btn" :on-press="createHousingListing">
            <nb-text>Create Listing</nb-text>
          </nb-button>
        </view>
      </nb-content>
    </nb-container>
  </view>
</template>

<script>
import { Alert, ActivityIndicator } from "react-native";
import { Slider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { postListing } from "../../api/housingApi.js";
import { firebaseAuth } from "../../environment/config.js";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      monthlyAskingPrice: 1000,
      squareFootage: 1500,
      numberOfBedrooms: {
        studioSelected: true,
        oneSelected: false,
        twoSelected: false,
        threePlusSelected: false,
      },
      numberOfBathrooms: {
        oneSelected: true,
        twoSelected: false,
        threeSelected: false,
        fourPlusSelected: false,
      },
      houseLocation: "",
      description: "",
      phoneNumber: "",
      imagePicked: false,
      imageSelectedUri: [],
      housingTypes: ["Apartment", "House", "Room"],
      housingTypeValue: "",
      rentalTypes: ["Rent", "Sub lease"],
      rentalTypeValue: "",
    };
  },
  mounted: function () {
    this.getPermissionAsync();
  },
  methods: {
    createHousingListing() {
      if (this.houseLocation === "" || this.phoneNumber === "") {
        this.postingFailed("Enter necessary fields and try again.");
        return;
      }
      // Format the data well and send it over to the housing API to handle it

      // Find number of bedrooms
      let numberBedrooms, numberBathrooms;
      if (this.numberOfBedrooms.studioSelected) {
        numberBedrooms = 0;
      } else if (this.numberOfBedrooms.oneSelected) {
        numberBedrooms = 1;
      } else if (this.numberOfBedrooms.twoSelected) {
        numberBedrooms = 2;
      } else {
        numberBedrooms = 3;
      }
      // Find number of bathrooms
      if (this.numberOfBathrooms.oneSelected) {
        numberBathrooms = 1;
      } else if (this.numberOfBathrooms.twoSelected) {
        numberBathrooms = 2;
      } else if (this.numberOfBathrooms.threeSelected) {
        numberBathrooms = 3;
      } else {
        numberBathrooms = 4;
      }
      // Create the timestamp
      const timeStamp = new Date();
      // Create the object
      const housingData = {
        monthlyAskingPrice: this.monthlyAskingPrice,
        squareFootage: this.squareFootage,
        houseLocation: this.houseLocation,
        description: this.description,
        phoneNumber: this.phoneNumber,
        housingImages: this.imageSelectedUri,
        numberOfBedrooms: numberBedrooms,
        numberOfBathrooms: numberBathrooms,
        userUID: firebaseAuth.currentUser.uid,
        timeStamp: timeStamp,
        housingType: this.housingTypeValue,
        rentalType: this.rentalTypeValue,
      };

      this.loading = true;

      // Send the object over to the API
      postListing(housingData, this.postingFailed, this.postingSuccess);
    },
    onHousingTypeChange(housingType) {
      this.housingTypeValue = housingType;
    },
    onRentalTypeChange(rentalType) {
      this.rentalTypeValue = rentalType;
    },
    postingFailed(errorMessage) {
      this.loading = false;
      Alert.alert("Failed to Create Listing", "Error: " + errorMessage, {
        cancelable: false,
      });
    },
    postingSuccess() {
      this.loading = false;
      this.navigation.navigate("HomeFeed");
    },
    goToHousing() {
      this.navigation.navigate("HomeFeed");
    },
    askingPriceChanged(value) {
      this.monthlyAskingPrice = Math.ceil(value);
    },
    faslifyAllBedrooms() {
      this.numberOfBedrooms.studioSelected = false;
      this.numberOfBedrooms.oneSelected = false;
      this.numberOfBedrooms.twoSelected = false;
      this.numberOfBedrooms.threePlusSelected = false;
    },
    selectStudio() {
      this.faslifyAllBedrooms();
      this.numberOfBedrooms.studioSelected = true;
    },
    selectOneBedroom() {
      this.faslifyAllBedrooms();
      this.numberOfBedrooms.oneSelected = true;
    },
    selectTwoBedroom() {
      this.faslifyAllBedrooms();
      this.numberOfBedrooms.twoSelected = true;
    },
    selectThreePlusBedroom() {
      this.faslifyAllBedrooms();
      this.numberOfBedrooms.threePlusSelected = true;
    },
    falsifyAllBathrooms() {
      this.numberOfBathrooms.oneSelected = false;
      this.numberOfBathrooms.twoSelected = false;
      this.numberOfBathrooms.threeSelected = false;
      this.numberOfBathrooms.fourPlusSelected = false;
    },
    selectOneBathroom() {
      this.falsifyAllBathrooms();
      this.numberOfBathrooms.oneSelected = true;
    },
    selectTwoBathroom() {
      this.falsifyAllBathrooms();
      this.numberOfBathrooms.twoSelected = true;
    },
    selectThreeBathroom() {
      this.falsifyAllBathrooms();
      this.numberOfBathrooms.threeSelected = true;
    },
    selectFourPlusBathroom() {
      this.falsifyAllBathrooms();
      this.numberOfBathrooms.fourPlusSelected = true;
    },
    squareFootageChanged(value) {
      this.squareFootage = Math.ceil(value);
    },
    saveListing() {
      this.goToHousing();
    },
    getPermissionAsync: async function () {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    },
    imagePicker: async function () {
      // Currently, expo only supports attaching one image,
      // but we could in the future, make recursive calls to
      // imagePicker so that we can select multiple items
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          // allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
        if (!result.cancelled) {
          this.imagePicked = true;
          this.imageSelectedUri.push(result.uri);
        }
      } catch (E) {
        console.log(E);
      }
    },
  },
  components: {
    Slider,
    ActivityIndicator,
  },
};
</script>

<style>
/* Loading indicator styles */
.loading-wrapper {
  justify-content: center;
  align-items: center;
  height: 100%;
}
/* Container Styles */
.container {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.card-container {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}
.horizontal-flex {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.vertical-flex {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-item {
  margin: 5;
}
.card-heading {
  color: #696969;
}
.icon {
  width: 20px;
  height: 20px;
}
.icon-big {
  width: 50px;
  height: 50px;
}
.section {
  margin: 40px;
  margin-bottom: 0px;
}

.section-descriptor {
  font-size: 14;
  margin-bottom: 20;
}
.text-wrapper {
  flex-direction: row;
  flex: 1;
  justify-content: center;
  padding-top: 10;
  padding-bottom: 10;
  border-bottom-color: #a9a9a9;
  border-bottom-width: 0.2;
}
.image-preview {
  margin-top: 10px;
  width: 120px;
  height: 120px;
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
.monthly-asking-price {
  font-weight: bold;
}
.picker {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: #a9a9a9;
  border-width: 1;
  border-radius: 5;
}
.individual-picker {
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: #a9a9a9;
  border-right-width: 1;
  padding: 15;
}
.bg-dormy-orange {
  background-color: #f74c01;
}
.location-picker {
  flex-direction: row;
  justify-content: space-around;
  border-color: #a9a9a9;
  border-width: 1;
  padding: 10;
  border-radius: 5;
}
.location-entry-box {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}
.description-entry-box {
  height: 50;
  flex: 1;
  border-color: #a9a9a9;
  border-width: 1;
  border-radius: 5;
  padding: 2;
}
.post-btn {
  margin-bottom: 50;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f74c01;
}
.img-preview-section {
  flex-direction: row;
}

/* Header Styling */
.header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left-arrow {
  flex: 1;
  justify-content: flex-start;
}
.header-text {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-btn {
  flex: 1;
  justify-content: flex-end;
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
</style>
