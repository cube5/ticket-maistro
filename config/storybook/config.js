/* eslint-disable import/no-extraneous-dependencies */
import Vue from "vue";
import VueI18n from "vue-i18n";
import { configure } from "@storybook/vue";

Vue.use(VueI18n);

const req = require.context("../../src/stories", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
