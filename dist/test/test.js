'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Helper = require('../Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

var createuser = {
    "firstname": "charles",
    "lastname": "onuorah",
    "phonenumber": "08163113450",
    "password": "july3450",
    "email": "charles.onuorah@yahoo.com"
};

var dummyUser = {
    password: "$2b$10$UMlCXXsfIhCfyedFpZqk8uXbH2anwFPVqVmGeIqnXQauirv9dnGa2",
    email: "charles.onuorah@yahoo.com",
    phonenumber: "08163113450",
    firstname: "charles",
    lastname: "onuorah"
};

var user = {
    password: "july3450",
    email: "charles.onuorah@yahoo.com"
};

describe('Test all api end points', function () {
    var _this = this;

    describe('it should get stock items', function () {

        beforeEach(function (done) {
            var sql = 'CREATE TABLE IF NOT EXISTS BASE_ITEM(itemid SERIAL, itemame varchar(100),\n            imagepath varchar(500), brandname varchar(100),  cost integer,category varchar(50), datecreated timestamp);';
            _Helper2.default.executeQuery(sql).then(function (result) {
                var sql = 'INSERT INTO BASE_ITEM(brandname,itemame,imagepath,cost,category, datecreated)\n                values\n                (\'birds\',\'custard\', \'/asset/Images/birds_custard_1.jpg\', 200,\'men\', NOW()),\n                (\'melody\',\'bread\', \'/asset/Images/bread_1.jpg\', 150,\'men\', NOW()),\n                (\'peak\',\'milk\', \'/asset/Images/daily_pure_milk_1.jpg\', 200,\'men\', NOW()),\n                (\'keleops\',\'cereals\', \'/asset/Images/loop_cereals_1.jpg\', 200,\'men\', NOW()),\n                (\'olgy\',\'pampers\', \'/asset/Images/pampers_1.jpg\', 200,\'men\', NOW()),\n                (\'philips\',\'beard trimmer\', \'/asset/Images/philips_beard_trimmer.jpg\', 200,\'men\', NOW()),\n                (\'gucci\',\'sweater\', \'/asset/Images/sweater_for_women_1.jpg\', 200,\'men\', NOW()),\n                (\'kelogen\',\'toilet paper\', \'/asset/Images/toilet_paper_1.jpg\', 200,\'men\', NOW()),\n                (\'colgate\',\'tooth paste\', \'/asset/Images/toothpaste_1.jpg\', 200,\'men\', NOW()),\n                (\'viva\',\'coconut oil\', \'/asset/Images/viva_coconut_oil_1.jpg\', 200,\'men\', NOW());';
                _Helper2.default.executeQuery(sql).then(function (result) {
                    return done();
                }).catch(function (err) {
                    return done();
                });
            }).catch(function (err) {
                return done();
            });
        });
        afterEach(function (done) {
            _Helper2.default.executeQuery('DROP TABLE IF EXISTS BASE_ITEM CASCADE').then(function (result) {
                return done();
            }).catch(function (err) {
                return done();
            });
        });
        _this.timeout(40000);
        it('res should be an object', function (done) {
            _chai2.default.request(_index2.default).get('/api/v1/getStoreItems').type('form').end(function (err, res) {
                expect(res).to.be.an('object');
                done();
            });
        });
        it('response.body to have property message', function (done) {
            _chai2.default.request(_index2.default).get('/api/v1/getStoreItems').type('form').end(function (err, res) {
                expect(res.body).to.have.property('message');
                done();
            });
        });
        it('response.body to have property items', function (done) {
            _chai2.default.request(_index2.default).get('/api/v1/getStoreItems').type('form').end(function (err, res) {
                expect(res.body).to.have.property('items');
                done();
            });
        });
        it('response should have  status of 200', function (done) {
            _chai2.default.request(_index2.default).get('/api/v1/getStoreItems').type('form').end(function (err, res) {

                expect(res).to.have.status(200);
                done();
            });
        });
        it('items should be an array', function (done) {
            _chai2.default.request(_index2.default).get('/api/v1/getStoreItems').type('form').end(function (err, res) {
                expect(res.body.items).to.be.an('array');
                done();
            });
        });
    });
});