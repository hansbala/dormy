<template>
    <nb-container class="container" :style="{ backgroundColor: '#fff' }">
        <nb-header>
            <nb-left>
                <touchable-opacity :on-press="navDrawerOpen">
                    <image class="menu-icon" :source="require('../../assets/png_icons/hamburger-nav.png')"/>
                </touchable-opacity>
            </nb-left>
            <nb-body>
                <nb-title>Settings</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
        <nb-content class="screen-wrapper">
            <view class="logo-wrapper">
                <image
                    class="logo"
                    :source="require('../../assets/png_icons/logo.png')"
                />
                <text class="title-txt">Account Settings</text>
                 
                <view class="data">
                    <view class="data-feild">
                        <view class="horizontal-flex">
                            <text class="input-heading">Username:</text>
                            <text class="currentVal">{{userData.realName}} </text>
                        </view>

                        <text-input class="input-field" placeholder="Enter New Username" v-model="username"></text-input>
                    </view>
                    
                    <view class="data-feild">
                        <view class="horizontal-flex">
                            <text class="input-heading">Password:</text>
                            <text class="currentVal">******</text>
                        </view>
                        <text-input class="input-field" placeholder="Enter New Password"  :secureTextEntry=true v-model="password"> </text-input>
                    </view>

                    <!-- <view class="data-feild">
                        <text class="input-heading">Profile Image:</text>
                    </view> -->

                    <view class="data-feild">
                        <text class="input-heading">Bio:</text>
                        <text class="currentVal">{{userData.bio}}</text>
                        <nb-textarea  placeholder="This would be a prop value" :rowSpan="5" bordered  v-model="bio"/>
                    </view>
                </view>

                <touchable-opacity class="submit-btn">
                    <text class="btn-txt" :on-press="updateChanges">Submit Changes</text>
                </touchable-opacity>
            </view>
        </nb-content>
    </nb-container>
</template>


<script>
import { DrawerActions } from 'react-navigation-drawer'
import { firebaseAuth } from "../../environment/config.js";
import { getUserData } from '../../api/settingsApi.js';
import { updateUserData } from '../../api/settingsApi.js';


export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data () {
        return {
            userData: Object,
            username: '',
            password: '',
            bio: '',
        }
    },
    mounted () {
        this.fetchUserData();
    },
    methods: {
        navDrawerOpen() {
            this.navigation.dispatch(DrawerActions.toggleDrawer());
        },
        async fetchUserData() {
            let res = await getUserData(firebaseAuth.currentUser.uid, this.postFailed);
            this.userData = res;
            console.log(this.userData);
        },
        postingFailed() {
            Alert.alert(
                "Failed to fetch contacts",
                "Error: " + errorMessage,
                { cancelable: false }
            );
        },
        updateChanges () {
            if(this.username != ''){

            }else {
                this.username = this.userData.realName;
            }
            updateUserData(firebaseAuth.currentUser.uid, this.username);
            
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

.horizontal-flex {
    display: flex;
    flex-direction: row;
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
    width: 100;
    height: 100;
}

.data{
    width: 80%;
    margin-top: 20;
}

.data-feild {
    margin-bottom: 20;
}

.input-heading {
    color: #F74C01;
    margin-bottom: 5;
    font-size: 16;
}

.currentVal {
    color: black;
    font-size: 16;
    margin-left: 5;
}

.input-field{
    border-width: 1;
    border-radius: 3;
    border-color: gray;
    width: 90%;
    padding: 10;
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