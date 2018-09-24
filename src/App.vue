<template>
  <div id="app">
    <v-header></v-header>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VHeader from "@/components/Header.vue";
import VFooter from "@/components/Footer.vue";
import "@/styles/base.scss";

@Component({
  components: { VHeader, VFooter }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;

  .content {
    padding: 20px 40px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

