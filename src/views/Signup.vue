<template>
  <div class="home">
    <input type="text" name="input" placeholder="email" v-model="email" />
    <br />
    <input type="password" name="input" placeholder="password" v-model="password" />
    <br />
    <button v-on:click="signUp()">Submit</button>
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
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res);
          console.log('poop');
          this.$router.push('/');
          alert('congrats, you\'re now a member of our fight club!');
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert('sorry, something went wrong!');
          // ...
        });
    }
  }
};
/*eslint-enable*/
</script>

<style scoped>
</style>
