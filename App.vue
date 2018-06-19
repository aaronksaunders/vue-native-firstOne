<template>
  <app-navigation></app-navigation>
</template>

<script>
import Vue from "vue-native-core";
import { StackNavigator } from "vue-native-router";
import { VueNativeBase } from "native-base";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);

import HomeVue from "./views/Home.vue";
import DetailVue from "./views/Detail.vue";
const AppNavigation = StackNavigator(
  {
    Home: HomeVue,
    Detail: DetailVue,
  },
  {
    initialRouteName: "Home"
  }
);
export default {
  components: { AppNavigation }
};
</script>