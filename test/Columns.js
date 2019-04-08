const { Columns } = require("../src/api");
// const config = require('./env.json');

const { console } = require("../src/config/commonModules");

Columns("YJango").then(console.log);
