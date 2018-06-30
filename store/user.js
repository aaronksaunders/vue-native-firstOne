import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signUserUp({
      commit
    }, payload) {
      commit("shared/setLoading", true, {
        root: true
      });
      commit("shared/clearError", null, {
        root: true
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("shared/setLoading", false, {
            root: true
          });
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("shared/setLoading", false, {
            root: true
          });
          commit("shared/setError", error, {
            root: true
          });
          console.log(error);
        });
    },
    signUserIn({
      commit
    }, payload) {
      commit("shared/setLoading", true, {
        root: true
      });
      commit("shared/clearError", null, {
        root: true
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("shared/setLoading", false, {
            root: true
          });
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("shared/setLoading", false, {
            root: true
          });
          commit("shared/setError", error, {
            root: true
          });
          console.log(error);
        });
    },

    autoSignIn({
      commit
    }, payload) {
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      });
    },
    resetPasswordWithEmail({
      commit
    }, payload) {
      const {
        email
      } = payload;
      commit("shared/setLoading", true, {
        root: true
      });
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          commit("shared/setLoading", false, {
            root: true
          });
          console.log("Email Sent");
        })
        .catch(error => {
          commit("shared/setLoading", false, {
            root: true
          });
          commit("shared/setError", error, {
            root: true
          });
          console.log(error);
        });
    },
    logout({
      commit
    }) {
      firebase.auth().signOut();
      commit("setUser", null);
      console.log("logout")
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};