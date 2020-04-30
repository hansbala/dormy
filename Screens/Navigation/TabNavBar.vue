<template>
    <view class="navbar-tabs-wrapper">
        <touchable-opacity :on-press="goHome" class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="searchActive? 
                    require('../../assets/png_icons/navbar/search-active.png')
                    :
                    require('../../assets/png_icons/navbar/search-inactive.png')"
            />
        </touchable-opacity>
        <touchable-opacity :on-press="goHousing" class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="housingActive? 
                    require('../../assets/png_icons/navbar/housing-active.png')
                    :
                    require('../../assets/png_icons/navbar/housing-inactive.png')"
            />
        </touchable-opacity>
        <touchable-opacity :on-press="goRoomate" class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="roommateActive? 
                    require('../../assets/png_icons/navbar/roommates-active.png')
                    :
                    require('../../assets/png_icons/navbar/roommates-inactive.png')"
            />
        </touchable-opacity>
        <touchable-opacity :on-press="goRideShare" class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="rideShareActive? 
                    require('../../assets/png_icons/navbar/carpool-active.png')
                    :
                    require('../../assets/png_icons/navbar/carpool-inactive.png')"
            />
        </touchable-opacity>
        <touchable-opacity :on-press="goMessages" class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="notifActive? 
                    require('../../assets/png_icons/navbar/notif-active.png')
                    :
                    require('../../assets/png_icons/navbar/notif-inactive.png')"
            />
        </touchable-opacity>
    </view>
</template>

<script>
export default {
    props: {
        navigation: {
            type: Object
        },
        searchActive: true,
        housingActive: false,
        roommateActive: false,
        rideShareActive: false,
        notifActive: false,
    },
    methods: {
        goHome() {
            this.navigation.navigate("Home");
        },
        goHousing() {
            this.navigation.navigate("Housing");
        },
        goRideShare() {
            this.navigation.navigate("RideShare");
        },
        goRoomate() {
            this.navigation.navigate("Roomate");
        },
        goMessages() {
            this.navigation.navigate("Messages");
        },
    }
};
</script>

<style>
.navbar-tabs-wrapper {
    flex-direction: row;
    justify-content: space-around;
    padding: 25;
}
.icon-wrapper {
    justify-content: center;
    align-items: center;
}
.icon {
    width: 30;
    height: 30;
}
</style>
