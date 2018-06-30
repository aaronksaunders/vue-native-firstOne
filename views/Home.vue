<template>
  <view class="container" v-if="currentLocation">
    <nb-text :style="{marginBottom:10}" class="text-color-primary">My Vue Native App - FirstOne</nb-text>
    <map-view class="map" :region="{
            latitude : currentLocation.coords.latitude,
            longitude : currentLocation.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }">
      <map-view:marker :onPress="()=> null" :coordinate="currentLocation.coords" title="Here" pinColor="green" />
    </map-view>
    <view>
      <nb-button :onPress="() => handleBtnPress()">
        <nb-text>Click for Details Page</nb-text>
      </nb-button>
    </view>
    <view>
      <nb-button :onPress="() => logout()">
        <nb-text>Do Logout</nb-text>
      </nb-button>
    </view>

    <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>
    <nb-text :style="{marginTop:10}">{{currentLocation}}</nb-text>
  </view>
</template>
 <script>
  import { Constants, MapView, Permissions, Location } from "expo";
  import { mapGetters, mapActions } from "vuex";
  export default {
    components: {
      MapView
    },
    props: {
      navigation: {
        type: Object
      }
    },
    data: function() {
      return {
        currentLocation: null
      };
    },
    methods: {
      ...mapActions("user", ["logout"]),
      handleBtnPress: function() {
        console.log("handleBtnPress");
        this.navigation.navigate("Detail");
      },
      getLocationAsync: async function() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
          console.error("No Permission");
          return;
        } else {
          console.log("Permission Granted");
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log("currentLocation", currentLocation);
        return currentLocation;
      }
    },
    async created() {
      this.currentLocation = await this.getLocationAsync();
    }
  };
</script>
<style>
  .container {
    background-color: white;
    align-items: center;
    flex: 1;
  }
  .text-color-primary {
    color: blue;
  }
  .map {
    height: 200;
    width: 98%;
    margin: 20;
  }
</style>