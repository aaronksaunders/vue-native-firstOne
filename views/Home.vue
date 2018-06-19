<template>
    <view class="container">
        <nb-text :style="{marginBottom:10}" class="text-color-primary">My Vue Native App - FirstOne</nb-text>
        <view >
            <nb-button :onPress="() => handleBtnPress()">
                <nb-text>Click for Details Page</nb-text>
            </nb-button>
        </view>

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
  methods: {
    handleBtnPress: function() {
      console.log("handleBtnPress");
      this.navigation.navigate("Detail");
    }
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
</style>