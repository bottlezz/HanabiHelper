var CardData = function(){
  this.colors= ['red','blue','white','green','yellow'];
  this.numbers= [1,2,3,4,5];
  this.setNumber = function(val){
    this.numbers=[val];
  };
  this.setColor = function(val){
    this.colors =[val];
  };
  this.excludeColor = function (val){
    let i=this.colors.indexOf(val);
    if(i!=-1){
      this.colors.splice(i,1);
    }

  };
  this.excludeNumber = function (val){
    let i=this.numbers.indexOf(val);
    if(i!=-1){
      this.numbers.splice(i,1);
    }

  };
};
module.exports = CardData;
