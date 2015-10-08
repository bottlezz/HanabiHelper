var CardData = function(){
  this.colors= new Set([1,2,3,4,5]);
  this.numbers= new Set([1,2,3,4,5]);
  this.setNumber = function(val){
    this.colors=new Set([val]);
  };
  this.setColor = function(val){
    this.numbers = new Set([val]);
  };
  this.excludeColor = function (val){
    this.colors.delete(val);
  };
  this.excludeNumber = function (val){
    this.numbers.delete(val);
  };
};
module.exports = CardData;
