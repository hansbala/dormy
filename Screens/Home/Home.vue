<!-- TODO: -->
<!-- - Change arrow stuff for the front-end -->
<!-- - Dynamic fetching from server -->
<!-- - Geolocation (might hand off to different component) -->
<!-- - Sidenavbar and bottom tab-based navbar -->
<template>
    <view class="container">
        <!-- Header that stays fixed at the top -->
        <view class="header-wrapper">
            <touchable-opacity
                :on-press="navDrawerOpen"
                class="menu-icon-wrapper"
            >
                <image
                    class="menu-icon"
                    :source="require('../../assets/png_icons/hamburger-nav.png')"
                />
            </touchable-opacity>
            <text-input
                :placeholder="'Search housing, rides, and roommates'"
                class="search-bar" 
                v-model="searchQuery" />
        </view>

        <!-- Scrollable content (renting, roomates, sub-leasing) -->
        <scroll-view class="scrollable-content">
            <!-- Swipe Down for refresh functionality -->
            <RefreshControl
                :refreshing="refreshing"
                :onRefresh="_onRefresh"
                :title="'Fetching new data from Dormy!'"
            />
            <!-- Renting Section -->
            <view class="section-wrapper">
                <!-- Header Information -->
                <view class="section-header">
                    <view class="section-descriptor">
                        <text class="fnt-grey bold"> Renting near you </text>
                        <text class="fnt-grey">
                            Latest based on your location
                        </text>
                    </view>
                    <touchable-opacity 
                        :on-press="() => this.props.navigation.navigate('HomeFeed')"
                        class="arrow-icon-wrapper">
                        <image
                            class="arrow-icon"
                            :source="require('../../assets/right_arrow.png')"
                        />
                    </touchable-opacity>
                </view>

                <!-- Horizontall scroll view section -->
                <scroll-view
                    :horizontal="true"
                    class="scroll-section">
                    <view v-for="post in rentingPosts" :key="post.id">
                        <home-house-card :cardData=post></home-house-card>
                    </view>
                </scroll-view>
            </view>
            <!-- Roomate section -->
            <view class="section-wrapper">
                <!-- Header Information -->
                <view class="section-header">
                    <view class="section-descriptor">
                        <text class="fnt-grey bold">Looking for Roommates</text>
                        <text class="fnt-grey">Most compatible matches </text>
                    </view>
                    <touchable-opacity class="arrow-icon-wrapper">
                        <image
                            class="arrow-icon"
                            :source="require('../../assets/right_arrow.png')"
                        />
                    </touchable-opacity>
                </view>

                <!-- Horizontall scroll view section -->
                <scroll-view
                    :horizontal="true"
                    class="scroll-section">
                    <view v-for="post in roommates" :key="post.id">
                        <roommate-house-card :roommateData=post></roommate-house-card>
                    </view>
                </scroll-view>
                <!-- <scroll-view
                    :horizontal="true"
                    class="scroll-section"
                    id="renting-section"
                >
                    <image
                        class="img-preview"
                        :source="
                            require('../../assets/test_pictures/bedroom.jpg')
                        "
                    />
                </scroll-view> -->
            </view>
            <!-- Sub-leasing section -->
            <view class="section-wrapper">
                <!-- Header Information -->
                <view class="section-header">
                    <view class="section-descriptor">
                        <text class="fnt-grey bold">Sub-leasing near you</text>
                        <text class="fnt-grey"
                            >Latest based on your location</text
                        >
                    </view>
                    <touchable-opacity
                        :on-press="() => this.props.navigation.navigate('HomeFeed')"
                        class="arrow-icon-wrapper">
                        <image
                            class="arrow-icon"
                            :source="require('../../assets/right_arrow.png')"
                        />
                    </touchable-opacity>
                </view>

                <!-- Horizontall scroll view section -->
                <scroll-view
                    :horizontal="true"
                    class="scroll-section">
                    <view v-for="post in subLeasePosts" :key="post.id">
                        <home-house-card :cardData=post></home-house-card>
                    </view>
                </scroll-view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import { RefreshControl } from 'react-native';
import HomeHouseCard from './HomeHouseCard.vue';
import RoommateHouseCard from './RoommateHouseCard';
import { getHousingListings } from '../../api/housingApi.js';
import { getUsers } from '../../api/roommatesApi.js';
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data: function() {
        return {
            // Also serves as the placeholder
            searchQuery: '',
            refreshing: false,
            rentingPosts: [],
            subLeasePosts: [],
            roommates: [],
        };
    },
    methods: {
        navDrawerOpen() {
            this.navigation.openDrawer();
        },
        async getRequiredPosts() {
            this.rentingPosts = await this.getRentingPosts();
            this.subLeasePosts = await this.getSubleasePosts();
            this.roommates = await this.getAllRoommates();
        },
        async getRentingPosts() {
            let housingPosts = await getHousingListings();
            housingPosts = housingPosts.filter((listing) => {
                return listing.rentalType === 'Rent';
            });
            return housingPosts;
        },
        async getSubleasePosts() {
            let housingPosts = await getHousingListings();
            housingPosts = housingPosts.filter((listing) => {
                return listing.rentalType === 'Sub lease';
            });
            return housingPosts;
        },
        async getAllRoommates() {
            let result = await getUsers();
            return result;
        },
        _onRefresh() {
            this.refreshing = true;
            this.getRequiredPosts();
            this.refreshing = false;
        }
    },
    mounted() {
        this.getRequiredPosts();
    },
    components: {
        HomeHouseCard,
        RefreshControl,
        RoommateHouseCard,
    }
};
</script>

<style>
.container {
    height: 100%;
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
    width: 40;
    height: 40;
}
.search-bar {
    flex: 1;
    border-color: black;
    border-width: 1;
    font-size: 16;
    border-radius: 5;
    margin-left: 10;
    padding: 4;
}
.section-header {
    flex-direction: row;
    padding: 20;
    padding-bottom: 0;
}
.fnt-grey {
    color: #2a2a2a;
}
.bold {
    font-weight: bold;
}
.arrow-icon-wrapper {
    flex: 1;
    justify-content: center;
    align-items: flex-end;
}
.img-preview {
    width: 150;
    height: 150;
    border-radius: 15;
    margin: 10;
    margin-right: 0;
}
.scrollable-content {
    flex-grow: 2;
}
.horizontal-flex {
    flex-direction: row;
}
</style>
