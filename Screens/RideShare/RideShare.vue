<template>
    <view class="container">
        <view class="component-container">
            <view class="header">
                <touchable-opacity :on-press="navDrawerOpen">
                    <image class="menu-icon" :source="require('../../assets/png_icons/hamburger-nav.png')"/>
                </touchable-opacity>
                <text-input class="search-bar" placeholder="Search for rideshares" v-model="searchString"/>
            </view>

            <nb-card>
                <nb-card-item bordered>
                    <scroll-view :horizontal="true" class="ride-scroll-section" :contentContainerStyle="{alignItems: 'center', justifyContent: 'center'}">

                        <touchable-opacity class="new-ride-share-btn" :on-press="goToMakeRideShare">
                            <image class="icon" :source="require('../../assets/png_icons/green-plus-sign.png')"/>
                        </touchable-opacity>

                        <!-- <touchable-opacity class="filter-btn">
                            <text class="filter-btn-txt">Location</text>
                        </touchable-opacity> -->

                        <touchable-opacity class="filter-btn" :on-press="sortByDate">
                            <text class="filter-btn-txt">Date</text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: black" :on-press="() => changeRideType('Uber')">
                            <text style="color:white; text-align: center"> Uber </text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: #ff00bf" :on-press="() => changeRideType('Lyft')">
                            <text style="color:white; text-align: center"> Lyft </text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: #FEC33A" :on-press="() => changeRideType('Taxi')">
                            <text style="text-align: center"> Taxi </text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: #89cff0" :on-press="() => changeRideType('Carpool')">
                            <text style="color:white; text-align: center"> Carpool </text>
                        </touchable-opacity>
                    </scroll-view>
                </nb-card-item>

            </nb-card>

            <ScrollView>
                <RefreshControl
                    :refreshing="refreshing"
                    :onRefresh="_onRefresh"
                    :title="'Fetching rideshare posts...'"
                />
                <view v-for="post in filteredPosts" :key="post.id">
                    <ride-card :post=post></ride-card>
                </view>
            </ScrollView>
        </view>
    </view>
</template>

<script>
import { RefreshControl } from 'react-native';
import BottomNavBar from "../Navigation/TabNavBar.vue";
import { firebaseAuth } from "../../environment/config.js";
import { getRideshares } from "../../api/rideshareApi.js";
import RideCard from './UserCard.vue';
import { firebaseStore } from "../../environment/config.js";

import moment from 'moment'

export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data: {
        dataArray: [],
        searchString: '',
        rideType: '',
        dateSort: true, //True:newest->oldest false: oldest->newest
        refreshing: false
    },
    mounted () {
        this.fetchRideshares();
    },
    methods: {
        async fetchRideshares() {
            let res = await getRideshares();
            this.dataArray = res.sort((a, b) => {
                return new Date(b.dates.longDate) - new Date(a.dates.longDate)
            })
        },
        navDrawerOpen() {
            this.navigation.openDrawer();
        },
        goToMakeRideShare () {
            this.navigation.navigate("MakeRideShare");
        },
        changeRideType (type) {
            console.log(type);
            if (type == this.rideType) {
                this.rideType = ''
                console.log(this.rideType);
            }else{
                this.rideType = type;
                console.log(this.rideType);
            }
        },
        sortByDate(){
            if(this.dateSort){
                this.dataArray.sort((a, b) => {
                    return new Date(b.dates.longDate) - new Date(a.dates.longDate)
                })
                // console.log( this.dataArray.sort((a, b) => {
                //     return new Date(b.data.dates.postedDate) - new Date(a.data.dates.postedDate)
                // }));
                this.dateSort = !this.dateSort;
                // console.log("newest-oldest: ", this.dataArray);
            }else{
                this.dataArray = this.dataArray.sort((a, b) => {
                    return new Date(a.dates.longDate) - new Date(b.dates.longDate)
                });
                this.dateSort = !this.dateSort;
                console.log("oldest-newest: ", this.dataArray);
            }    
        },
        _onRefresh() {
            this.refreshing = true;
            this.fetchRideshares();
            this.refreshing = false;
        }

    },
    computed: {
        filteredPosts () {
            return this.dataArray.filter((post) => {
                return ((post.username.match(this.searchString)|| post.location.pickup.match(this.searchString)) ||  post.location.dropoff.match(this.searchString)) && (post.rideType.match(this.rideType))
            })   
        },
    },
    components: {
        RideCard
    }
};
</script>

<style>
/*************************************** 

    General Overall Styling

****************************************/
.container {
    height: 100%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;;
}

.component-container {
    flex: 1;
}

.icon {
    width: 15;
    height: 15;
}

.horizontal-flex {
    display: flex;
    flex-direction: row;
}

.vertical-flex {
    display: flex;
    flex-direction: column;
    flex: 1;
}

/*************************************** 

    Header Styling

****************************************/
.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.menu-icon {
    width: 30;
    height: 30;
    padding-left: 10;
    padding-right: 10;
}

.search-bar {
    border-width: 1;
    margin-left: 10;
    padding-left: 10;
    height: 35;
    width: 80%;
    border-radius: 5;
    border-color: gray;
}

/*************************************** 

    Ride Share Scrollable Filter

****************************************/
.ride-scroll-section {
    flex: 1;
    height: 30;
}


.ride-btn {
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 10;
    margin: 5;
    width: 90;
    height: 35;
}

.new-ride-share-btn {
    border-width: 2;
    border-color: green;
    border-radius: 5;
    height: 25;
    width: 25;
    padding: 3;
}

/*************************************** 

    Additional Scrollable Filters

****************************************/
.filter-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.filter-btn {
    display: flex;
    justify-content: center;
    border-width: 2;
    border-color: #F74C01;
    border-radius: 5;
    height: 30;
    width: 100;
    margin: 10;
}

.filter-btn-txt {
    text-align: center;
    color: #F74C01;
}

</style>
