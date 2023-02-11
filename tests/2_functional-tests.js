const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite('Functional Tests', function() {
    this.timeout(5000);
    test("test GET /api/convert with valid input",(done)=>{
        chai
          .request(server)
          .get('/api/convert?input=10L')
          .end((err, res)=>{
            assert.equal (res.status, 200)
            assert.equal (res.type, "application/json")
            assert.equal(res.body.returnNum, (10 / galToL).toFixed(5))
            assert.equal(res.body.returnUnit, "gal")
            done()
        })
    })
    test("test GET /api/convert with invalid unit",(done)=>{
        chai
          .request(server)
          .get('/api/convert?input=32g')
          .end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.text, 'invalid unit')
            done()
        })
    })
    test("test GET /api/convert with invalid number",(done)=>{
        chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res)=>{
            assert.equal (res.status, 200)
            assert.equal(res.text, 'invalid number')
            done()
        })
    })
    test("test GET /api/convert with invalid number and unit",(done)=>{
        chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res)=>{
            assert.equal (res.status, 200)
            assert.equal(res.text, 'invalid number and unit')
            done()
        })
    })
    test("test GET /api/convert with no number",(done)=>{
        chai
          .request(server)
          .get('/api/convert?input=kg')
          .end((err, res)=>{
            assert.equal (res.status, 200)
            assert.equal (res.type, "application/json")
            assert.equal(res.body.returnNum, (1 / lbsToKg).toFixed(5))
            assert.equal(res.body.returnUnit, "lbs")
            done()
        })
    })
});
