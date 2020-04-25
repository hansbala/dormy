<template>
    <view class="container">
        <image
            class="dormy-icon"
            :source="require('../../assets/icon.png')"
        />
        <view class="user-entry-wrapper">
            <text class="input-classifier"> Email </text>
            <text-input
                class="text-entry"
                :autoCorrect=false
                v-model="email"
            />
            <text class="input-classifier">Password</text>
            <text-input
                class="text-entry"
                v-bind:autoCorrect="false"
                :secureTextEntry=true
                v-model="password"
            />
        </view>

        <touchable-opacity :on-press="loginHandler" class="signin-btn">
            <text class="signin-btn-text">Sign In</text>
        </touchable-opacity>

        <touchable-opacity :on-press="goCreateAccount" class="signup-link">
            <text class="signup-link-text">Don't have an Account?</text>
        </touchable-opacity>
    </view>
</template>

<script>
import { Alert } from "react-native";
import { firebaseAuth } from "../../environment/config.js";
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        loginHandler(){
            firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    // Successfully logged the user in
                    this.navigation.navigate("Home");
                })
                .catch(error => {
                    // Could not create the account, so give
                    // a popup to the user with a chance to
                    // probably sign-in again?
                    Alert.alert(
                        "User Registration Error",
                        "Failed to create your account with dormy! You may want to try again!" + error,
                        { cancelable: false }
                    );
                });
        },
        goCreateAccount() {
            this.navigation.navigate("Create Account");
        },
    }
};
</script>

<style>
.container {
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    margin: 50;
}
.dormy-icon {
    width: 70;
    height: 70;
}
.user-entry-wrapper {
}
.text-entry {
    width: 300;
    height: 50;
    border-color: #a9a9a9;
    border-width: 1;
    border-radius: 10;
    font-size: 14;
    padding: 5;
}
.input-classifier{
    color: #696969;
    font-size: 16;
    font-weight: bold;
    margin-top: 10;
    margin-bottom: 10;
}
.signin-btn {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: red;
    border-radius: 10;
    width: 100%;
    padding: 20;
}
.signin-btn-text {
    font-size: 20;
    color: #fff;
}
.signup-link {
}
.signup-link-text {
    font-size: 16;
    color: red;
}
</style>
