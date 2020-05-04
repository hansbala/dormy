<template>
    <view class="container">
        <nb-container>
            <nb-header class="header-wrapper">
                <view class="horizontal-flex">
                    <nb-button class="left-arrow" :on-press="goToHousing" light>
                        <image class="icon" :source="require('../../assets/Icons/Arrow-left.png')"/>
                    </nb-button> 
                    <view class="header-text"> 
                        <nb-text >Add Housing Listing</nb-text>
                    </view>
                    
                    <nb-button  class="info-btn" light>
                        <image class="icon" :source="require('../../assets/Icons/more-info.png')"/>
                    </nb-button>  
                </view>
            </nb-header>
            <nb-content>
                <!-- Add image section -->
                <view class="section">
                    <text class="section-descriptor"> Add Images </text>
                    <touchable-opacity class="image-selector">
                        <image 
                            class="icon-big"
                            :source="require('../../assets/Icons/add-image.png')" />
                    </touchable-opacity>
                </view>
                <!-- monthly asking price slider -->
                <view class="section">
                    <text class="section-descriptor"> Add Monthly Asking Price </text>
                    <view class="slider-wrapper">
                        <view class="text-wrapper">
                            <text><text class="monthly-asking-price">${{ monthlyAskingPrice }}</text> a month </text>
                        </view>
                        <slider 
                            class="slider-actual"
                            :value=1000
                            :minimumValue=100
                            :maximumValue=5000
                            :step=50
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
                    <text class="section-descriptor">Number of Bedrooms </text>
                    <view class="picker">
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBedrooms.studioSelected ? 'bg-dormy-orange' : '']">
                            <text> Studio </text>
                        </touchable-opacity>
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBedrooms.oneSelected ? 'bg-dormy-orange' : '']">
                            <text> 1 </text>
                        </touchable-opacity>
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBedrooms.twoSelected ? 'bg-dormy-orange' : '']">
                            <text> 2 </text>
                        </touchable-opacity>
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBedrooms.threePlusSelected ? 'bg-dormy-orange' : '']">
                            <text> 3+ </text>
                        </touchable-opacity>
                    </view>
                </view>
                <!-- Number of bathrooms -->
                <view class="section">
                    <text class="section-descriptor">Number of Bathrooms </text>
                    <view class="picker">
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBathrooms.oneSelected ? 'bg-dormy-orange' : '']">
                            <text> 1 </text>
                        </touchable-opacity>
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBathrooms.twoSelected ? 'bg-dormy-orange' : '']">
                            <text> 2 </text>
                        </touchable-opacity>
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBathrooms.threeSelected ? 'bg-dormy-orange' : '']">
                            <text> 3 </text>
                        </touchable-opacity>
                        <touchable-opacity class="individual-picker"
                            :class="[numberOfBathrooms.fourPlusSelected ? 'bg-dormy-orange' : '']">
                            <text> 4+ </text>
                        </touchable-opacity>
                    </view>
                </view>
                <!-- Square footage slider -->
                <view class="section">
                    <text class="section-descriptor"> Square Feet </text>
                    <view class="slider-wrapper">
                        <view class="text-wrapper">
                            <text><text class="monthly-asking-price">{{ squareFootage }} sqft</text> </text>
                        </view>
                        <slider 
                            class="slider-actual"
                            :value=1000
                            :minimumValue=100
                            :maximumValue=5000
                            :step=50
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
                    <text class="section-descriptor"> Location </text>
                    <view class="location-picker">
                        <image
                            class="icon"
                            :source="require('../../assets/Icons/destination.png')"
                        />
                        <text-input class="location-entry-box" v-model="houseLocation" />
                    </view>
                </view>

                <!-- Description -->
                <view class="section">
                    <text class="section-descriptor"> Description </text>
                    <text-input class="description-entry-box" v-model="description" />
                </view>

                <!-- Phone Number -->
                <view class="section">
                    <text class="section-descriptor"> Phone Number </text>
                    <text-input class="description-entry-box" v-model="phoneNumber" />
                </view>

                <!-- Bottom Post Ride Share Button -->
                <view class="post-btn-wrapper">
                    <nb-button class="post-btn">
                        <nb-text>Create Listing</nb-text>
                    </nb-button>
                </view>
            </nb-content>
        </nb-container>
    </view>
</template>

<script>
import { Slider } from 'react-native-elements';
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
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
            houseLocation: 'Enter location here...',
            description: '',
            phoneNumber: '',
        };
    },
    methods: {
        goToHousing() {
            this.navigation.navigate("HomeFeed");
        },
        askingPriceChanged(value) {
            this.monthlyAskingPrice = Math.ceil(value);
            console.log("value changed to: " + this.monthlyAskingPrice);
        },
        squareFootageChanged(value) {
            this.squareFootage = Math.ceil(value);
            console.log("value changed to: " + this.squareFootage);
        },
        saveListing() {
            console.log("save btn clicked");
            this.goToHousing();
        }
    },
    components: {
        Slider,
    }
};
</script>

<style>
/***************************************

    Overall Card Container Styling      

 ***************************************/

.container {
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.card-container{
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
    flex: 1
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

/***************************************

    Styling for Header 
    
***************************************/

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
    display:flex;
    justify-content: center;
    align-items: center;
}

.info-btn {
    flex: 1;
    justify-content: flex-end;
}

.post-btn-wrapper{
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
    background-color: #F74C01;
}
</style>
