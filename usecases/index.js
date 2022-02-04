require('dotenv').config();

const discord = require('./discord');
const slack = require('./slack');

try {
  discord();
  slack();
} catch (error) {
  throw error;
}
