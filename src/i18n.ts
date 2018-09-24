import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    "From": "From",
    "Buy tickets": "Buy tickets",
    "On Sale": "On Sale",
    "Soon": "Soon"
  },
  es: {
    "From": "Desde",
    "Buy tickets": "Ver boletos",
    "On Sale": "A la Venta",
    "Soon": "Pronto"
  }
};

export default new VueI18n({
  locale: "en",
  messages
});
