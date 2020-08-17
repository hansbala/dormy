<template>
  <view class="card">
    <!-- Header displaying info and ability to save listing -->
    <view class="horizontal-flex flex-between card-header-image">
      <view class="horizontal-flex outline-0">
        <image class="user-photo" :source="require('../../assets/Images/rmate-man1.jpeg')" />
        <text>{{realName}}</text>
      </view>
      <touchable-opacity :on-press="() => toggleSaveListing()">
        <image
          v-if="listingSaved"
          class="small-photo"
          :source="require('../../assets/Icons/heart-active.png')"
        />
        <image
          v-else
          class="small-photo"
          :source="require('../../assets/Icons/heart-inactive.png')"
        />
      </touchable-opacity>
    </view>
    <touchable-opacity :on-press="() => goToListing()">
      <image
        class="card-image"
        :source="{uri: listing.images[0]}"
        :key="Math.floor(Math.random() * 1000)"
      />
      <!-- Price, number of bedrooms and something like "apartment for rent" -->
      <view class="card-info-section-wrapper">
        <view class="card-info">
          <text class="card-info-txt card-info-ppm">${{listing.monthlyAskingPrice}}/Mo</text>
          <text class="card-info-txt">{{listing.numberOfBedrooms}} beds</text>
          <text class="card-info-txt">{{listing.numberOfBathrooms}} bath</text>
          <text class="card-info-txt">{{listing.squareFootage}} sqft</text>
        </view>
        <view class="card-info-descriptor-wrapper">
          <text class="card-info-descriptor">
            <text class="apartment-type">{{listing.housingType}}</text>For
            <text class="apartment-type">{{listing.rentalType}}</text>
          </text>
          <text class="phone-number">{{listing.phoneNumber}}</text>
        </view>
      </view>

      <view class="description-wrapper">
        <text>{{listing.description}}</text>
      </view>

      <!-- Address preview -->
      <view class="address-preview-wrapper">
        <image class="address-preview-icon" :source="require('../../assets/location_icon.png')" />
        <text class="address-preview">{{listing.houseLocation}}</text>
      </view>
    </touchable-opacity>
  </view>
</template>

<script>
import { getUserNameFromUID } from "../../api/userAuth.js";
import {
  bookmarkHousingListing,
  debookmarkHousingListing,
} from "../../api/housingApi.js";
export default {
  props: {
    navigation: {
      type: Object,
    },
    listing: {
      type: Object,
    },
    bookmarks: {
      type: Array,
    },
  },
  data() {
    return {
      realName: "",
      listingSaved: false,
    };
  },
  mounted() {
    console.log(this.bookmarks);
    console.log("creating cards");
    if (this.listing.numberOfBedrooms == 0) {
      this.listing.numberOfBedrooms = "Studio";
    }
    this.getUserNameFromUID();
  },
  methods: {
    async getUserNameFromUID() {
      let realName = await getUserNameFromUID(this.listing.userUID);
      this.realName = realName;
    },
    goToListing() {
      this.navigation.navigate("HousingListing", {
        listingID: this.listing.id,
      });
    },
    async toggleSaveListing() {
      if (!this.listingSaved) {
        this.listingSaved = true;
        await bookmarkHousingListing(
          this.listing.id,
          function () {
            console.log("added bookmark");
          },
          function () {
            console.log("could not save listing as favourite :(");
          }
        );
      } else {
        this.listingSaved = false;
        await debookmarkHousingListing(
          this.listing.id,
          function () {
            console.log("deleted bookmark");
          },
          function () {
            console.log("could not remove bookmark");
          }
        );
      }
    },
  },
};
</script>

<style>
.card {
  margin: 10;
  border-radius: 10;
  border-color: #eee;
  border-width: 3;
}
.horizontal-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ededed;
  padding: 5;
}
.flex-between {
  justify-content: space-between;
}
.outline-0 {
  margin: 0;
  padding: 0;
}
.user-photo {
  width: 35;
  height: 35;
  border-radius: 200;
  margin-left: 10;
  margin-right: 10;
}
.small-photo {
  width: 25;
  height: 25;
  margin-right: 10;
}
.card-image {
  border-radius: 5;
  height: 200;
  width: 100%;
}
.card-info {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.card-info-ppm {
  flex: 2;
  font-size: 16;
}
.card-info-txt {
  margin: 10;
  font-size: 14;
  font-weight: bold;
}
.card-info-descriptor-wrapper {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5;
  background-color: #eee;
  padding: 5;
}
.card-info-descriptor {
  font-size: 14;
  padding: 5;
  color: #a9a9a9;
}
.apartment-type {
  font-size: 14;
  color: orange;
  font-weight: bold;
}
.description-wrapper {
  padding: 10;
}
.address-preview-wrapper {
  flex-direction: row;
  align-items: center;
  padding: 10;
  background-color: #eee;
}
</style>
