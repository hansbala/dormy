<template>
    <view class="container">
        <image
            class="dormy-icon"
            :source="require('../../assets/png_icons/logo.png')"
        />
        <view class="user-entry-wrapper">
            <text class="input-classifier"> Email </text>
            <text-input
                class="text-entry"
                :autoCorrect=false
                :autoCapitalize="'none'"
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
import { loginUser, verifyUserEmail } from "../../api/userAuth.js";
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
            loginUser(this.email.trim(), this.password, this.navigateHome, this.loginFailure);
        },
        // Navigates home
        navigateHome() {
            this.navigation.navigate("Home");
        },
        // Displays an alert message with the reason for failure
        loginFailure(error = 'Could not log you in :(', errorType = 'loginError') {
            // Initializing a buttons list with just the "return" or do-nothing option
            buttons = [{
                text: "Return"
                }]
            if(errorType == 'verification') { // option to re-verify email
                // Adds to front of list so that resend comes before return
                buttons.unshift({
                    text: "Resend Verification?",
                    onPress: () => verifyUserEmail(this.email),
                    style: "Send"
                })
            }
            Alert.alert(
                "Error",
                "" + error,
                 buttons, {cancelable: false}
            );
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
    width: 120;
    height: 120;
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
