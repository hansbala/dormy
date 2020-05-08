<!--
Im think the following should be the flowchart for how the housing
screen should work:
 - Housing Screen
    - Individual Housing Listings with props (HousingListing.vue)
    - On clicking a particular housing, it takes you to 
      maximised housing listing with props (MaximizedHousing.vue)
    - Also make sure once taken to the housing screen, maintain
      the stack navigator so as to allow backing into the 
      original housing screen
-->
<template>
    <view class="container">
        <!-- Header that stays fixed at the top -->
        <view class="header-wrapper">
            <touchable-opacity :on-press="navDrawerOpen">
                <image class="menu-icon" :source="require('../../assets/png_icons/hamburger-nav.png')"/>
            </touchable-opacity>
            <text-input class="search-bar" v-model="searchQuery" />
            <touchable-opacity :on-press="addHousingListing" class="menu-icon-wrapper">
                <image
                    class="menu-icon"
                    :source="require('../../assets/plus_icon.png')"
                />
            </touchable-opacity>
        </view>

        <scroll-view class="scrollable-section">
            <RefreshControl
                :refreshing="refreshing"
                :onRefresh="_onRefresh"
                :title="'Fetching more housing listings...'"
            />
            <!-- Sort by renting, sub-leasing, or saved -->
            <view class="filter-wrapper">
                <touchable-opacity class="filter-toggler red-br">
                    <text class="filter-type red-txt"> Renting </text>
                </touchable-opacity>
                <touchable-opacity class="filter-toggler red-br">
                    <text class="filter-type red-txt">Sub-Leasing</text>
                </touchable-opacity>
                <touchable-opacity class="filter-toggler red-br">
                    <text class="filter-type red-txt">Saved</text>
                </touchable-opacity>
            </view>
            <!-- Sort by price, home-type, or more -->
            <view class="filter-wrapper">
                <touchable-opacity class="filter-toggler blue-br">
                    <text class="filter-type blue-txt">Price</text>
                </touchable-opacity>
                <touchable-opacity class="filter-toggler blue-br">
                    <text class="filter-type blue-txt">Home Type</text>
                </touchable-opacity>
                <touchable-opacity class="filter-toggler blue-br">
                    <text class="filter-type blue-txt">More</text>
                </touchable-opacity>
            </view>

            <view v-for="listing in housingListings" :key="listing.id">
                <housing-card :listing=listing></housing-card>
            </view>
        </scroll-view>

    </view>
</template>

<script>
import { RefreshControl } from 'react-native';
import BottomNavBar from "../Navigation/TabNavBar.vue";
import { firebaseAuth } from "../../environment/config.js";
import { getHousingListings } from "../../api/housingApi.js";
import HousingCard from "./HousingCard";
import { firebaseStore } from "../../environment/config.js";

export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
            searchQuery: "Search here..",
            housingListings: [],
            refreshing: false
        };
    },
    mounted() {
        this.fetchHousingListings();
        const timestamp = new Date();
        console.log(timestamp);
        firebaseStore.child('housing/1.jpg').getDownloadURL().then(function(url) {
            console.log(url);
        }).catch(function(err) {
            console.log(err);
        });
    },
    methods: {
        addHousingListing() {
            getHousingListings();
            this.navigation.navigate("AddHousing");
        },
        async fetchHousingListings() {
            let res = await getHousingListings();
            this.housingListings = res;
        },
        navDrawerOpen() {
            this.navigation.openDrawer();
        },
        _onRefresh() {
            this.refreshing = true;
            this.fetchHousingListings();
            this.refreshing = false;
        }
    },
    components: {
        BottomNavBar,
        HousingCard,
        RefreshControl,
    }
};
</script>

<style>
.container {
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
}
.menu-icon {
    width: 30;
    height: 30;
    padding-left: 10;
    padding-right: 10;
}
.header-wrapper {
    flex-direction: row;
    margin-top: 50;
    margin-left: 20;
    margin-right: 20;
    padding: 5;
}
.search-bar {
    flex: 1;
    border-color: #a9a9a9;
    border-width: 1;
    font-size: 16;
    border-radius: 5;
    margin-left: 10;
    padding: 10;
    color: #a9a9a9;
}
.menu-icon {
    /* margin-left: 10; */
    width: 40;
    height: 40;
}
.filter-wrapper {
    flex-direction: row;
    justify-content: space-around;
    padding: 10;
    border-width: 0.5;
    border-color: #eee;
}
.filter-toggler {
    padding-left: 10;
    padding-right: 10;
    padding-top: 5;
    padding-bottom: 5;
    border-width: 1;
    border-radius: 5;
    flex: 1;
    margin: 5;
    margin-top: 1;
    margin-bottom: 1;
    align-items: center;
}
.filter-type {
    font-size: 16;
}
.red-txt {
    color: orange;
}
.red-br {
    border-color: orange;
}
.blue-txt {
    color: blue;
}
.blue-br {
    border-color: blue;
}

</style>
