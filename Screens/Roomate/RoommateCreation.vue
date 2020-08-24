<template>
  <view class="section">
    <text class="section-descriptor">Description</text>
    <text-input
      :placeholder="'Enter a brief description here (Optional)'"
      class="description-entry-box"
    />
  </view>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
};
</script>

<style>
.section {
  margin: 40px;
  margin-bottom: 0px;
}
.section-descriptor {
  font-size: 14;
  margin-bottom: 20;
}

.description-entry-box {
  height: 50;
  border-color: #a9a9a9;
  border-width: 1;
  border-radius: 5;
  padding: 2;
}
</style>