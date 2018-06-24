<template>
  <nb-container>

    <nb-content padder>
      <nb-text class="text-color-primary">My Vue Native App - SignIn</nb-text>
      <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>

      <nb-form>
        <nb-item stackedLabel>
          <nb-label>Username</nb-label>
          <nb-input />
        </nb-item>
        <nb-item stackedLabel last>
          <nb-label>Password</nb-label>
          <nb-input secureTextEntry />
        </nb-item>
      </nb-form>
      <nb-button block :style="{ margin: 15, marginTop: 50 }">
        <nb-text>Sign In</nb-text>
      </nb-button>
      <nb-button block :onPress="() => navigation.navigate('SignUp')" :style="{ margin: 15, marginTop: 0 }">
        <nb-text>Sign Up</nb-text>
      </nb-button>
    </nb-content>
  </nb-container>
</template>
<script>
  export default {
    props: {
      navigation: {
        type: Object
      }
    },
    methods: {},
    data: function() {
      return {
        authorized: false,
        creds: {}
      };
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