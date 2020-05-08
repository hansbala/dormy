<template>
    <view>
        <touchable-opacity class="card" :on-press="cardClick">
            <view class="card-header">
                <view class="horizontal-flex card-header-image">
                    <image class="user-photo" :source="require('../../assets/Images/rmate-man1.jpeg')"/>
                    <text>{{post.username}}</text>
                </view>
                <view class="horizontal-flex card-header-date"> 
                    <text>{{post.dates.postedDate}}</text>
                </view>
            </view>

            <view class="card-item">
                <text class="emphasis">{{post.location.pickup}}</text>
                <text class="low-emphasis">To</text>
                <text class="emphasis">{{post.location.dropoff}}</text>
            </view>

            <view class="card-item last-item">
                <view class="horizontal-flex" style="flex: 1">
                    <image class="icon" :source="require('../../assets/Icons/cal-sched.png')"/>
                    <text class="icon-text">{{post.dates.rideShareDate}}</text>
                </view>

                <view class="horizontal-flex" style="flex: 1 ">
                    <image class="icon" :source="require('../../assets/Icons/time.png')"/>
                    <text class="icon-text">{{post.dates.rideShareTime}}</text>
                </view>

                <view class="horizontal-flex" style="flex: 1">
                    <image class="icon" :source="require('../../assets/Icons/Nav-bar/roommates-inactive.png')"/>
                    <text class="icon-text">{{post.numPassengers}}</text>
                </view>
            </view>
            
            <view class="card-item"> 
                <view>
                    <text class="emphasis">Description:</text>
                    <text class="comment">{{post.comment}}</text>
                </view>
            </view>

            <view class="card-item"> 
                <view class="vertical-flex">
                    <text class="emphasis">RideType:</text>
                    <view class="ride-type">
                        <text>{{post.rideType}}</text>
                    </view>
                </view>
            </view>
        </touchable-opacity>
    </view>
</template>

<script>
import React from "react";
import { Alert } from "react-native";

export default {
    props: {
        post: Object,
        navigation: {
            type: Object
        }
    },
    data () {
        return {
            username: '',
        } 
    },
    methods: {
        cardClick () {
            Alert.alert(
                "Schedule Rideshare?",
                "Do you want to share a ride with " + this.post.username + "?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { 
                        text: "Okay", onPress: () => {
                            let data = {
                                username: this.post.username,
                                profilepic: '',
                                dates: {
                                    postedDate: this.post.dates.postedDate,
                                    rideShareDate: this.post.rideShareDate,
                                    rideShareTime: this.post.rideShareTime
                                },
                                location: {
                                    pickup: this.post.location.pickup,
                                    dropoff: this.post.location.dropoff,
                                },
                                numPassengers: this.post.numPassengers,
                                rideType: this.post.rideType,
                            }
                            // Post Data to the database!!
                        }
                    }
                ],
                { cancelable: false }
            );
            
        },
    },
    components: {
       
    }

};  
</script>


<style>
.horizontal-flex {
    display: flex;
    flex-direction: row;
}

.vertical-flex {
    display: flex;
    flex-direction: column;
}



/*************************************** 

   Card Styling

****************************************/
.card {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10px;
    border-width: 1;
    border-radius: 5;
    border-color: #ededed;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ededed;
    padding: 5;
}

.card-header-image {
    flex: 3;
    align-items: center;
}

.card-header-date {
    justify-content: flex-end;
    margin-right: 5;
}

.user-photo{
    width: 35;
    height: 35;
    border-radius: 200;
    margin-left: 10;
    margin-right: 10;
}

.card-item {
    display: flex;
    flex-direction: row;
    margin-left: 30;
    margin-top: 10;
}

.last-item {
    margin-bottom: 10;
}

.icon {
    width: 15;
    height: 15;
}

.emphasis {
    color: #F74C01;
    margin: 5;
}

.low-emphasis {
    color: #696969;
    margin: 5;
}

.icon-text{
    margin-left: 5;
    font-size: 12;
}

.comment {
    margin-left: 5;
}

.ride-type {
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-color: #F74C01; */
    border-radius: 5;
    border-width: 1;
    padding: 5;
    margin-bottom: 10;
}
</style>

