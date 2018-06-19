<template>
  <view class="container">
    <text class="text-color-primary">My Vue Native App - FirstOne</text>
    <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>
  </view>
</template>
 <script>
export default {
  props: {
    navigation: {
      type: Object
    }
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