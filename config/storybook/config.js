/* eslint-disable import/no-extraneous-dependencies */
import moment from "moment";
import { configure } from "@storybook/vue";

moment.locale("es-MX");

const req = require.context("../../src/stories", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
