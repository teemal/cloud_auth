<template>
  <div class="wrapper">
    <div class="buttons">
      <a class="button is-primary" v-on:click="logout()">
        <strong>Log Out</strong>
      </a>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import firebase from "firebase";

export default {
  components: {},
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
  }
};
/*eslint-enable*/
</script>

<style scoped>
</style>