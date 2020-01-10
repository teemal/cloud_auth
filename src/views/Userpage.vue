<template>
  <div class="home">
      <div v-bind:uid="uid">
          <p>Hi {{this.uid}}</p>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
/*eslint-disable*/
/*eslint-enable*/
export default {
  name: 'signup',
  components: {
  },
  props: ['uid'],
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
  },
}
</script>

<style scoped>

</style>