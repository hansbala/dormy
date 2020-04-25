<template>
    <view class="container">
        <view class="dormy-descriptor-wrapper">
            <image
                :style="{ width: 70, height: 70 }"
                :source="require('./assets/icon.png')"
            />
            <text class="dormy-welcomer">
                Welcome to Dormy!
            </text>
            <text class="dormy-descriptor">
                Created by college students for college students
            </text>
        </view>
        <view class="account-wrapper">
            <touchable-opacity
                :on-press="onPressSignIn"
                class="sign-in-wrapper"
            >
                <text class="sign-in-btn"> Sign In </text>
            </touchable-opacity>
            <touchable-opacity
                :on-press="onPressCreateAccount"
                class="create-acc-wrapper"
            >
                <text class="create-acc-btn"> Create Account </text>
            </touchable-opacity>
        </view>
    </view>
</template>

<script>
import { firebaseAuth } from "./environment/config.js";

export default {
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        onPressSignIn() {
            this.navigation.navigate("Login");
        },
        onPressCreateAccount() {
            this.navigation.navigate("Create Account");
        }
    }
    /*
    mounted: function() {
        firebaseAuth.onAuthStateChanged(user => {
            console.log("user authenticated");
            this.navigation.navigate("Home");
        });
    }*/
};
</script>

<style>
.container {
    background-color: #eee;
    align-items: center;
    justify-content: space-around;
    flex: 1;
}
.dormy-descriptor-wrapper {
    margin-top: 100;
    align-items: center;
    max-width: 300;
    border-radius: 10;
    background-color: #fff;
    padding: 30;
}
.dormy-welcomer {
    font-size: 22;
}
.dormy-descriptor {
    font-size: 18;
    text-align: center;
    color: #9b9b9b;
}
.sign-in-wrapper {
    background-color: orange;
    padding-left: 60;
    padding-right: 60;
    padding-top: 15;
    padding-bottom: 15;
    align-items: center;
    border-radius: 10;
}
.create-acc-wrapper {
    background-color: #fff;
    padding-left: 60;
    padding-right: 60;
    padding-top: 15;
    padding-bottom: 15;
    margin-top: 20;
    align-items: center;
    border-radius: 10;
    border-color: orange;
    border-width: 2;
}
.sign-in-btn {
    color: #fff;
    font-size: 20;
}
.create-acc-btn {
    color: orange;
    font-size: 20;
}
</style>
