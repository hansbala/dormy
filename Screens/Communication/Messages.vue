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
        <view v-for="contact in contacts" :key="contact">
          <inbox-card :navigation="this.props.navigation" :contact="contact"></inbox-card>
        </view>
      </ScrollView>
    </nb-content>
  </nb-container>
</template>

<script>
import InboxCard from "./InboxCard.vue";
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
    };
  },
  beforeMount() {
    this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      this.contacts = await getUserContacts(
        firebaseAuth.currentUser.uid,
        () => {
          Alert.alert(
            "Failed to get user contacts for UID: " +
              firebaseAuth.currentUser.uid
          );
        }
      );
    },
  },
  components: {
    InboxCard,
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
