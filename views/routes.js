import {
  StackNavigator,
  SwitchNavigator
} from "vue-native-router";

import HomeVue from "./Home.vue";
import DetailVue from "./Detail.vue";
import SignUpVue from "./SignUp.vue";
import SignInVue from "./SignIn.vue";

// ----------------------------------------------------------------------------
// THIS IS THE REACT NAVIGATION STUFF THAT IS WAY DIFFERENT FROM THE
// VUE-ROUTER WE ALL KNOW AND LOVE

// the is the navigation stack for the main application after authentication
// or account creation is completed. The stackNavigator is the basic master=detail UX
// that is seen in most mobile applications
export const AppNavigation = StackNavigator({
  // Home route will render the component HomeVue
  Home: {
    screen: HomeVue
  },
  // Detail route will render the component DetailVue
  Detail: DetailVue
},
{
  initialRouteName: "Home",
  headerMode: "none"
});

// the is the navigation stack for authentication or creating a user.
// The stackNavigator is the basic master=detail UX that is seen in most
// mobile applications
export const AuthNavigation = StackNavigator({
  // SignIn route will render the component SignInVue
  SignIn: SignInVue,
  // SignUp route will render the component SignUpVue
  SignUp: SignUpVue
},
{
  initialRouteName: "SignIn",
  headerMode: "none"
});