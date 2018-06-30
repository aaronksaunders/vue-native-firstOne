<template>
  <view class="container">
    <app-navigation v-if="authorized"></app-navigation>
    <auth-navigation v-if="!authorized"></auth-navigation>
  </view>
</template>

<script>
  import Vue from "vue-native-core";
  import { StackNavigator } from "vue-native-router";
  import { VueNativeBase } from "native-base";

  import { store } from "./store";

  import * as firebase from "firebase";

  Vue.prototype.$store = store;

  // registering all native-base components to the global scope of the Vue
  Vue.use(VueNativeBase);

  import HomeVue from "./views/Home.vue";
  import DetailVue from "./views/Detail.vue";
  import SignUpVue from "./views/SignUp.vue";
  import SignInVue from "./views/SignIn.vue";

  const AppNavigation = StackNavigator(
    {
      Home: HomeVue,
      Detail: DetailVue
    },
    {
      initialRouteName: "Home"
    }
  );

  const AuthNavigation = StackNavigator({
    SignIn: SignInVue,
    SignUp: SignUpVue
  });
  export default {
    components: { AppNavigation, AuthNavigation },
    data: function() {
      return {
        authorized: true
      };
    },
    created() {
      firebase.initializeApp({

      });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
         this.$store.dispatch("user/autoSignIn", user);
          this.authorized = true;
        } else {
          this.authorized = false;
        }
      });
    }
  };
</script>
<style>
  .container {
    flex: 1;
  }
  .text-color-primary {
    color: blue;
  }
</style>