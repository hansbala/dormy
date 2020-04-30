<template>
    <view class="container">
        <text> This is the roomate screen </text>

        <!-- Bottom navigation section -->
        <bottom-nav-bar 
            :searchActive=false
            :housingActive=false
            :roommateActive=true
            :rideShareActive=false
            :notifActive=false
            :navigation="this.props.navigation"></bottom-nav-bar>
    </view>
</template>

<script>
import BottomNavBar from "../Navigation/TabNavBar.vue";
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    components: {
        BottomNavBar
    }
};
</script>

<style>
.container {
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
}
</style>
