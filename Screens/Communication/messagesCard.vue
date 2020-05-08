<template>
    <view>
        <nb-list-item avatar>
            <touchable-opacity class="horizontal-flex" :on-press="contactClick">
                <nb-left>
                    <nb-thumbnail small :source="testimg"/>
                </nb-left>
                <nb-body>
                    <nb-text class="contact-name">{{ messages.text }}</nb-text>
                    <nb-text class="contact-bio" :numberOfLines="1">
                        {{ messages.note }}
                    </nb-Text>
                </nb-body>
                <nb-right>
                    <nb-text note>{{ messages.time }}</nb-text>
                </nb-right>
            </touchable-opacity >
         </nb-list-item>
    </view>
</template>

<script>
import React from "react";
import { Alert } from "react-native";
import testimg from "../../assets/Images/rmate-man1.jpeg";

export default {
    props: {
        messages: Object,
        navigation: {
            type: Object
        }
    },
    data () {
        return {
            testimg: testimg,
        }
    },
    methods: {
       contactClick (){
            Alert.alert(
                this.messages.text,
                "What do you want to do with this message?",
                [
                    { 
                        text: "Visit Contact Profile", onPress: () => {
                           console.log("Visit Page");
                        }
                    },
                    {
                        text: "Delete User from Contacts",
                        onPress: () => {
                            Alert.alert(
                                "Delete Contact",
                                "Are you sure? This action is not reversible!",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => console.log("User Deleted"),
                                        
                                    }
                                ]
                            )
                        },  
                    },
                    {
                        text: "Cancel",
                        onPress: () => {
                            console.log("cancled")
                        },
                        style: 'cancel'
                    },
                ],
                { cancelable: false }
            );
       }
    }
};
</script>

<style >
.horizontal-flex {
    display: flex;
    flex-direction: row;
}

.list-item {
    display: flex;
    flex-direction: row;
}

.contact-name{
    color: #F74C01;
    margin-bottom: 3;
    font-weight: bold;
}
</style>
