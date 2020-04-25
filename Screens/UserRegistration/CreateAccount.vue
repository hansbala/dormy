<!-- TODO: -->
<!-- - Autocorrect and autocapitalize on text entry -->
<!-- - return enter on keyboard goes to next entry -->
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
            <!-- <text class="input-classifier">Confirm Email</text> -->
            <!-- <text-input -->
            <!--     class="text-entry" -->
            <!--     v-bind:autoCorrect="false" -->
            <!--     v-model="confirmEmail" -->
            <!-- /> -->
            <text class="input-classifier">Password</text>
            <text-input
                class="text-entry"
                v-bind:autoCorrect="false"
                :secureTextEntry=true
                v-model="password"
            />
            <!-- <text class="input-classifier">Confirm Password</text> -->
            <!-- <text-input -->
            <!--     class="text-entry" -->
            <!--     v-bind:autoCorrect="false" -->
            <!--     :secureTextEntry=true -->
            <!--     v-model="confirmPassword" -->
            <!-- /> -->
        </view>

        <touchable-opacity :on-press="createAccountHandler" class="signup-btn">
            <text class="signup-btn-text">Create Account</text>
        </touchable-opacity>

        <touchable-opacity :on-press="goSignIn" class="signin-link">
            <text class="signin-link-text">Already have an account? </text>
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
            confirmEmail: "",
            password: "",
            confirmPassword: "",
        };
    },
    methods: {
        createAccountHandler(){
            if (this.email === "" || this.password === "") {
                // The check failed
                Alert.alert(
                    "User Registration Error",
                    "Check the details and enter it again",
                    { cancelable: false }
                );
                return;
            }
            // If firebase account creation succeeds, we execute
            // a callback, and navigate to the home screen
            firebaseAuth
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => this.navigation.navigate("Home"))
                .catch(error => {
                    console.log(error);
                    // Could not create the account, so give
                    // a popup to the user with a chance to
                    // probably sign-up again?
                    Alert.alert(
                        "User Registration Error",
                        "Failed to create your account with dormy! You may want to try again!" + error,
                        { cancelable: false }
                    );
                });
        },
        goSignIn() {
            this.navigation.navigate("Login");
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
.signup-btn {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: red;
    border-radius: 10;
    width: 100%;
    padding: 20;
}
.signup-btn-text {
    font-size: 20;
    color: #fff;
}
.signin-link {
}
.signin-link-text {
    font-size: 16;
    color: red;
}
</style>
