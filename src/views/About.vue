<template>
  <div id="about">
    <div>
      <h1>{{name}}</h1>
      <p>{{ description }}</p>
    </div>
    <p>Here's the API documentation link: <a href="https://developer.ticketmaster.com" target="_blank">Ticketmaster's API</a></p>
    <p>The code is on Github: <a :href="repository" target="_blank">cube5/{{name}}</a></p>
  </div>
</template>

<script lang="ts">
const { name, description, repository } = require("../../package.json");

export default {
  data() {
    return {
      name,
      description,
      repository: repository.url
    };
  }
};
</script>

<style lang="scss" scoped>
#about {
  font-size: 14pt;
}
</style>

