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
            <text-input :placeholder="'Search for stuff here..'" class="search-bar" v-model="searchQuery" />
            <touchable-opacity :on-press="addHousingListing" class="menu-icon-wrapper">
                <image
                    class="plus-icon"
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
                <touchable-opacity 
                    :on-press="toggleFilterByRent"
                    class="filter-toggler"
                    :class="rentalTypeFilter.rentFilterOn ? 'black-br' : 'red-br'">
                    <text 
                        :class="rentalTypeFilter.rentFilterOn ? 'black-txt' : 'red-txt'"
                        class="filter-type"> 
                        Renting 
                    </text>
                </touchable-opacity>
                <touchable-opacity 
                    :on-press="toggleFilterBySubLease"
                    class="filter-toggler"
                    :class="rentalTypeFilter.subLeaseFilterOn ? 'black-br' : 'red-br'">
                    <text 
                        :class="rentalTypeFilter.subLeaseFilterOn ? 'black-txt' : 'red-txt'"
                        class="filter-type">
                        Sub-Leasing
                    </text>
                </touchable-opacity>
                <touchable-opacity 
                    class="filter-toggler red-br">
                    <text 
                        class="filter-type red-txt">
                        Saved
                    </text>
                </touchable-opacity>
            </view>
            <!-- Sort by price, home-type, or more -->
            <view class="filter-wrapper">
                <touchable-opacity 
                    :on-press="toggleFilterByApartment"
                    class="filter-toggler"
                    :class="housingTypeFilter.apartmentFilterOn ? 'black-br' : 'blue-br'">
                    <text 
                        class="filter-type"
                        :class="housingTypeFilter.apartmentFilterOn ? 'black-txt' : 'blue-txt'">
                        Apartment
                    </text>
                </touchable-opacity>
                <touchable-opacity 
                    :on-press="toggleFilterByHouse"
                    class="filter-toggler"
                    :class="housingTypeFilter.houseFilterOn ? 'black-br' : 'blue-br'">
                    <text 
                        class="filter-type"
                        :class="housingTypeFilter.houseFilterOn ? 'black-txt' : 'blue-txt'">
                        House
                    </text>
                </touchable-opacity>
                <touchable-opacity
                    :on-press="toggleFilterByRoom"
                    class="filter-toggler"
                    :class="housingTypeFilter.roomFilterOn ? 'black-br' : 'blue-br'">
                    <text 
                        class="filter-type"
                        :class="housingTypeFilter.roomFilterOn ? 'black-txt' : 'blue-txt'">
                        Rooms
                    </text>
                </touchable-opacity>
            </view>

            <view v-for="listing in filteredPosts" :key="listing.id">
                <housing-card :listing=listing></housing-card>
            </view>
        </scroll-view>

    </view>
</template>

<script>
import { RefreshControl } from 'react-native';
import { getHousingListings } from "../../api/housingApi.js";
import HousingCard from "./HousingCard";

export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
            searchQuery: '',
            housingListings: [],
            refreshing: false,
            housingTypeFilter: {
                filterOn: false,
                apartmentFilterOn: false,
                houseFilterOn: false,
                roomFilterOn: false,
            },
            rentalTypeFilter: {
                filterOn: false,
                rentFilterOn: false,
                subLeaseFilterOn: false,
            },
            priceSortOn: false,
        };
    },
    mounted() {
        this.fetchHousingListings();
    },
    computed: {
        filteredPosts() {
            return this.housingListings.filter((listing) => {
                // Check if there are no filters set
                if (!this.housingTypeFilter.filterOn && !this.rentalTypeFilter.filterOn && this.searchQuery === '') {
                    return true;
                }
                // Search functionality
                if (this.searchQuery !== '') {
                    if (listing.housingType.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                        listing.rentalType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        listing.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        listing.houseLocation.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        return true;
                    }
                }
                // Checking for housing type filter
                if (this.housingTypeFilter.filterOn) {
                    if (this.housingTypeFilter.apartmentFilterOn) {
                        if (listing.housingType === 'Apartment') {
                            return true;
                        }
                    } else if (this.housingTypeFilter.houseFilterOn) {
                        if (listing.housingType === 'House') {
                            return true;
                        }
                    } else {
                        if (listing.housingType === 'Room') {
                            return true;
                        }
                    }
                }
                // Checking for rental type filter
                if (this.rentalTypeFilter.filterOn) {
                    if (this.rentalTypeFilter.rentFilterOn) {
                        if (listing.rentalType === 'Rent') {
                            return true;
                        }
                    } else {
                        if (listing.rentalType === 'Sub lease') {
                            return true;
                        }
                    }
                }
                // If none of them return true, we return false
                return false;
            });
        },
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
        toggleFilterByRent() {
            this.rentalTypeFilter.filterOn = !this.rentalTypeFilter.filterOn;
            this.rentalTypeFilter.rentFilterOn = !this.rentalTypeFilter.rentFilterOn;
        },
        toggleFilterBySubLease() {
            this.rentalTypeFilter.filterOn = !this.rentalTypeFilter.filterOn;
            this.rentalTypeFilter.subLeaseFilterOn = !this.rentalTypeFilter.subLeaseFilterOn;
        },
        toggleFilterByApartment() {
            this.housingTypeFilter.filterOn = !this.housingTypeFilter.filterOn;
            this.housingTypeFilter.apartmentFilterOn = !this.housingTypeFilter.apartmentFilterOn;
        },
        toggleFilterByHouse() {
            this.housingTypeFilter.filterOn = !this.housingTypeFilter.filterOn;
            this.housingTypeFilter.houseFilterOn = !this.housingTypeFilter.houseFilterOn;
        },
        toggleFilterByRoom() {
            this.housingTypeFilter.filterOn = !this.housingTypeFilter.filterOn;
            this.housingTypeFilter.roomFilterOn = !this.housingTypeFilter.roomFilterOn;
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
.plus-icon {
    width: 40;
    height: 40;
    padding-left: 10;
    padding-right: 10;
    margin-left: 5;
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
.black-txt {
    color: black;
}
.blue-br {
    border-color: blue;
}
.black-br {
    border-color: black;
}

</style>
