<template>
  <nb-container>
    <nb-header>
      <nb-left>
        <!-- <nb-button transparent>
          <Icon name="chevron-left" />
        </nb-button>-->
        <touchable-opacity :on-press="goBack">
          <image class="back-btn" :source="require('../../assets/iconsv2/back-button.png')" />
        </touchable-opacity>
      </nb-left>
      <nb-body>
        <nb-title>{{ contactDetails.firstName }}</nb-title>
      </nb-body>
      <nb-right>
        <nb-button transparent>
          <Icon name="ellipsis-h" :style="{'color': 'orange'}" size="20" />
        </nb-button>
      </nb-right>
    </nb-header>
    <!-- Our messages should flow in this scroll view -->
    <scroll-view class="scrollable-messages" :snapToAlignment="'end'">
      <view v-for="message in messages" :key="message.id">
        <individual-message
          :messageText="message.message"
          :author="message.author"
          :time="message.timestamp"
        ></individual-message>
      </view>
    </scroll-view>
    <!-- This contains the message input and the send button.
    This remains stuck to the bottom;
    We also need to add the keyboard avoiding view
    otherwise the keyboard covers the input and the user
    will not be able to see what is being typed-->
    <!-- TODO: Android - Might need to change behavior to null
    Documentation: https://reactnative.dev/docs/keyboardavoidingview.html-->
    <KeyboardAvoidingView :behavior="'padding'">
      <view class="user-input-bar">
        <text-input
          :placeholder="'Write a message..'"
          class="message-composer"
          v-model="sendMessageText"
        />
        <touchable-opacity class="send-btn" :on-press="onPressSend">
          <image class="send-icon" :source="require('../../assets/iconsv2/send-message.png')" />
        </touchable-opacity>
      </view>
    </KeyboardAvoidingView>
  </nb-container>
</template>

<script>
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import IndividualMessage from "./Message.vue";
import { getUserNameFromUID } from "../../api/userAuth.js";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  components: {
    SafeAreaView,
    Icon,
    KeyboardAvoidingView,
    IndividualMessage,
  },
  data() {
    return {
      contactDetails: {
        firstName: "",
        lastName: "",
        contactUID: "",
      },
      messages: [
        {
          author: "Mary Poppins",
          message: "Hey Hans! Nice meeting you! My name is mary Poppins!",
          timestamp: "18 Aug 2:32 PM",
          id: "aaa",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
        {
          author: "Hans Bala",
          message: "Hey Mary! I loved you in your movie!",
          timestamp: "19 Aug 12:04 AM",
          id: "bbb",
        },
      ],
      sendMessageText: "",
    };
  },
  async created() {
    this.contactDetails.contactUID = this.navigation.getParam("contactUID");
    let temp = await getUserNameFromUID(this.contactDetails.contactUID);
    this.contactDetails.firstName = temp.split(" ")[0];
    this.contactDetails.lastName = temp.split(" ")[1];
  },
  beforeMount() {
    // Fetch like 50 messages
  },
  methods: {
    onPressSend() {
      // TODO: handle sending a message in here
    },
    goBack() {
      this.navigation.goBack();
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.back-btn {
  width: 20px;
  height: 20px;
}
.user-input-bar {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10;
  border-top-color: black;
}
.message-composer {
  flex: 1;
  border-width: 1px;
  border-color: #c4c4c4;
  border-radius: 17px;
  padding: 15px;
}
.send-btn {
  padding: 10px;
}
.send-icon {
  width: 30px;
  height: 30px;
}
</style>