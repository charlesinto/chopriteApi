'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchStockItems = undefined;

var _Helper = require('../Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchStockItems = exports.fetchStockItems = function fetchStockItems(req, res) {
    _Helper2.default.executeQuery('SELECT * FROM BASE_ITEM').then(function (result) {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json({
            message: 'opertaion successful',
            items: result.rows
        });
    }).catch(function (err) {
        res.statusCode = 404;
        res.setHeader('content-type', 'application/json');
        res.json({
            message: 'could not load data',
            err: err
        });
    });
};