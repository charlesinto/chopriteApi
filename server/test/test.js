import app from '../index'
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import Helper from '../Helper';
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const createuser = {
	"firstname": "charles",
	"lastname": "onuorah",
	"phonenumber": "08163113450",
	"password": "july3450",
	"email": "charles.onuorah@yahoo.com"
}

const dummyUser = {
    password: "$2b$10$UMlCXXsfIhCfyedFpZqk8uXbH2anwFPVqVmGeIqnXQauirv9dnGa2",
    email: "charles.onuorah@yahoo.com",
    phonenumber: "08163113450",
    firstname:"charles",
    lastname: "onuorah"
}

const user = {
    password: "july3450",
    email: "charles.onuorah@yahoo.com",
}

describe('Test all api end points', function(){
    describe('it should get stock items',() => {
        
        beforeEach( done => {
            let sql = `CREATE TABLE IF NOT EXISTS BASE_ITEM(itemid SERIAL, itemame varchar(100),
            imagepath varchar(500), brandname varchar(100),  cost integer,category varchar(50), datecreated timestamp);`
            Helper.executeQuery(sql)
            .then(result => {
                let sql = `INSERT INTO BASE_ITEM(brandname,itemame,imagepath,cost,category, datecreated)
                values
                ('birds','custard', '/asset/Images/birds_custard_1.jpg', 200,'men', NOW()),
                ('melody','bread', '/asset/Images/bread_1.jpg', 150,'men', NOW()),
                ('peak','milk', '/asset/Images/daily_pure_milk_1.jpg', 200,'men', NOW()),
                ('keleops','cereals', '/asset/Images/loop_cereals_1.jpg', 200,'men', NOW()),
                ('olgy','pampers', '/asset/Images/pampers_1.jpg', 200,'men', NOW()),
                ('philips','beard trimmer', '/asset/Images/philips_beard_trimmer.jpg', 200,'men', NOW()),
                ('gucci','sweater', '/asset/Images/sweater_for_women_1.jpg', 200,'men', NOW()),
                ('kelogen','toilet paper', '/asset/Images/toilet_paper_1.jpg', 200,'men', NOW()),
                ('colgate','tooth paste', '/asset/Images/toothpaste_1.jpg', 200,'men', NOW()),
                ('viva','coconut oil', '/asset/Images/viva_coconut_oil_1.jpg', 200,'men', NOW());`
                Helper.executeQuery(sql)
                .then(result => done())
                .catch(err => done())
            })
            .catch(err => done());
        })
        afterEach(done => {
            Helper.executeQuery('DROP TABLE IF EXISTS BASE_ITEM CASCADE')
            .then(result => done())
            .catch(err => done());
        })
        this.timeout(40000);
        it('res should be an object', function(done){
            chai.request(app).get('/api/v1/getStoreItems').type('form').end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.body to have property message', function(done){
            chai.request(app).get('/api/v1/getStoreItems').type('form').end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('response.body to have property items', function(done){
            chai.request(app).get('/api/v1/getStoreItems').type('form').end(function(err,res){
                expect(res.body).to.have.property('items');
                done();
            })
        })
        it('response should have  status of 200',(done)=>{
            chai.request(app).get('/api/v1/getStoreItems').type('form').end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('items should be an array', function(done){
            chai.request(app).get('/api/v1/getStoreItems').type('form').end(function(err,res){
                expect(res.body.items).to.be.an('array');
                done();
            })
        })
    })
})
