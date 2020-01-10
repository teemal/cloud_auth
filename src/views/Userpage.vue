<template>
  <div class="home">
    <div>
      <p>Hi {{email}}</p>
      <p>your ID# is {{uid}}</p>
      <button v-on:click="logout()">Log Out</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/*eslint-disable*/
import firebase from "firebase";

export default {
  name: "signup",
  components: {},
  data() {
    return {
      email: '',
      uid: ''
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(res => {
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch(error => {
          // An error happened.
          alert("Oh no! You're trapped here forever!");
        });
    }
  },
  mounted: function(){
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.email = user.email;
        this.uid = user.uid;
      } else {
        // User is signed out.
      }
    });
  },
};
/*eslint-enable*/
</script>

<style scoped>
</style>