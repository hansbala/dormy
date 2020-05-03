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
            <text-input class="search-bar" v-model="searchQuery" />
        </view>

        <!-- Scrollable content (renting, roomates, sub-leasing) -->
        <scroll-view class="scrollable-content">
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
                    class="scroll-section"
                    id="renting-section"
                >
                    <image
                        class="img-preview"
                        :source="
                            require('../../assets/test_pictures/bedroom.jpg')
                        "
                    />
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
                    class="scroll-section"
                    id="renting-section"
                >
                    <image
                        class="img-preview"
                        :source="
                            require('../../assets/test_pictures/bedroom.jpg')
                        "
                    />
                </scroll-view>
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
                    class="scroll-section"
                    id="renting-section"
                >
                    <image
                        class="img-preview"
                        :source="
                            require('../../assets/test_pictures/bedroom.jpg')
                        "
                    />
                </scroll-view>
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
                    class="scroll-section"
                    id="renting-section"
                >
                    <image
                        class="img-preview"
                        :source="
                            require('../../assets/test_pictures/bedroom.jpg')
                        "
                    />
                </scroll-view>
            </view>
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
    data: function() {
        return {
            // Also serves as the placeholder
            searchQuery: "Search housing, rides, roomates"
        };
    },
    methods: {
        navDrawerOpen() {
            console.log(this.navigation);
            this.navigation.openDrawer();
        }
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
    color: #a9a9a9;
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
</style>
