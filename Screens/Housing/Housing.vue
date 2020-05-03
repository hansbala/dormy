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
            <text-input class="search-bar" v-model="searchQuery" />
            <touchable-opacity class="menu-icon-wrapper">
                <image
                    class="menu-icon"
                    :source="require('../../assets/plus_icon.png')"
                />
            </touchable-opacity>
        </view>

        <scroll-view class="scrollable-section">
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

            <!-- Each individual card -->
            <touchable-opacity class="card">
                <image
                    class="card-image"
                    :source="require('../../assets/test_pictures/bedroom.jpg')"
                />
                <!-- Price, number of bedrooms and something like "apartment for rent" -->
                <view class="card-info-section-wrapper">
                    <view class="card-info">
                        <text class="card-info-txt card-info-ppm">
                            $2,250/Mo
                        </text>
                        <text class="card-info-txt">2 Bds</text>
                        <text class="card-info-txt">1 bth</text>
                        <text class="card-info-txt">1500 sqft</text>
                    </view>
                    <view>
                        <text class="card-info-descriptor">
                            <text class="apartment-type"> Apartment </text>
                            for rent
                        </text>
                    </view>
                </view>

                <!-- Address preview -->
                <view class="address-preview-wrapper">
                    <image
                        class="address-preview-icon"
                        :source="require('../../assets/location_icon.png')"
                    />
                    <text class="address-preview">
                        69 Brown Street, Providence, RI, 02912
                    </text>
                </view>
            </touchable-opacity>
        </scroll-view>

    </view>
</template>

<script>
import BottomNavBar from "../Navigation/TabNavBar.vue";
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
            searchQuery: "Search here.."
        };
    },
    components: {
        BottomNavBar
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
    margin-left: 10;
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
.card {
    margin: 10;
    border-radius: 10;
    border-color: #eee;
    border-width: 3;
}
.card-image {
    border-radius: 5;
    height: 200;
    width: 100%;
}
.card-info {
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.card-info-ppm {
    flex: 2;
    font-size: 18;
}
.card-info-txt {
    margin: 10;
    font-size: 14;
    font-weight: bold;
}
.card-info-descriptor {
    font-size: 14;
    padding: 5;
    color: #a9a9a9;
}
.apartment-type {
    font-size: 14;
    color: orange;
    font-weight: bold;
}
.address-preview-wrapper {
    flex-direction: row;
    align-items: center;
    padding: 10;
    background-color: #eee;
}
</style>
