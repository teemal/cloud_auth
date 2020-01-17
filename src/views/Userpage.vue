<template>
  <div class="home">
    <div>
      <p>Hi {{email}}</p>
      <p>your ID# is {{uid}}</p>
      <button class="button is-primary" v-on:click="goToNotes()">Notes</button>
      <!-- <router-link to="notes-page">Go To Notes</router-link> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/*eslint-disable*/
import firebase from "firebase";

export default {
  name: "signup",
  components: {
  },
  data() {
    return {
      email: '',
      uid: ''
    };
  },
  methods: {
    goToNotes(){
        this.$router.push('/userpage/' + this.uid + '/notes');
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