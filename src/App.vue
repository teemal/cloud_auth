<template>
  <div id="app">
    <router-view v-on:setUid="getMsg($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  components: {
  },
  methods: {
    getMsg(id) {
      this.uid = id
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
@import url('https://fonts.googleapis.com/css?family=Roboto');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #001414;
  color: 	#f5efd7;
  height: 100vh;
}
button{
  width: 80px;
}
</style>
