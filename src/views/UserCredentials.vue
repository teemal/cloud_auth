<template>
  <div class="home">
    <form action v-on:submit.prevent>
      <input type="text" name="input" placeholder="email" v-model="email" />
      <br />
      <input type="password" name="input" placeholder="password" v-model="password" />
      <br />
      <p v-on:click="goToSignUp()" class="btn">Sign Up</p>
      <p v-on:click="emailLogin()" class="btn">Login</p>
      <img
        src="../assets/GoogleSignUpDark.png"
        alt
        id="google-signin-button"
        v-on:click="SignInWithGoogle()"
      />
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
/*eslint-disable*/
const firebaseApp = require("../firebase/ConfigFirebase");
import firebase from "firebase";

export default {
  name: "signup",
  components: {},
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    goToSignUp() {
      this.$router.push("signup");
    },
    emailLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          // console.log(res.user.uid);
          var userId = res.user.uid;
          this.$emit("setUid", userId);
          this.$router.push("userpage/" + userId);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    SignInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(res => {
          this.user = res;
          this.$router.push("userpage");
        })
        .catch(e => {
          alert(e);
        });
    }
  }
};
/*eslint-enable*/
</script>

<style scoped>
#google-signin-button {
  width: 10%;
}

#google-signin-button:hover {
  cursor: pointer;
}

.btn:hover {
  cursor: pointer;
}
</style>
