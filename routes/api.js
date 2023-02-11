'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res)=>{
    let input = req.query.input
    input = input.toLowerCase()
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)

    if( convertHandler.allUnit.includes(initUnit)){
      if(isNaN(initNum) && initNum != '' || initNum == null){
        return res.send('invalid number')
      }

      if(initNum == ''){
        input = 1+input
        initNum = 1
      }
      

      let returnNum = convertHandler.convert(initNum, initUnit)
      let returnUnit = convertHandler.getReturnUnit(input)
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

      return res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      })
    }else if(!convertHandler.allUnit.includes(initUnit) && (isNaN(initNum) || initNum == null)){
      return res.send("invalid number and unit")

    }else{
      return res.send("invalid unit")
    }

  })

};
