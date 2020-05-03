<template>
    <view class="container">
        <text> This is the messages screen </text>

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
