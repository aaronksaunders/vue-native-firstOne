<template>
  <view class="container">
    <app-navigation v-if="authCheckComplete && authorized"></app-navigation>
    <auth-navigation v-if="authCheckComplete && !authorized"></auth-navigation>
    <view v-if="!authCheckComplete" :style="{flex:1, alignItems : 'center', justifyContent : 'center'}">
      <nb-text>LOADING ...</nb-text>
    </view>
  </view>
</template>

<script>
  import Vue from "vue-native-core";
  import { StackNavigator } from "vue-native-router";
  import { VueNativeBase } from "native-base";

  import { store } from "./store";

  import * as firebase from "firebase";

  // this allows us access to the vuex-store in all of the components
  Vue.prototype.$store = store;

  // registering all native-base components to the global scope of the Vue
  Vue.use(VueNativeBase);

  import HomeVue from "./views/Home.vue";
  import DetailVue from "./views/Detail.vue";
  import SignUpVue from "./views/SignUp.vue";
  import SignInVue from "./views/SignIn.vue";

  // ----------------------------------------------------------------------------
  // THIS IS THE REACT NAVIGATION STUFF THAT IS WAY DIFFERENT FROM THE
  // VUE-ROUTER WE ALL KNOW AND LOVE

  // the is the navigation stack for the main application after authentication
  // or account creation is completed. The stackNavigator is the basic master=detail UX
  // that is seen in most mobile applications
  const AppNavigation = StackNavigator(
    {
      // Home route will render the component HomeVue
      Home: HomeVue,
      // Detail route will render the component DetailVue
      Detail: DetailVue
    },
    {
      // when launching this "Navigator", use the "Home" route
      initialRouteName: "Home"
    }
  );

  // the is the navigation stack for authentication or creating a user.
  // The stackNavigator is the basic master=detail UX that is seen in most
  // mobile applications
  const AuthNavigation = StackNavigator({
    // SignIn route will render the component SignInVue
    SignIn: SignInVue,
    // SignUp route will render the component SignUpVue
    SignUp: SignUpVue
  });

  export default {
    // bring in the navigation components
    components: { AppNavigation, AuthNavigation },
    data: function() {
      return {
        authorized: false,
        authCheckComplete: false
      };
    },
    created() {
      firebase.initializeApp({

      });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch("user/autoSignIn", user);
          console.log("onAuthStateChanged", user);
          this.authorized = true;
        } else {
          this.authorized = false;
        }
        this.authCheckComplete = true;
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