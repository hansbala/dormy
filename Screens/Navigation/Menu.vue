<template>
  <nb-container>
    <nb-content>
      <touchable-opacity class="profile-card"> 
          <view :style="{flexDirection: 'row', alignItems: 'center'}">
            <image :source="require('../../assets/Images/rmate-man1.jpeg')" class="nav-drawer-img" />
            <view style="{{flexDirection: 'column'}}">
              <text class="user-name">{{realName}}</text>
              <text class="show-profile">Show profile</text>
            </view>
          </view>
      </touchable-opacity>
      <nb-list class="drawer-items-list">
        <nb-list-item
          v-for="item in menuItems"
          :key="item.route"
          button
          border
          :onPress="() => handleListItemClick(item)"
          class="drawer-item"
        >
          <nb-left>
            <nb-text>{{ item.name }}</nb-text>
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
import { Alert } from 'react-native';
import { getUserNameFromUID, getCurrentUID, signOutUser } from "../../api/userAuth.js";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      menuItems: [
        {
          name: "Personal Information",
          route: "Personal Information",
        },
        {
          name: "Settings",
          route: "Settings",
        },
        {
          name: "Get Help",
          route: "Get Help",
        },
        {
          name: "Give Feedback",
          route: "Give Feedback",
        },
        {
          name: "Privacy Agreement",
          route: "Privacy Agreement",
        },
        {
          name: "Terms of Service",
          route: "Terms of Service",
        },
      ],
      realName: "John Doe",
    };
  },
  mounted() {
    this.getUserName();
  },
  methods: {
    handleListItemClick(screen) {
      this.navigation.navigate(screen.route);
    },
    logout() {
      signOutUser().then(() => {
        this.navigation.navigate("Logout");
      }).catch((err) => {
        Alert.alert('Failed to sign out user: ' + err);
      })
    },
    async getUserName() {
      let localRealName = await getUserNameFromUID(
        getCurrentUID(),
        this.getUserNameFail
      );
      this.realName = localRealName;
    },
    getUserNameFail() {
      this.realName = "John Doe";
    },
  },
};
</script>

<style>
.profile-card {
  display: flex;
  justify-content: center;
  margin-top: 30;
  height: 130;
}

.nav-drawer-img {
  width: 80;
  height: 80;
  border-radius: 70;
  align-self: flex-start;
  margin: 30;
}

.user-name {
  font-size: 25;
  margin-left: -10;
  margin-top: 4;
}

.show-profile {
  font-size: 15;
  font-weight: 500;
  margin-left: -10;
  color: #56aabd;
}

.drawer-items-list {
  width: 100%;
  background-color: #fafafa;
}

.drawer-item {
  margin-left: 30;
  margin-right: 30;
  height: 70;
}

.logout-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin-top: 70;
  margin-left: auto;
  margin-right: auto;
  border-width: 1;
  border-color: #e15e5e;
  background-color: transparent;
}

.logout-txt {
  text-align: center;
  color: #e15e5e;
}
</style>