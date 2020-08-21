<template>
  <view class="container">
    <view class="flex-end">
      <image class="avatar" :source="require('../../assets/Images/rmate-woman1.jpeg')" />
    </view>
    <view class="message-wrapper">
      <text class="message-text">{{ messageText }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    messageText: {
      type: String,
    },
    author: {
      type: String,
    },
    currentUser: {
      type: String,
    },
    time: {
      type: String,
    },
  },
};
</script>

<style scoped>
.container {
  flex-direction: row;
  justify-content: space-around;
  margin: 5%;
}
.flex-end {
  justify-content: flex-end;
}
.avatar {
  width: 20;
  height: 20;
  border-radius: 25px;
  padding: 4%;
}
.message-wrapper {
  background-color: #e77d7d;
  flex: 1;
  border-radius: 3px;
}
.message-text {
  padding: 4%;
}
</style>