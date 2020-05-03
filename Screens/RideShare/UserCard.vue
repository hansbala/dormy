<template>
    <view>
        <touchable-opacity class="card">
            <view class="card-header">
                <view class="horizontal-flex card-header-image">
                    <image class="user-photo" :source="require('../../assets/Images/rmate-man1.jpeg')"/>
                    <text>{{user.username}}</text>
                </view>
                <view class="horizontal-flex card-header-date"> 
                    <text>{{user.dates.postDate}}</text>
                </view>
            </view>

            <view class="card-item">
                <text class="emphasis">{{user.location.start}}</text>
                <text class="low-emphasis">To</text>
                <text class="emphasis">{{user.location.end}}</text>
            </view>

            <view class="card-item">
                <view class="horizontal-flex" style="flex: 1">
                    <image class="icon" :source="require('../../assets/Icons/cal-sched.png')"/>
                    <text class="icon-text">{{user.dates.rideShareDate}}</text>
                </view>

                <view class="horizontal-flex" style="flex: 1 ">
                <image class="icon" :source="require('../../assets/Icons/time.png')"/>
                    <text class="icon-text">{{user.dates.rideShareTime}}</text>
                </view>

                <view class="horizontal-flex" style="flex: 1">
                    <image class="icon" :source="require('../../assets/Icons/Nav-bar/roommates-inactive.png')"/>
                    <text class="icon-text">{{user.numPassengers}}</text>
                </view>
            </view>

            <view class="card-item">
                <!-- <collapsing-toolbar :collapsed={isCollapsed}>
                    <view>
                        <text> Sup</text>
                    </view>
                </collapsing-toolbar> -->
            </view>
        </touchable-opacity>
    </view>
</template>

<script>
// import CollapseView from 'react-native-collapse-view';

export default {
    props: {
        user: Object,
    },
    data: {
       
    },
    methods: {
     
    },
    components: {
       
    }

};  
</script>


<style>
.horizontal-flex {
    display: flex;
    flex-direction: row;
}



/*************************************** 

   Card Styling

****************************************/
.card {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10px;
    border-width: 1;
    border-radius: 5;
    border-color: #ededed;
}

.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ededed;
    padding: 5;
}

.card-header-image {
    flex: 3;
    align-items: center;
}

.card-header-date {
    justify-content: flex-end;
    margin-right: 5;
}

.user-photo{
    width: 35;
    height: 35;
    border-radius: 200;
    margin-left: 10;
    margin-right: 10;
}

.card-item {
    display: flex;
    flex-direction: row;
    margin-left: 30;
    margin-top: 10;
}

.icon {
    width: 15;
    height: 15;
}

.emphasis {
    color: #F74C01;
    margin: 5;
}

.low-emphasis {
    color: #696969;
    margin: 5;
}

.icon-text{
    margin-left: 5;
    font-size: 12;
}


</style>

