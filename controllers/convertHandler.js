function ConvertHandler() {
  
  this.allUnit = ['km', 'mi', 'kg', 'lbs', 'gal', 'L']

  this.getNum = function(input) {
    let result;
    
    result = input.replace(/(?<=\d?)[a-zL]+/, '')

    if(!result){
      return input.replace(/(?<=\d?)[a-zL]+/, '')
    }
    let sp = result.split('/')
    if(sp.length == 1){
      result = Number(sp[0])
    }else if(sp.length == 2 && (isNaN(Number(sp[2])))){
      result = Number(sp[0]) / Number(sp[1])
    }else{
      return null
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let pattern = /(?<=\d?)[a-zL]+/
    result = input.match(pattern)
    if(!result){
      return null
    }
    if(result[0] == 'l'){
      result[0] = 'L'
    }
    return result[0];
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    let map = {
      mi: "km",
      lbs: "kg",
      kg: "lbs",
      km: 'mi',
      gal: "L",
      L: "gal"
    }

    result = map[this.getUnit(initUnit)]

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    let unitMap = {
      mi: "miles",
      lbs: "pounds",
      kg: "kilograms",
      km: 'kilometers',
      gal: "gallons",
      L: "liters"
    }
    result = unitMap[unit]

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    
    if(initUnit == 'gal'){
      result = initNum * galToL
    }else if(initUnit == 'L'){
      result = initNum / galToL
    }else if(initUnit == 'lbs'){
      result = initNum * lbsToKg
    }else if(initUnit == 'kg'){
      result = initNum / lbsToKg
    }else if(initUnit == 'mi'){
      result = initNum * miToKm
    }else if(initUnit == 'km'){
      result = initNum / miToKm
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
