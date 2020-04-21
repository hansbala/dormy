<template>
    <view class="container">
        <text class="test">This is a test for Vim</text>
        <button
            :on-press="onButtonPress"
            title="Learn More"
            color="#841584"
            accessibility-label="Learn more about this purple button"
        />
    </view>
</template>

<script>
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        onButtonPress() {
            this.navigation.navigate("Start");
        }
    }
};
</script>

<style>
.test {
    font-size: 30;
    margin-top: 100;
}
</style>
