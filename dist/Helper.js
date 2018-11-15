'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _DatabaseConnection = require('./DatabaseConnection');

var _DatabaseConnection2 = _interopRequireDefault(_DatabaseConnection);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
*@ helper functions
* @trimeWhiteSpace given an object, it removes the whitespaces in the values of the object
* @validateKey give an object and array of key you expect the object to have, it validates 
* if the obejct contains the key
*@validateInput ensure that the inputs are valid 
*/
var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);

        this.executeQuery = this.executeQuery.bind(this);
        this.connectToDb = this.connectToDb.bind(this);
        // this.assignToken = this.assignToken.bind(this);
    }
    // trimWhiteSpace(obj){
    //     if(typeof obj !== "undefined" && obj !== '' && typeof obj === 'object' && typeof obj.length === "undefined"){

    //         Object.keys(obj).forEach(function(key){ 
    //             if(obj[key] !== null && typeof obj[key] !== "number"){
    //                 obj[key] = obj[key].trim()
    //             }
    //          });
    //         return obj;

    //     }else{
    //         return '';
    //     }
    // }
    // validateKey(obj,keys){
    //     if(typeof obj === "undefined" && typeof obj.length ==="undefined"){
    //         return false;
    //     }else{
    //         let objetctKey = Object.keys(obj);
    //         let keyMatch;
    //         for(let i=0; i < keys.length; i++){
    //             keyMatch = false;
    //             for(let j=0;j<objetctKey.length;j++){
    //                 if(keys[i] === objetctKey[j]){
    //                     keyMatch = true;

    //                 }
    //             }
    //             if(!keyMatch){
    //                 return false;
    //             }
    //         }
    //         if(keyMatch){
    //             return true
    //         }
    //             return false;


    //     }
    // }
    // validateInput(res, obj){
    //     if(typeof obj !== "undefined" && obj !== '' && typeof obj === 'object' && typeof obj.length === "undefined"){

    //         let keys = Object.keys(obj)
    //         for(let i = 0; i< keys.length; i++){
    //             if(keys[i] === 'firstname' || keys[i] === 'lastname' || keys[i] === 'order'){
    //                 if( typeof obj[keys[i]] === undefined || obj[keys[i]] === '' || /[@!#$%^&*()\d~`<>?":{}+=?/]/i.test(obj[keys[i]])){
    //                     res.statusCode = 400;
    //                     res.setHeader('content-type', 'application/json');
    //                     res.json({message:`${keys[i]}  required and no special character allowed`});
    //                     return false;
    //                 }

    //             }
    //             if(keys[i] === 'phonenumber'){
    //                 if( typeof obj[keys[i]] === "undefined" || obj[keys[i]] === '' || !Validator.isNumeric(obj[keys[i]]) || obj[keys[i]].length< 11){
    //                     res.statusCode = 400;
    //                     res.setHeader('content-type', 'application/json');
    //                     res.json({message:`${keys[i]}  required and must be numbers of 11 digits`});
    //                     return false;
    //                 }
    //             }if(typeof obj[keys[i]] !== 'number'  && keys[i] === 'quantity' ){
    //                 if( typeof obj[keys[i]] === "undefined" || obj[keys[i]] === '' || !Validator.isNumeric(obj[keys[i]])){
    //                     res.statusCode = 400;
    //                     res.setHeader('content-type', 'application/json');
    //                     res.json({message:`${keys[i]}  required and must be numbers of 11 digits`});
    //                     return false;
    //                 }
    //             }
    //             if((keys[i] === 'unit_price' || keys[i] === 'amountordered') &&  !/^\d+$/.test(obj[keys[i]])){
    //                 res.statusCode = 400;
    //                 res.setHeader('content-type', 'application/json');
    //                 res.json({message:`${keys[i]}  required and must be numbers `});
    //                 return false;
    //             }
    //             if(keys[i] === 'email'){

    //                 if(!Validator.isEmail(obj[keys[i]])){
    //                     res.statusCode = 400;
    //                     res.setHeader('content-type', 'application/json');
    //                     res.json({message:`${keys[i]}  required and must be in valid format`});
    //                     return false;
    //                 }
    //             }
    //            else if( typeof obj[keys[i]] === "undefined" || obj[keys[i]] === ''){
    //                 res.statusCode = 400;
    //                 res.setHeader('content-type', 'application/json');
    //                 res.json({message:`${keys[i]} required`});
    //                 return false;
    //            }
    //         }
    //         return true;

    //     }else{
    //         return false;
    //     }
    // }
    // veryifyToken (req,res,next){
    //     let key = process.env.SECRET_KEY || 'brillianceisevenlydistributed';
    //     const bearerHeader = req.body.token || req.headers['authorization'];

    //         if (!bearerHeader){
    //             res.status(401).send({
    //                 message: 'Unauthorized user'
    //             });
    //         } else if(typeof bearerHeader !== undefined){
    //             jwt.verify(bearerHeader, key ,(err, authData) => {
    //                 if(err) {
    //                     res.status(403).send({
    //                         message: "Forbidden access"
    //                     });
    //                 }
    //               req.token = authData;
    //               next();
    //             })

    //         }
    // }
    /**
    * Initiates connection a database.
    * @author: charles
    */


    _createClass(Helper, [{
        key: 'connectToDb',
        value: function connectToDb() {
            return new Promise(function (resolve, reject) {
                _DatabaseConnection2.default.connect(function (err, client, done) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(client, done);
                    }
                });
            });
        }
        /**
         * Executes a query againt postgress database
         *
         *
         * @author: charles
         * @param {sql, params} r takes in the sql statement and the parameters to be passed in.
         */

    }, {
        key: 'executeQuery',
        value: function executeQuery(sql, params) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.connectToDb().then(function (client, done) {
                    if (typeof params !== "undefined" && params.length > 0) {
                        client.query(sql, params, function (err, result) {
                            client.release();
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    } else {
                        client.query(sql, function (err, result) {
                            client.release();
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
        /**
        * Assign token to user
        *
        * 
        * @author: chalres
        * @param {payload}  The user details.
        */
        // assignToken(payload){
        //     let key = process.env.SECRET_KEY || 'brillianceisevenlydistributed';
        //     return new Promise((resolve,reject)=>{
        //         jwt.sign(payload,key,{expiresIn:'7 days'},(err,token)=>{
        //             if(err){
        //                 reject(err);       
        //             }else{
        //                 resolve(token);
        //             }
        //         })

        //     })
        // }
        // displayMessage(res,statusCode, message, details){
        //     if(typeof details !== 'undefined'){
        //         res.statusCode = statusCode;
        //         res.setHeader('content-type', 'application/json');
        //         console.log('err', details)
        //         return res.json({message,details});
        //     }
        //     res.statusCode = statusCode;
        //     res.setHeader('content-type', 'application/json');
        //     return res.json({message});
        // }

    }]);

    return Helper;
}();

exports.default = new Helper();