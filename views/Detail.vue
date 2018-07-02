<template>
  <nb-container>
    <nb-header>
      <nb-left>
        <nb-button transparent :onPress="() => navigation.goBack()">
          <nb-icon name='arrow-back' />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>
          Account Detail
        </nb-title>
      </nb-body>
      <nb-right></nb-right>
    </nb-header>
    <nb-content padder>
      <text class="text-color-primary">My Vue Native App - FirstOne</text>
      <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>
      <nb-text :style="{marginTop:10}">{{user}}</nb-text>
      <!-- get param from navigation -->
      <nb-text :style="{marginTop:10}">{{navigation.getParam('time')}}</nb-text>
    </nb-content>
  </nb-container>
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
