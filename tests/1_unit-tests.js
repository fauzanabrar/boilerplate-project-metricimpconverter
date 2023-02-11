const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('input number', ()=>{
        assert.equal(convertHandler.getNum('12mi'), 12)
    })
    test('input decimal number', ()=>{
        assert.equal(convertHandler.getNum('12.2mi'), 12.2)
    })
    test('input fractional number', ()=>{
        assert.equal(convertHandler.getNum('12/2mi'), 6)
    })
    test('input fractional decimal number', ()=>{
        assert.equal(convertHandler.getNum('12.2/2mi'), 6.1)
    })
    test('error double fractional number', ()=>{
        assert.isNotOk(convertHandler.getNum('3/2/3mi'))
    })
    test('input just unit', ()=>{
        assert.equal(convertHandler.getUnit('mi'), 'mi')
    })
    test('input valid unit', ()=>{
        assert.equal(convertHandler.getUnit('12.2mi'), 'mi')
    })
    test('input error unit', ()=>{
        assert.isNull(convertHandler.getUnit('12.2min'))
    })
    test('input unit and get return unit', ()=>{
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    })
    test('get spelled out string unit', ()=>{
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
    })
    test('convert gal to L', ()=>{
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541)
    })
    test('convert L to gal', ()=>{
        assert.equal(convertHandler.convert(1, 'L'), (1 / 3.78541).toFixed(5))
    })
    test('convert mi to km', ()=>{
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934)
    })
    test('convert km to mi', ()=>{
        assert.equal(convertHandler.convert(1, 'km'), (1 /  1.60934).toFixed(5))
    })
    test('convert lbs to kg', ()=>{
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359)
    })
    test('convert kg to lbs', ()=>{
        assert.equal(convertHandler.convert(1, 'kg'), (1 / 0.453592).toFixed(5))
    })
});