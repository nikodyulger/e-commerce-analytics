import Vue from "vue";

Vue.filter("currency", (value) => {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });
  if (isNaN(value)) return "-";
  return formatter.format(value);
});

Vue.filter("tax", (value) => {
  return Math.round((value * 100) / 100).toFixed(2) + "%";
});

Vue.filter("date", (value) => {
  const localDate = new Date(value);
  return localDate.toLocaleDateString();
});

Vue.filter("orderId", (value) => {
  return "#" + value;
});
