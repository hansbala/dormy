<template>
<view>    
    <image
        class="img-preview"
        :source="{uri: cardData.imagePath}"
        :key="Math.floor(Math.random() * 100)"
    />
</view>
</template>

<script>
export default {
    props: {
        cardData: {
            type: Object
        },
    }
}
</script>

<style>
.img-preview {
    width: 150;
    height: 150;
    border-radius: 15;
    margin: 10;
    margin-right: 0;
}
</style>