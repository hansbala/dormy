<template>
    <view>
        <!-- Each individual card -->
        <!-- :source="require('../../assets/test_pictures/bedroom.jpg')" -->
        <view class="card">
            <view class="horizontal-flex card-header-image">
                <image class="user-photo" :source="require('../../assets/Images/rmate-man1.jpeg')"/>
                <text>{{realName}}</text>
            </view>
            <image
                class="card-image"
                :source="{uri: listing.imagePath}"
                :key="Math.floor(Math.random() * 1000)"
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
                    <text class="phone-number"> {{listing.phoneNumber}} </text>
                </view>
            </view>

            <view class="description-wrapper">
                <text> {{listing.description}} </text>
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
        </view>
    </view>
</template>

<script>
import { getUserNameFromUID } from '../../api/userAuth.js';
export default {
    props: {
        listing: Object
    },
    data() {
        return {
            realName: '',
        }
    },
    mounted() {
        if (this.listing.numberOfBedrooms == 0) {
            this.listing.numberOfBedrooms = 'Studio';
        }
        this.getUserNameFromUID();
    },
    methods: {
        async getUserNameFromUID() {
            let realName = await getUserNameFromUID(this.listing.userUID);
            this.realName = realName;
        },
        getRandomImage() {
            let imageTitles = ['bedroom.jpg', 'apartment-1.jpg', 'apartment-2.jpg', 'apartment-3.jpg', 'house-1.jpg'];
            let imageTitle = imageTitles[Math.floor(Math.random() * imageTitles.length)];
            let imagePath = '../../assets/test_pictures/';
            this.randomImage = imagePath + imageTitle;
        }
    }
}
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
.user-photo {
    width: 35;
    height: 35;
    border-radius: 200;
    margin-left: 10;
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