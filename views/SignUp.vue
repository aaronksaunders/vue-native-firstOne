<template>
  <nb-container>
    <nb-content padder>
      <nb-text class="text-color-primary">My Vue Native App - SignUp</nb-text>
      <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>

      <nb-form>
        <nb-item stackedLabel>
          <nb-label>First Name</nb-label>
          <nb-input v-model="credentials.firstName" />
        </nb-item>
        <nb-item stackedLabel>
          <nb-label>Last Name</nb-label>
          <nb-input v-model="credentials.lastName" />
        </nb-item>
        <nb-item stackedLabel>
          <nb-label>Email Address</nb-label>
          <nb-input v-model="credentials.email" />
        </nb-item>
        <nb-item stackedLabel>
          <nb-label>Password</nb-label>
          <nb-input secureTextEntry v-model="credentials.password" />
        </nb-item>
        <nb-item stackedLabel :style="{height:120}">
          <nb-label>Bio</nb-label>
          <nb-textarea :style="{marginLeft: -15, marginTop: 8,width:'100%', height:100}" v-model="credentials.bio" />
        </nb-item>
      </nb-form>
      <nb-button :onPress="() => doSignUp()" block :style="{ margin: 15, marginTop: 50 }">
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
    methods: {
      ...mapActions("user", ["signUserUp"]),
      doSignUp() {
        console.log(this.credentials);
        this.signUserUp(this.credentials);
        Keyboard.dismiss()
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