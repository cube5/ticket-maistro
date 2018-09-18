import Vue from "vue";
import moment from "moment";

Vue.filter("capitalize", capitalizeFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("eventDate", eventDateFilter);
Vue.filter("eventTime", eventTimeFilter);

export function capitalizeFilter(value: string): string {
  if (!value) {
    return "";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function currencyFilter(
  value: number,
  currency: string = "USD",
  locale: string = "en-us"
): string {
  if (!value) {
    return "";
  }
  return value.toLocaleString(locale, {
    currency,
    style: "currency",
    minimumFractionDigits: 2
  });
}

export function eventDateFilter(value: string): string {
  if (!value) {
    return "";
  }
  return moment(value, "YYYY-MM-DD").format("MMM DD");
}

export function eventTimeFilter(value: string): string {
  if (!value) {
    return "";
  }
  return moment(value, "hh:mm:ss").format("hh:mm a");
}
