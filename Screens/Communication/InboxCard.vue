<template>
  <view>
    <nb-list-item avatar>
      <touchable-opacity class="horizontal-flex" :on-press="inboxClicked">
        <nb-left>
          <!-- TODO: Change the source URI of this to this.contactDetails.avatarLink -->
          <nb-thumbnail :source="require('../../assets/Images/rmate-man1.jpeg')"></nb-thumbnail>
        </nb-left>
        <nb-body class="flex">
          <nb-text class="contact-name">{{ contactDetails.firstName }}</nb-text>
          <nb-text
            :numberOfLines="1"
            class="msg-preview"
          >{{ contactDetails.lastMessage.messageText }}</nb-text>
        </nb-body>
        <nb-right>
          <!-- TODO: Unread message indicator -->
          <nb-text note>{{ contactDetails.lastMessage.timestamp }}</nb-text>
        </nb-right>
      </touchable-opacity>
    </nb-list-item>
  </view>
</template>

<script>
import React from "react";
import { getContactDetails } from "../../api/contactsApi.js";
import { getCurrentUID } from "../../api/userAuth.js";
import { getRecentMessages } from "../../api/messagingApi.js";
export default {
  props: {
    contact: {
      type: String,
    },
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      contactDetails: {
        firstName: "",
        lastName: "",
        lastMessage: {
          messageText: "Loading....",
          timestamp: "00:00",
        },
        realName: "",
        // In the next version, the avatar will be directly linked to HTML
        // instead of being hardcoded
        avatarLink: "../../assets/Images/rmate-man1.jpeg",
      },
    };
  },
  beforeMount() {
    this.getContactDetails();
    this.getLastMessage(this.contact);
  },
  methods: {
    async getContactDetails() {
      await getContactDetails(this.contact)
        .then((doc) => {
          if (doc.exists) {
            let temp = doc.data();
            this.contactDetails.firstName = temp.realName.split(" ")[0];
            this.contactDetails.lastName = temp.realName.split(" ")[1];
            // Will be undefined if the avatar link does not exist
            // this.contactDetails.avatarLink = temp.avatarLink;
          }
        })
        .catch((err) => {
          console.log("failed to retrieve contact details of: " + contact);
        });
    },
    async getLastMessage(contactUID) {
      let lastMessagePromise = getRecentMessages(
        contactUID,
        getCurrentUID(),
        1,
        null
      ).then((messages) => {
        // Only update the last message if we receive more than 1 message
        if (messages.length > 0) {
          this.contactDetails.lastMessage.messageText = messages[0].message;
          // Convert the date/time object into 12 hour time
          this.contactDetails.lastMessage.timestamp = messages[0].timestamp
            .toDate()
            .toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
        }
      });
    },
    inboxClicked() {
      // Navigate to the respective inbox
      this.navigation.navigate("Inbox", {
        contactUID: this.contact,
      });
    },
  },
};
</script>

<style scoped>
.horizontal-flex {
  display: flex;
  flex-direction: row;
}
.contact-name {
  color: #595555;
  /* margin-bottom: 3; */
  font-size: 18;
  font-weight: bold;
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>