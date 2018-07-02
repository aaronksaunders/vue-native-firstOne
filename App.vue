<template>
  <root-navigation :authCheckComplete.sync="authCheckComplete" :authorized.sync="authorized">
  </root-navigation>
</template>

<script>
  import Vue from "vue-native-core";

  import { VueNativeBase } from "native-base";
  import { Font, AppLoading } from "expo";

  import { store } from "./store";

  import * as firebase from "firebase";

  import RootNavigation from "./views/Root.vue";

  // this allows us access to the vuex-store in all of the components
  Vue.prototype.$store = store;

  // registering all native-base components to the global scope of the Vue
  Vue.use(VueNativeBase);

  export default {
    // bring in the navigation components
    components: { RootNavigation },
    data: function() {
      return {
        authorized: false,
        authCheckComplete: false
      };
    },
    beforeCreate() {
      // initialize firebase..
      firebase.initializeApp({

      });

      // remove warning from firebase
      firebase.firestore().settings({
        timestampsInSnapshots: true
      });
    },
    async created() {
      // load in the default font for native-base on android
      let loaded = await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });

      // see if there is already a session saved with a firebase user,
      // if so get the user, set the state in the store and render
      // the appropriate navigator
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch("user/autoSignIn", user);
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