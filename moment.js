const moment = require("moment");

const week = 1;
const month = 1;
const year = 2023;

// Obtenemos la fecha del primer día de la semana
const firstDayOfWeek = moment().isoWeek(week, month, year)

console.log(firstDayOfWeek);
