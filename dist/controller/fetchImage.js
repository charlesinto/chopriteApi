'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchImage = undefined;

var _Helper = require('../Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchImage = exports.fetchImage = function fetchImage(req, res) {
    console.log('id', req.params.id);
    var imageid = parseInt(req.params.id);
    _Helper2.default.executeQuery('SELECT * FROM BASE_ITEM WHERE itemid = $1', [imageid]).then(function (result) {

        if (result.rowCount > 0) {
            var imagepath = result.rows[0].imagepath;
            var filePath = process.env.NODE_ENV === 'PRODUCTION' ? _path2.default.join(__dirname, '..', '..', 'server', 'asset', 'Images', imagepath.split('/')[3]) : _path2.default.join(__dirname, '..', 'asset', 'Images', imagepath.split('/')[3]);

            console.log('dir', filePath);
            console.log('image path', imagepath);
            var stat = _fs2.default.statSync(filePath);

            // res.writeHead(200, {
            //     'Content-Type': `image/${imagepath.split('/')[3].split('.')[1]}`, 
            //     'Content-Length': stat.size
            // });

            var readStream = _fs2.default.createReadStream(filePath);
            // readStream.on('data', function(data) {
            //     res.write(data);
            // });

            // readStream.on('end', function() {
            //     res.end();        
            // });
            try {
                readStream.on('open', function () {
                    res.writeHead(200, {
                        'Content-Type': 'image/' + imagepath.split('/')[3].split('.')[1],
                        'Content-Length': stat.size
                    });
                    //res.set('Content-Type',`image/${imagepath.split('/')[3].split('.')[1]}`, 'Content-Length', stat.size );
                    //res.write(data);
                    readStream.pipe(res);
                });
                readStream.on('error', function () {
                    res.set('Content-Type', 'text/plain');
                    res.status(404).end('Not found');
                });
            } catch (err) {
                console.log('error');
            }
        } else {
            res.statusCode = 404;
            res.setHeader('content-type', 'application/json');
            res.json({
                message: 'file not found'
            });
        }
    }).catch(function (err) {
        res.statusCode = 500;
        res.setHeader('content-type', 'application/json');
        res.json({
            message: 'server error',
            err: err
        });
    });
};