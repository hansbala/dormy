<template>
    <view class="container">
        <image class="test-img"
            :source="{uri: 'https://picsum.photos/200/300'}"
        />
        <!-- Price, number of bedrooms and something like "apartment for rent" -->
        <view class="card-info-section-wrapper">
            <view class="card-info">
                <text class="card-info-txt card-info-ppm">
                    ${{listing.monthlyAskingPrice}}/Mo
                </text>
                <text class="card-info-txt">{{listing.numberOfBedrooms}} beds</text>
                <text class="card-info-txt">{{listing.numberOfBathrooms}} bath</text>
                <text class="card-info-txt">{{listing.squareFootage}} sqft</text>
            </view>
            <view class="card-info-descriptor-wrapper">
                <text class="card-info-descriptor">
                    <text class="apartment-type"> {{listing.housingType}} </text>
                    For <text class="apartment-type">{{listing.rentalType}}</text>
                </text>
            </view>
        </view>
        <!-- Address preview -->
        <view class="address-preview-wrapper">
            <image
                class="address-preview-icon"
                :source="require('../../assets/location_icon.png')"
            />
            <text class="address-preview">
                {{listing.houseLocation}}
            </text>
        </view>
        <text> Will include a map in here! </text>
        <!-- days listed and possibly contact button -->
        <view class="section-wrapper">
            <view class="inner-section-wrapper">
                <text> Days listed <text class="days-listed">8</text></text>
            </view>
            <view class="inner-section-wrapper">
                <text> Contact <text class="phone-number">{{ listing.phoneNumber }}</text></text>
            </view>
        </view>
        <!-- Description area -->
        <view class="description-wrapper">
            <text class="description-heading"> Description </text>
            <text class="description"> {{ listing.description }} </text>
        </view>
    </view>

</template>

<script>
import { getHousingListingFromID } from '../../api/housingApi.js';
export default {
    props: {
        navigation: {
            type: Object
        },
    },
    data() {
        return {
            listing: {},
        }
    },
    mounted() {
        const listingID = this.navigation.getParam('listingID');
        this.generateListingData(listingID);
        console.log(this.listing);
    },
    methods: {
        async generateListingData(listingID) {
            const listingData = await getHousingListingFromID(listingID);
            if (listingData) {
                console.log(listingData);
                this.listing = listingData;
            } else {
                console.log('could not generate listing');
            }
        },
    }
}
</script>

<style>
.container {
    height: 100%;
    flex-direction: column;
}
.test-img {
    width: 100%;
    height: 300;
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
.address-preview-wrapper {
    flex-direction: row;
    align-items: center;
    padding: 10;
    background-color: #eee;
    margin: 10;
    border-radius: 10;
}
.address-preview {
    margin-left: 5;
}
.section-wrapper {
    flex-direction: row;
    justify-content: space-around;
    margin: 10;
}
.inner-section-wrapper {
    background-color: #eee;
    padding: 10;
    border-radius: 10;
}
.description-wrapper {
    margin: 10;
}
.description-heading {
    font-weight: bold;
}
.description {
    margin-top: 10;
}
</style>
