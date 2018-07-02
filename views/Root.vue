<template>
  <view v-if="!authCheckComplete" class="loadingContainer">
    <nb-text :style="{color:'blue', fontWeight:'bold'}">LOADING ...</nb-text>
    <nb-spinner color='blue' />
  </view>
  <view v-else class="container">
    <app-navigation v-if="authorized"></app-navigation>
    <auth-navigation v-if="!authorized">auth</auth-navigation>
  </view>
</template>
 <script>
  import { AppNavigation, AuthNavigation } from "./routes";

  export default {
    props: ["authCheckComplete", "authorized"],
    components: { AppNavigation, AuthNavigation },
    computed: {},
    methods: {}
  };
</script>
<style>
  .container {
    flex: 1;
  }
  .loadingContainer {
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .text-color-primary {
    color: blue;
  }
</style>