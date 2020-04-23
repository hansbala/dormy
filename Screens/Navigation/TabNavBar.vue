<template>
    <view class="navbar-tabs-wrapper">
        <touchable-opacity :on-press="goHome" class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="require('../../assets/navbar_icons/search.png')"
            />
        </touchable-opacity>
        <touchable-opacity class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="require('../../assets/navbar_icons/house.png')"
            />
        </touchable-opacity>
        <touchable-opacity class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="require('../../assets/navbar_icons/roomates.png')"
            />
        </touchable-opacity>
        <touchable-opacity class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="require('../../assets/navbar_icons/car.png')"
            />
        </touchable-opacity>
        <touchable-opacity class="icon-wrapper">
            <image
                class="icon icon-active"
                :source="require('../../assets/navbar_icons/bell.png')"
            />
        </touchable-opacity>
    </view>
</template>

<script>
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        goHome() {
            this.navigation.openDrawer();
        }
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
