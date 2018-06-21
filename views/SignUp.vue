<template>
  <nb-container>
    <nb-content padder>
      <nb-text class="text-color-primary">My Vue Native App - SignUp</nb-text>
      <nb-text :style="{marginTop:10}">{{navigation.state.routeName}}</nb-text>

      <nb-form>
        <nb-item stackedLabel>
          <nb-label>Username</nb-label>
          <nb-input v-model="creds.username" />
        </nb-item>
        <nb-item stackedLabel>
          <nb-label>Email Address</nb-label>
          <nb-input v-model="creds.email" />
        </nb-item>
        <nb-item stackedLabel>
          <nb-label>Password</nb-label>
          <nb-input secureTextEntry v-model="creds.password" />
        </nb-item>
          <nb-item stackedLabel :style="{height:120}">
            <nb-label>Bio</nb-label>
            <nb-textarea :style="{marginLeft: -15, marginTop: 8,width:'100%', height:100}" v-model="creds.bio"  />
          </nb-item>
      </nb-form>
      <nb-button :onPress="() => doSignUp()" block :style="{ margin: 15, marginTop: 50 }">
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
  methods: {
    doSignUp() {
      console.log(this.creds);
    }
  },
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