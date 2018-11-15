'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a connection to database.
 *
 * 
 * @author: charles onuorah
 * 
 *
 */
require('dotenv').config();
var pool = void 0;
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    pool = new _pg2.default.Pool({
        connectionString: process.env.DEVELOPMENT_DB,
        ssl: true
    });
} else if (process.env.NODE_ENV === 'TEST') {
    pool = new _pg2.default.Pool({
        connectionString: process.env.TEST_DB,
        ssl: true
    });
} else {
    pool = new _pg2.default.Pool({
        connectionString: process.env.HEROKU_POSTGRESQL_TEAL_URL, ssl: true
    });
}
exports.default = pool;