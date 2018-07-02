<template>
  <nb-container>
    <nb-header>
      <nb-left>
      </nb-left>
      <nb-body>
        <nb-title>
          Main Screen
        </nb-title>
      </nb-body>
      <nb-right></nb-right>
    </nb-header>
    <nb-content padder v-if="currentLocation" :contentContainerStyle="{alignItems:'center', justifyContent:'center'}">
      <nb-text :style="{marginBottom:10}" class="text-color-primary">My Vue Native App - FirstOne</nb-text>
      <map-view class="map" :region="{
            latitude : currentLocation.coords.latitude,
            longitude : currentLocation.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }">
        <map-view:marker :onPress="()=> null" :coordinate="currentLocation.coords" title="Here" pinColor="green" />
      </map-view>
      <view :style="{marginTop:10, width:250}">
        <nb-button block :onPress="() => handleBtnPress()">
          <nb-text>Click for Details Page</nb-text>
        </nb-button>
        <nb-button block :onPress="() => logout()" :style="{marginTop:10}" info>
          <nb-text>Do Logout</nb-text>
        </nb-button>
      </view>

      <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>
      <nb-text :style="{marginTop:10}">{{currentLocation}}</nb-text>
    </nb-content>
    <nb-content v-else>
      <nb-text :style="{color:'blue', fontWeight:'bold'}">LOADING ...</nb-text>
      <nb-spinner color='blue' />
    </nb-content>
  </nb-container>
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
        // This is how you pass parameters from along with
        // changing routes, we dont need this because we are
        // using vuex to keep state information
        this.navigation.navigate("Detail", {
          time: new Date()
        });
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
    justify-content: center;
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