<template>
    <view class="container">
        <nb-container>
            <nb-header class="header-wrapper">
                <view class="horizontal-flex">
                     <nb-button  class="left-arrow" :on-press="goToRideShare" light>
                        <image class="icon" :source="require('../../assets/Icons/Arrow-left.png')"/>
                    </nb-button> 
                    <view class="header-text"> 
                        <nb-text>Schedule Your Ride</nb-text>
                    </view>
                    
                    <nb-button  class="info-btn" :on-press="displayInfo" light>
                        <image class="icon" :source="require('../../assets/Icons/more-info.png')"/>
                    </nb-button>  
                </view>
            </nb-header>
            <nb-content>

                <nb-card class="card-container">
                    <!-- Card Item For Dropoff/pickup location -->
                    <nb-card-item bordered class="card-item">
                        <view class="horizontal-flex">
                            <view class="vertical-flex">
                                <text class="card-heading">From</text>
                                <text-input class="destination-input" placeholder="Enter Pickup" v-model="rideShare.location.pickup"/>
                            </view>
                            <view class="vertical-flex">
                                <text class="card-heading">To</text>
                                <text-input class="destination-input" placeholder="Enter Destination" v-model="rideShare.location.dropoff"/>
                            </view> 
                        </view>
                    </nb-card-item>

                    <!-- Card Item For Departure Date -->
                    <nb-card-item bordered class="card-item">
                        <view class="horizontal-flex">
                            <view class="vertical-flex">
                                <text class="card-heading">Departure</text>
                                <view class="horizontal-flex date-picker">
                                    <image class="icon" :source="require('../../assets/Icons/cal-sched.png')"/>
                                    <nb-date-picker
                                    :defaultDate="defaultDate"
                                    :minimumDate="minimumDate"
                                    :maximumDate="maximumDate"
                                    :formatChosenDate="formatFromDate"
                                    :modalTransparent="false"
                                    animationType="fade"
                                    androidMode="default"
                                    placeHolderText="Select date"
                                    :textStyle="{ color: 'green' }"
                                    :placeHolderTextStyle="{ color: '#d3d3d3' }"
                                    :onDateChange="setFromDate"
                                />
                                </view>
                                
                            </view>

                            <view class="vertical-flex">
                                <text class="card-heading">Time</text>
                                <view class="horizontal-flex date-picker">
                                    <image class="icon" :source="require('../../assets/Icons/time.png')"/>
                                    <nb-picker
                                        mode="dropdown"
                                        placeholder="Select Time"
                                        headerBackButtonText="Back"
                                        :selectedValue="rideShare.dates.rideShareTime"
                                        :onValueChange="onTimeChange"
                                    >
                                        <nb-item v-for="time in times" 
                                                :key="time" 
                                                :label="time" 
                                                :value="time"
                                        />
                                    </nb-picker>
                            </view>
                        </view>
                    </nb-card-item>

                    <!-- Card Item For Splitting Fair -->
                    <nb-card-item bordered class="card-item">
                        <view class="vertical-flex">
                            <text class="card-heading">Splitting Fare</text> 

                            <view class="horizontal-flex fair-splitting">
                                <view class="horizontal-flex">

                                    <image class="icon" :source="require('../../assets/Icons/Nav-bar/roommates-inactive.png')"/>

                                    <text class="adults-txt">ADULTS</text>
                                </view>

                                <view class="horizontal-flex">
                                    <touchable-opacity :on-press="decreaseRiders" class="num-rider-btn">
                                        <text> - </text>
                                    </touchable-opacity>

                                    <text class="num-riders">{{rideShare.numPassengers}}</text>

                                    <touchable-opacity :on-press="increaseRiders" class="num-rider-btn">
                                        <text> + </text>
                                    </touchable-opacity>
                                </view>
                            </view>
                        </view>
                    </nb-card-item>

                    <!-- Card Item For Selecting Ride Type -->
                    <nb-card-item bordered class="card-item">
                        <view class="vertical-flex">
                            <text class="card-heading">Select Ride Type</text>

                            <scroll-view :horizontal="true" >
                                <touchable-opacity :on-press="() => rideType('Uber')" class="ride-btn" style="background-color: black">
                                    <text style="color:white; text-align: center"> Uber </text>
                                </touchable-opacity>

                                <touchable-opacity :on-press="() => rideType('Lyft')" class="ride-btn" style="background-color: #ff00bf">
                                    <text style="color:white; text-align: center"> Lyft </text>
                                </touchable-opacity>

                                 <touchable-opacity :on-press="() => rideType('Taxi')" class="ride-btn" style="background-color: #FEC33A">
                                    <text style="text-align: center"> Taxi </text>
                                </touchable-opacity>

                                 <touchable-opacity :on-press="() => rideType('Carpool')" class="ride-btn" style="background-color: #89cff0 ">
                                    <text style="color:white; text-align: center"> Carpool </text>
                                </touchable-opacity>
                            </scroll-view>
                        </view>
                    </nb-card-item>
                
                    <nb-card-item class="card-item">
                        <nb-form class="text-area">
                            <view class="vertical-flex">
                                <text class="card-heading">Comments or Additional Details</text>
                                <nb-textarea  :rowSpan="5" bordered v-model="rideShare.comment"/>
                            </view>
                        </nb-form>
                    </nb-card-item>
                </nb-card>


                <!-- Bottom Post Ride Share Button -->
                <view class="post-btn-wrapper">
                    <nb-button class="post-btn" :on-press="addPostDate">
                        <nb-text>Post Ride Share</nb-text>
                    </nb-button>
                </view>

            </nb-content>
        </nb-container>
        <!-- Bottom navigation section -->
        <!-- <bottom-nav-bar :navigation="this.props.navigation"></bottom-nav-bar> -->
    </view>
</template>

<script>
/* TODOS: 
    -Validate inputs for Schedule Ride 
*/
import React from "react";
import { Alert } from "react-native";
import BottomNavBar from "../Navigation/TabNavBar.vue";
import moment from 'moment'

import { postRideshare } from "../../api/rideshareApi.js";
import { firebaseAuth } from "../../environment/config.js";
import { getUserNameFromUID } from '../../api/userAuth.js';


export default {
    mounted () {
        this.getUserNameFromUID();
    },
    props: {
        navigation: {
            type: Object
        }
    },
    data () {
        return { 
            rideShare: {
                userUID: firebaseAuth.currentUser.uid,
                username: '',
                profilepic: '',
                dates: {

                    rideShareDate: '',
                    rideShareTime: '',
                    postedDate: new Date(),
                    fireBasePostedDate: new Date(),
                    longDate: new Date(),
                },
                location: {
                    pickup: '',
                    dropoff: '',
                },
                numPassengers: 1,
                rideType: '',
                comment: '',
            },
            defaultDate: new Date(),
            minimumDate: new Date(),
            maximumDate: new Date('2020-12-31'),
            times: this.generateTimes(),
            formError: ''
        }
    },
    components: {
        BottomNavBar
    },
    methods: {
        formatFromDate: function(date) {
           this.rideShare.dates.rideShareDate = moment(date).format("MMM Do");
            // this.rideShare.dates.rideShareDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
            return this.rideShare.dates.rideShareDate
        },
        setFromDate: function(newDate) {
            this.rideShare.dates.rideShareDate = newDate;
        },
        increaseRiders: function () {
            if(this.rideShare.numPassengers == 8) {
                return;
            } else{
                this.rideShare.numPassengers ++;
            }
        },
        decreaseRiders: function() {
            if(this.rideShare.numPassengers == 0){
                return;
            }else{
                this.rideShare.numPassengers --;
            }
        },
        onTimeChange: function (time) {
            this.rideShare.dates.rideShareTime = time;
        },
        generateTimes () {
            const times = [];
            let displayTime = 0;
            for(let i = 0; displayTime < 24*60; i++) {
                const hour = Math.floor(displayTime/60);
                const min = (displayTime % 60);
                // This function was taken from Filip Jerga (Youtube)
                times[i] = ("0" + (hour >= 12 ? hour % 24 : hour % 12)).slice(-2) + ':' + ("0" + min).slice(-2)
                displayTime += 30;
            }
            times.push('23:59');
            return times
        },
        rideType (type) {
            this.rideShare.rideType = type;
            console.log("rideType:" + this.rideShare.rideType);
        },
        addPostDate () {
            let currDate = new Date();
            this.rideShare.dates.postedDate = moment(currDate).format("MMM Do");
            // this.rideShare.dates.fireBasePostedDate = firebase.database.ServerValue.TIMESTAMP;
            this.rideShare.dates.longDate = moment(currDate).format();

            this.addRideShare();
        },
        goToRideShare () {
            this.navigation.navigate("FindRideShare");
        },
        addRideShare() {
            if(this.formValid()){
                postRideshare( this.rideShare, this.postingFailed, this.postingSuccess);
                // let key = firebase.database().ref('/rideShare').push().key;
                // firebase.database().ref('/rideShare').child(key).set({data: this.rideShare})
                // this.navigation.navigate("FindRideShare");
            }else {
                console.log("did not add rideshare")
                Alert.alert(
                    "Invalid Form",
                    "Please make sure to fill out the " + this.formError + " category on the form",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") } 
                    ],
                    { cancelable: false}
                )
            }
        },
        postingFailed(errorMessage) {
            Alert.alert(
                "Failed to Create Listing",
                "Error: " + errorMessage,
                { cancelable: false }
            );
        },
         postingSuccess() {
            this.navigation.navigate("FindRideShare");
        },
        displayInfo() {
            Alert.alert(
                "What to Do?",
                "Please fill out all the categories and then press the 'Post Ride Share' button when you are done.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        },
        formValid() {
            console.log(this.rideShare.dates.rideShareDate);
            if(this.rideShare.location.pickup == ''){
                this.formError = "From"
                return false;
            }else if (this.rideShare.location.dropoff == '') {
                this.formError = "To"
                return false;
            }else if (this.rideShare.dates.rideShareDate == '') {
                this.formError = "Departure"
                return false;
            }else if (this.rideShare.dates.rideShareTime == '') {
                this.formError = "Time"
                return false;
            }else if (this.rideShare.rideType == '') {
                this.formError = "Ride Type"
                return false;
            }else if (this.rideShare.comment == '') {
                this.formError = "Comment"
                return false;
            }else {
                return true;
            }
        },
        async getUserNameFromUID() {
            let realName = await getUserNameFromUID(firebaseAuth.currentUser.uid, this.postFailed);
            this.rideShare.username = realName;
        },
        postingFailed() {
            Alert.alert(
                "Failed to Create Rideshare post",
                "Error: " + errorMessage,
                { cancelable: false }
            );
        },
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


/*************************************** 

    Styling for Pickup and Destination

****************************************/
.destination-input{
    margin-top: 5px;
    color: #F74C01;
}

/*************************************** 

    Styling for Departure and Return

****************************************/
.date-picker{
    display: flex;
    align-items: center;
}

/*************************************** 

    Splitting Fairs Styling
    
****************************************/
.fair-splitting {
    margin-top: 10;
    margin-bottom: 10;
}
.num-riders {
    width: 30%;
    text-align: center;
    color: #F74C01;
}

.num-rider-btn {
    text-align: center;
    border-width: 1;
    border-color: #696969;
    border-radius: 5;
    width: 20;
    height: 20;
}

.adults-txt {
    margin-left: 10px;
    color: #F74C01;
}

/*************************************** 

    Select Ride Type Styling
    
****************************************/
.btn-wrapper {
    display: flex;
    justify-content: center;
}

.ride-btn {
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 5;
    margin: 10;
    width: 80;
    height: 30;
}

/*************************************** 

    Comments/Additional Details
    
****************************************/
.text-area {
    width: 100%;

}


/*************************************** 

    Post Ride Share btn
    
****************************************/
.post-btn-wrapper{
    margin-top: 15%;
    margin-left: auto;
    margin-right: auto;
    width: 60%
}

.post-btn {
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #F74C01;
}
</style>
