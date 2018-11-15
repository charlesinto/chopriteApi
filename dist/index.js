'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getStockItems = require('./route/getStockItems');

var _getStockItems2 = _interopRequireDefault(_getStockItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
// import auth from './route/auth';
// import getImage from './route/getImage';
// import route from './route';


var apiVersion = _express2.default.Router();
var app = (0, _express2.default)();
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.use(_express2.default.static('public'));

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// app.use('/', route)
// app.use('/api/v1/auth', auth)
app.use('/api/v1/getStoreItems', _getStockItems2.default);
// app.use('/api/v1/fetch', getImage);


var port = process.env.PORT || 5000;
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)().listen(server);
io.on('connection', function (socket) {
    console.log('user connected, id: ' + socket.id);
});

server.listen(port, function () {
    console.log('server is listening on port ' + port);
});

exports.default = server;