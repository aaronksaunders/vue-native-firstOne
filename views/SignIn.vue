<template>
  <nb-container>
    <nb-header>
      <nb-body>
        <nb-title>
          Login
        </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-text class="text-color-primary">My Vue Native App - SignIn</nb-text>
      <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>

      <nb-form>
        <nb-item stackedLabel>
          <nb-label>Username</nb-label>
          <nb-input v-model="credentials.email" />
        </nb-item>
        <nb-item stackedLabel last>
          <nb-label>Password</nb-label>
          <nb-input secureTextEntry v-model="credentials.password" type="password" />
        </nb-item>
      </nb-form>
      <nb-button block :onPress="() => doLogin()" :style="{ margin: 15, marginTop: 50 }">
        <nb-text>Sign In</nb-text>
      </nb-button>
      <nb-button block :onPress="() => navigation.navigate('SignUp')" :style="{ margin: 15, marginTop: 0 }">
        <nb-text>Sign Up</nb-text>
      </nb-button>
      <view v-if="error" :style="{alignItems:'center'}">
        <nb-text :style="{marginTop:10}">{{error.message}}</nb-text>
      </view>
    </nb-content>

  </nb-container>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import { Keyboard } from "react-native";

  const navigationOptions = {
    title: "testeee"
  };

  export default {
    props: {
      navigation: {
        type: Object
      }
    },
    computed: {
      ...mapGetters("user", ["authError", "user"]),
      ...mapGetters("shared", ["error"])
    },
    methods: {
      ...mapActions("user", ["signUserIn"]),
      doLogin() {
        console.log(this.credentials);
        this.signUserIn(this.credentials);
        Keyboard.dismiss();
      }
    },
    data: function() {
      return {
        authorized: false,
        credentials: {}
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