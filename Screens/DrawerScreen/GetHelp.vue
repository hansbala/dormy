<template>
  <nb-container class="container" :style="{ backgroundColor: '#fff' }">
    <nb-content class="screen-wrapper">
      <text class="title-txt">Need some help?</text>
      <view class="logo-wrapper">
        <view class="txt-area-wrapper">
          <text
            class="txt-area-title"
          >Please describe your issue below. We will get back to you as soon as possible. Thank you!</text>
          <nb-textarea :rowSpan="8" bordered />
        </view>
        <nb-button class="submit-btn">
          <nb-text class="btn-txt">Submit Issue</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>


<script>
import { DrawerActions } from "react-navigation-drawer";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    navToMenu() {
      this.navigation.navigate('Home');
    },
  },
};
</script>

<style>
.container {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.title-txt {
  margin-top: 30;
  margin: 10%;
  font-size: 20;
  font-weight: 600;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.txt-area-wrapper {
  margin: 10%;
}

.txt-area-title {
  text-align: center;
}

.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin-top: 20;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60;
  border-width: 1;
  border-color: #e15e5e;
  background-color: transparent;
}

.btn-txt {
  color: #e15e5e;
}
</style>