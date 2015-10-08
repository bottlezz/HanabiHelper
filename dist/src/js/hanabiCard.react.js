var React = require('react');
var HanabiCard = React.createClass({


  render:function(){
    var css=" ";

    if(this.props.isSelected){
      css+="selected";
    }
    var numberString = "";

    if(this.props.cardData.numbers.size==1){


    }else{

    }
    return (<div className={"card col-xs-2"+css} onClick={this.props.onCardClick}></div>);
  }
});
module.exports = HanabiCard;
