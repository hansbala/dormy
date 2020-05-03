<template>
    <view class="container">
        <!-- Header Bar -->
        <view class="header-bar">
            <image
                class="menu-icon"
                :source="require('../../assets/png_icons/hamburger-nav.png')"
            />

            <text class="header-text"> Find Roommates </text>
            <image
                class="matches-icon"
                :source="require('../../assets/Icons/heart-inactive.png')"
            />
        </view>

         <!-- Roommate Card -->
         <view class="card">
            <image
                class="Roommate-image"
                :source="require('../../assets/Images/rmate-woman1.jpeg')"
            />
            <view class="roommate-block" >
            </view>

            <view class="roommate-info" >
                <text class= "Roommate-name">
                    Maddie
                </text>
                <text class= "Roommate-bio">Clean, Easy going, Virgo
                    Looking to share 2 bd Apartment...
                </text>
            </view>
         </view>

        <!-- Matching options -->
        <view class="roommate-select">
            <view class="matching-container">
                <image
                    class="thumbsUp-icon"
                    :source="require('../../assets/Icons/thumbs-up.png')"
                />
                <image
                    class="superLike-icon"
                    :source="require('../../assets/Icons/heart-active.png')"
                />
                <image
                    class="thumbsDown-icon"
                    :source="require('../../assets/Icons/thumbs-down.png')"
                />
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    components: {
        
    }
};
</script>

<style>
.container {
    height: 100%;
    padding-top: 30;
     flex-direction: column;
     justify-content: space-between;
 }
 .header-wrapper {
     flex-direction: row;
     margin-top: 50;
     margin-left: 20;
     margin-right: 20;
 }

 .menu-icon {
     width: 30;
     height: 30;
     margin-top: 20;
     margin-left: 15;
 }

 .matches-icon{
    width: 25;
    height: 25;
    margin-top: 20;
    margin-left: 20%;
 }

 .header-bar{
    display: flex;
    flex-direction: row;
 }

 .header-text{
 color: #2a2a2a;
 font-weight: 500;
 font-size: 17;
 padding-left:15%;
 margin-top: 20;
 }

 .card{
 flex:3;
 background-color: white;
 margin: 20;
 margin-top: 20;
 margin-bottom: 5;
 border-radius: 20px;
 border-color: #a9a9a9;
 border-width: 1;

 }

 .roommate-select{
 flex:0.5;
 background-color: white;
 margin: 20;
 margin-top: 10;
 margin-bottom:10;
 border-radius: 10px;
 border-color: #a9a9a9;
 border-width: 1;

 }

 .matching-container{
 flex-direction: row;
 }

 .thumbsUp-icon{
 width:38px;
 height:35px;
 align-items:flex-start;
 margin-left: 10%;
 margin-Top: 12px;
 }

 .superLike-icon{
 width:35px;
 height:30px;
 align-items: center;
 justify-content: space-evenly;
 margin-left: 23%;
 margin-right:23%;
 margin-Top: 18px;

 }

 .thumbsDown-icon{
 width:38px;
 height:35px;
 justify-content: space-evenly;
 margin-Top: 15px;

 }

 .Roommate-image{
 width:auto;
 height:400px;
 border-radius: 10px;
 }
 .Roommate-name{
 font-size: 35;
 margin-top:-125;
 margin-left: 10;
 color: white;
 font-weight: 500;
 }
 .Roommate-bio{
 font-size: 15;
 width: 220;
 margin-top:5;
 margin-left: 20;
 color: white;
 }
 .roommate-info{
 width:100%;
 height:140;
 }
 .roommate-block{
 width: 100%;
 height: 130px;
 margin-top: -130;
 background-color: black;
 opacity:0.5;
 border-radius: 10px;
 }

</style>
