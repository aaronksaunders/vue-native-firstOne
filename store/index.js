import Vue from "vue-native-core";
import Vuex from 'vuex'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  modules: {
    user: user,
    shared: shared
  }
})