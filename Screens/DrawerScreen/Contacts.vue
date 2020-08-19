<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-left>
        <touchable-opacity :on-press="navDrawerOpen">
          <image class="menu-icon" :source="require('../../assets/iconsv2/arrow-left.png')" />
        </touchable-opacity>
      </nb-left>
      <nb-body>
        <nb-title>Contacts</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content>
      <ScrollView>
        <view v-for="contact in contacts" :key="contact.id">
          <contact-card :contacts="contact"></contact-card>
        </view>
      </ScrollView>
    </nb-content>
  </nb-container>
</template>

<script>
import { DrawerActions } from "react-navigation-drawer";
import ContactCard from "./contactCard";
import { getUserContacts } from "../../api/contactsApi.js";
import { firebaseAuth } from "../../environment/config.js";
import { Alert } from "react-native";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      contacts: [],
      //     contacts: [
      //         {
      //             img: testimg,
      //             text: " Pratik",
      //             note: "Its time to build a difference . .",
      //             time: "3:43 pm",
      //             id: 1
      //         },
      //         {
      //             img: testimg,
      //             text: "Kumar Sanket",
      //             note: "One needs courage to be happy and smiling all time . . ",
      //             time: "1:12 pm",
      //             id: 2
      //         },
      //         {
      //             img: testimg,
      //             text: "Megha",
      //             note: "Live a life style that matchs your vision",
      //             time: "10:03 am",
      //             id: 3
      //         },
      //         {
      //             img: testimg,
      //             text: "Atul Ranjan",
      //             note: "Failure is temporary, giving up makes it permanent",
      //             time: "5:47 am",
      //             id: 4
      //         },
      //         {
      //             img: testimg,
      //             text: "Saurabh Sahu",
      //             note: "The biggest risk is a missed opportunity !!",
      //             time: "11:11 pm",
      //             id: 5
      //         },
      //         {
      //             img: testimg,
      //             text: "Varun Sahu",
      //             note: "Wish I had a Time machine . .",
      //             time: "8:54 pm",
      //             id: 6
      //         },

      //     ]
    };
  },
  mounted() {
    this.fetchContacts();
  },
  methods: {
    navDrawerOpen() {
      this.navigation.dispatch(DrawerActions.toggleDrawer());
    },
    contactOptions() {
      console.log("pressed");
    },
    async fetchContacts() {
      let res = await getUserContacts(
        firebaseAuth.currentUser.uid,
        this.postingFailed
      );
      this.contacts = res;
      console.log(this.contacts);
    },
    postingFailed() {
      Alert.alert("Failed to fetch contacts", "Error: " + errorMessage, {
        cancelable: false,
      });
    },
  },
  components: {
    ContactCard,
  },
};
</script>

<style >
.menu-icon {
  width: 30;
  height: 30;
  padding-left: 10;
  padding-right: 10;
}
</style>
