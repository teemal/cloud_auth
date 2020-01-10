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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
