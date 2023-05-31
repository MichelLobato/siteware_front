<template>
  <div id="app">
    <HomePage /> <!-- Include the "HomePage" component here -->
    <router-view></router-view>
  </div>
</template>

<script>
import HomePage from '@/views/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage,
  },
};
</script>

<style>
/* Styles for the App component */
</style>
