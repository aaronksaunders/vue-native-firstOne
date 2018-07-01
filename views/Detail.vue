<template>
  <view class="container">
    <text class="text-color-primary">My Vue Native App - FirstOne</text>
    <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>
    <nb-text :style="{marginTop:10}">{{user}}</nb-text>
  </view>
</template>
 <script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: {
      navigation: {
        type: Object
      }
    },
    computed: {
      ...mapGetters("user", ["user"]),
      ...mapGetters("shared", ["error"])
    },
    methods: {}
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
</style>