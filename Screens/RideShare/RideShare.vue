<template>
    <view class="container">
        <view class="component-container">
            <view class="header">
                <touchable-opacity :on-press="navDrawerOpen">
                    <image class="menu-icon" :source="require('../../assets/png_icons/hamburger-nav.png')"/>
                </touchable-opacity>
                <text-input class="search-bar" placeholder="Search for rideshares"/>
            </view>

            <nb-card>
                <nb-card-item bordered>
                    <scroll-view :horizontal="true" class="ride-scroll-section" :contentContainerStyle="{alignItems: 'center', justifyContent: 'center'}">

                        <touchable-opacity class="new-ride-share-btn" :on-press="goToMakeRideShare">
                            <image class="icon" :source="require('../../assets/Icons/green-plus-sign.png')"/>
                        </touchable-opacity>

                        <touchable-opacity class="filter-btn">
                            <text class="filter-btn-txt">Location</text>
                        </touchable-opacity>

                        <touchable-opacity class="filter-btn">
                            <text class="filter-btn-txt">Date</text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: black">
                            <text style="color:white; text-align: center"> Uber </text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: #ff00bf">
                            <text style="color:white; text-align: center"> Lyft </text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: #FEC33A">
                            <text style="text-align: center"> Taxi </text>
                        </touchable-opacity>

                        <touchable-opacity  class="ride-btn" style="background-color: #89cff0 ">
                            <text style="color:white; text-align: center"> Carpool </text>
                        </touchable-opacity>
                    </scroll-view>
                </nb-card-item>

            </nb-card>

            <ScrollView>
                <view v-for="user in dataArray" :key="user.username">
                     <ride-card :user=user></ride-card>
                </view>
            </ScrollView>
        </view>
        <!-- Bottom navigation section -->
        <!-- <bottom-nav-bar :navigation="this.props.navigation"></bottom-nav-bar> -->
    </view>
</template>

<script>

import { DrawerActions } from 'react-navigation-drawer'
import BottomNavBar from "../Navigation/TabNavBar.vue";

import RideCard from './UserCard.vue';



export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data: {
        visibleItems: 1,
        dataArray: [
            {
                username: 'Katie Mac',
                img: '../../assets/Images/rmate-man1.jpeg',
                dates: {
                    postDate: '1 hr',
                    rideShareDate: '18 DEC',
                    rideShareTime: 'Morning'
                },
                location: {
                    start: 'Providence',
                    end: 'T.F. Green Airport'
                },
                numPassengers: 2,
                rideType: 'Uber',
                comment: 'Hit me up if you wanna split a ride'
            },
            {
                username: 'John Doe',
                img: '../../assets/Images/rmate-man1.jpeg',
                dates: {
                    postDate: '4 hr',
                    rideShareDate: '20 DEC',
                    rideShareTime: 'Afternoon'
                },
                location: {
                    start: 'Providence',
                    end: 'T.F. Green Airport'
                },
                numPassengers: 3,
                rideType: 'Lyft',
                comment: 'Hit me up if you wanna split a ride'
            }
        ],
    },
    methods: {
        navDrawerOpen() {
            this.navigation.dispatch(DrawerActions.toggleDrawer());
        },
        searchQuery () {
            console.log("searching");
        },
        goToMakeRideShare () {
            this.navigation.navigate("MakeRideShare");
        }
    },
    components: {
        // BottomNavBar,
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
