<template>
    <nb-container class="container" :style="{ backgroundColor: '#fff' }">
        <nb-header>
            <nb-left>
                <touchable-opacity :on-press="navDrawerOpen">
                    <image class="menu-icon" :source="require('../../assets/png_icons/hamburger-nav.png')"/>
                </touchable-opacity>
            </nb-left>
            <nb-body>
                <nb-title>Get Help</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
        <nb-content class="screen-wrapper">
            <view class="logo-wrapper">
                <image
                    class="logo"
                    :source="require('../../assets/png_icons/logo.png')"
                />
                <text class="title-txt">Welcome To Dormy User Help</text>
                 <view class="txt-area-wrapper">
                    <text class="txt-area-title">
                        Please describe your issue below and a we will get back to you as soon as possible. Thank you! 
                    </text>
                    <nb-textarea  :rowSpan="8" bordered/>
                </view>
                <touchable-opacity class="submit-btn">
                    <text class="btn-txt">Submit Issue</text>
                </touchable-opacity>
            </view>
        </nb-content>
    </nb-container>
</template>


<script>
import { DrawerActions } from 'react-navigation-drawer'
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        navDrawerOpen() {
            this.navigation.dispatch(DrawerActions.toggleDrawer());
        },
    }
};
</script>

<style>
.container {
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
}

.menu-icon {
    width: 30;
    height: 30;
    padding-left: 10;
    padding-right: 10;
}

.title-txt {
    font-size: 30;
}

.logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    width: 150;
    height: 150;
}

.txt-area-wrapper {
    margin: 20;
}

.txt-area-title {
  text-align: center;
}

.submit-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20;
    width: 60%;
    border-radius: 5;
    padding: 10;
    background-color: #F74C01;
}

.btn-txt {
    color: white;
}
</style>