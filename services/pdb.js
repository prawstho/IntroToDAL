const Pool = require('pg').Pool
const pool = new Pool({
  user: 'keyin',
  host: 'localhost',
  database: 'dvdrental',
  password: 'keyin2024',
  port: 5434,
});
module.exports = pool;