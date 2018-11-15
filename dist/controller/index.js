'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchImage = require('./fetchImage');

Object.keys(_fetchImage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fetchImage[key];
    }
  });
});

var _fetchStockItems = require('./fetchStockItems');

Object.keys(_fetchStockItems).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fetchStockItems[key];
    }
  });
});