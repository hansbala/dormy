<template>
    <nb-container>
        <nb-content>
            <image
                :source="require('../../assets/Images/rmate-man1.jpeg')"
                class="nav-drawer-img"
            />
            <text class="user-name"> John Doe </text>
           
            <nb-list class="drawer-items-list">
                <nb-list-item
                    v-for="item in drawerItems"
                    :key="item.route"
                    button
                    noBorder
                    :onPress="() => handleListItemClick(item)"
                    class="drawer-item"
                >
                    <nb-left>
                        <nb-text>
                            {{ item.name }}
                        </nb-text>
                    </nb-left>
                </nb-list-item>
            </nb-list>  
            <nb-button :on-press="logout" class="logout-btn">
                <nb-text class="logout-txt">Log Out</nb-text>
            </nb-button>
            
        </nb-content>
    </nb-container>
</template>

<script>


export default {
    props: {
        navigation:{
            type: Object
        }
    },
    data () {
        return {
            drawerItems: [
                {   
                    name: "Home",
                    route: "Home"
                },
                {
                    name: "Contacts",
                    route: "Contacts"
                },
                {
                    name: "Settings",
                    route: "Settings"
                },
                {
                    name: "Get Help",
                    route: "Get Help"
                }
            ],
        }
    },
    methods: {
        handleListItemClick(screen) {
            this.navigation.navigate(screen.route);
        },
        logout() {
            this.navigation.navigate("Logout");
        }
    }
}
</script>

<style>
.nav-drawer-img {
    width: 100;
    height: 100;
    border-radius: 70;
    align-self: center;
    margin-top: 10%;
}

.drawer-items-list {
    margin: 15;
}

.user-name {
    font-size: 30;
    text-align: center;
    margin-top: 10;
}

.logout-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    background-color: #F74C01;
}

.logout-txt {
    text-align: center;
}
</style>