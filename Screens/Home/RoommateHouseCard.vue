<template>
<view class="container">    
    <image
        class="img-preview"
        :source="{uri: imageLink}"
        :key="Math.floor(Math.random() * 100)"
    />
    <text> {{roommateData.realName}} </text>
</view>
</template>

<script>
export default {
    props: {
        roommateData: {
            type: Object
        },
    },
    data() {
        return {
            imageLink: 'https://picsum.photos/600/400?key=' + Math.floor(Math.random() * 1000),
        }
    },
}
</script>

<style>
.container {
    flex-direction: column;
    align-items: center;
    border-color: #eee;
    /* border-width: 1; */
    margin-right: 2;
    /* padding: 5; */
    border-radius: 10;
}
.img-preview {
    width: 150;
    height: 150;
    border-radius: 15;
    margin: 10;
    margin-right: 0;
}
</style>