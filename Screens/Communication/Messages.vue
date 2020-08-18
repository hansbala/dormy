<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-left></nb-left>
      <nb-body>
        <nb-title>Messages</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content>
      <ScrollView>
        <view v-for="message in messages" :key="message.id">
          <message-card :messages="message"></message-card>
        </view>
      </ScrollView>
    </nb-content>
  </nb-container>
</template>

<script>
import MessageCard from "./messagesCard";
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
      messages: [],
    };
  },
  beforeMount() {
    this.fetchMessages();
  },
  methods: {
    contactOptions() {
      console.log("pressed");
    },
    async fetchMessages() {
      let res = await getUserContacts(
        firebaseAuth.currentUser.uid,
        this.postingFailed
      );
      this.messages = res;
      console.log(this.messages);
    },
    postingFailed() {
      Alert.alert("Failed to fetch contacts", "Error: " + errorMessage, {
        cancelable: false,
      });
    },
  },
  components: {
    MessageCard,
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
