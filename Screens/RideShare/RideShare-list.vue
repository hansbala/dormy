<template>
    <view class="container">
        <nb-container>
            <nb-header class="header-wrapper">
                <view class="horizontal-flex">
                     <nb-button  class="left-arrow" :on-press="goToRideShare" light>
                        <image class="icon" :source="require('../../assets/Icons/Arrow-left.png')"/>
                    </nb-button> 
                    <view class="header-text"> 
                        <nb-text >Schedule Your Ride</nb-text>
                    </view>
                    
                    <nb-button  class="info-btn" :on-press="increaseRiders" light>
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
                                <text-input class="destination-input" placeholder="Enter Pickup" />
                            </view>
                            <view class="vertical-flex">
                                <text class="card-heading">To</text>
                                <text-input class="destination-input" placeholder="Enter Destination" />
                            </view> 
                        </view>
                    </nb-card-item>

                    <!-- Card Item For Departure Date -->
                    <nb-card-item bordered class="card-item">
                        <view class="horizontal-flex">
                            <view class="vertical-flex">
                                <text class="card-heading">Departure</text>
                                <!-- When Refactoring make this a component!!! -->
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
                                        :selectedValue="timeValue"
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

                                    <text class="num-riders">{{numberOfRiders}}</text>

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
                                <touchable-opacity :on-press="decreaseRiders" class="ride-btn" style="background-color: black">
                                    <text style="color:white; text-align: center"> Uber </text>
                                </touchable-opacity>

                                <touchable-opacity :on-press="decreaseRiders" class="ride-btn" style="background-color: #ff00bf">
                                    <text style="color:white; text-align: center"> Lyft </text>
                                </touchable-opacity>

                                 <touchable-opacity :on-press="decreaseRiders" class="ride-btn" style="background-color: #FEC33A">
                                    <text style="text-align: center"> Taxi </text>
                                </touchable-opacity>

                                 <touchable-opacity :on-press="decreaseRiders" class="ride-btn" style="background-color: #89cff0 ">
                                    <text style="color:white; text-align: center"> Carpool </text>
                                </touchable-opacity>
                            </scroll-view>
                        </view>
                    </nb-card-item>
                
                    <nb-card-item class="card-item">
                        <nb-form class="text-area">
                            <view class="vertical-flex">
                                <text class="card-heading">Comments or Additional Details</text>
                                <nb-textarea  :rowSpan="5" bordered/>
                            </view>
                        </nb-form>
                    </nb-card-item>
                </nb-card>


                <!-- Bottom Post Ride Share Button -->
                <view class="post-btn-wrapper">
                    <nb-button class="post-btn" :on-press="goToRideShare">
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
import BottomNavBar from "../Navigation/TabNavBar.vue";
import moment from 'moment'
export default {
    data () {
        return { 
            defaultDate: new Date(),
            minimumDate: new Date(),
            maximumDate: new Date('2020-12-31'),
            chosenFromDate:  new Date(),
            chosenReturnDate: new Date(),
            numberOfRiders: 1,
            timeValue: '',
            times: this.generateTimes()
        }
    },
    props: {
        navigation: {
            type: Object
        }
    },
    components: {
        BottomNavBar
    },
    methods: {
        formatFromDate: function(date) {
           this.chosenFromDate = moment(date).format("MMM Do");
           return this.chosenFromDate
        },
        formatReturnDate: function(date) {
            this.chosenReturnDate = moment(date).format("MMM Do");
            return this.chosenReturnDate
        },
        setFromDate: function(newDate) {
            this.chosenFromDate = newDate;
        },
        setReturnDate: function(newDate) {
            this.chosenReturnDate = newDate;
        },
        increaseRiders: function () {
            if(this.numberOfRiders == 8) {
                return;
            } else{
                this.numberOfRiders ++;
            }
        },
        decreaseRiders: function() {
            if(this.numberOfRiders == 0){
                return;
            }else{
                this.numberOfRiders --;
            }
        },
        onTimeChange: function (time) {
            this.timeValue = time;
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
        goToRideShare () {
            this.navigation.navigate("FindRideShare");
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
