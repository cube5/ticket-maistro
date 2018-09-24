<template>
  <header id="header">
    <div class="brand">Ticket Maistro <small class="version">v{{version}}</small></div>
    <div class="middle">
      <select id="lang" name="lang" @change="handleCountryChange">
        <option value="us">US</option>
        <option value="mx">MX</option>
      </select> - {{ this.$store.getters.locale }}
    </div>
    <nav id="nav">
      <router-link to="/events">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <a class="external" :href="github" target="_blank" title="github site (external)">Github</a>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
const { version, repository } = require("../../package.json");

@Component
export default class Header extends Vue {
  public version: string = version;
  public github: string = repository.url;
  @Action("setCountry") public setCountry: any;

  public setLocale(locale: string) {
    this.$i18n.locale = locale;
  }

  public handleCountryChange(e: any) {
    const country = e.target.value;
    this.setCountry(country);

    const { locale } = this.$store.getters;
    this.setLocale(locale);
  }
}
</script>

<style lang="scss" scoped>
#header {
  background-color: $white;
  border-bottom: 1px solid $alternative;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  padding: 12px 20px;

  .brand {
    font-size: 26px;
    font-weight: bold;
    text-align: left;

    .version {
      font-weight: normal;
      font-size: 14px;
    }
  }

  .middle {
    text-align: right;
  }

  #nav {
    font-size: 16px;
    text-align: right;
  }
}
</style>

