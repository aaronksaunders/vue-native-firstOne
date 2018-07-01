import * as firebase from "firebase";

// Required for side-effects
require('firebase/firestore');

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
      let newUser = {
        ...payload
      }
      return firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(({
          user
        }) => {
          commit("shared/setLoading", false, {
            root: true
          });

          console.log("createUserWithEmailAndPassword", user)
          return firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set(newUser);
        }).then(() => {

          commit("setUser", { ...newUser,
            id: user.uid
          });
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

      var userRef = firebase
        .firestore()
        .collection('users')
        .doc(payload.uid);

      return userRef
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log('Document data:', doc.data());

            commit("setUser", {
              id: payload.uid,
              ...doc.data(),
            });

          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!', payload.uid);
            commit("setUser", null);
            commit("shared/setError", {
              message: "User Not Found"
            }, {
              root: true
            });
          }
        })
        .catch(error => {
          console.log('Error getting document:', error);
          commit("shared/setError", error, {
            root: true
          });
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