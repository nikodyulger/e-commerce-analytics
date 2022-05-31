import Vue from 'vue';

const currency = (curr) => {
    const formatter = new Intl.NumberFormat('es-ES', { style: "currency", currency:'EUR'});
    if (isNaN(curr))
        return '-';
    return formatter.format(curr);
}

Vue.filter("currency", currency);

export default currency;