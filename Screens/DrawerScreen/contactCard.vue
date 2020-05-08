<template>
    <view>
        <nb-list-item avatar>
            <touchable-opacity class="horizontal-flex" :on-press="contactClick">
                <!-- <nb-left>
                    <nb-thumbnail small :source="contacts.img"/>
                </nb-left> -->
                <nb-body>
                    <nb-text class="contact-name">{{ contacts.text }}</nb-text>
                    <nb-text class="contact-bio" :numberOfLines="1">
                        {{ contacts.note }}
                    </nb-Text>
                </nb-body>
                <!-- <nb-right>
                    <nb-text note>{{ contacts.time }}</nb-text>
                </nb-right> -->
            </touchable-opacity >
         </nb-list-item>
    </view>
</template>

<script>
import React from "react";
import { Alert } from "react-native";

export default {
    props: {
        contacts: Object,
        navigation: {
            type: Object
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
       contactClick (){
            Alert.alert(
                this.contacts.text,
                "What do you want to do with this contact?",
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
