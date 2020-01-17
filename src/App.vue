<template>
  <div id="app">
    <NavBar />
    <router-view v-on:setUid="getMsg($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: {
    getMsg(id) {
      // this.uid = id
    }
  },
  data() {
    return{
      uid: ''
    }
  },
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Roboto'); */
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
button{
  width: 80px;
}
</style>
