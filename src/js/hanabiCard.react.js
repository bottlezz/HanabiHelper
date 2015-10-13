var React = require('react');
var HanabiCard = React.createClass({


  render:function(){
    var css=" ";

    if(this.props.isSelected){
      css+="selected";
    }
    var numberString = "";


    let numIt=this.props.cardData.numbers.values();
    let colorIt=this.props.cardData.colors.values();
    let val;
    while( val = numIt.next().value){
      numberString= numberString + val+" ";
    }
    var colorDom=[];
    var colorBox=function(key){
      return (<div key={key} className='colorBox' style={{backgroundColor:key}}></div>);
    };
    while(val=colorIt.next().value){
      colorDom.push(colorBox(val));
    }


    return (
      <div className={"card col-xs-2"+css}>
        <div style={{height:'80%'}} onClick={this.props.onCardClick}>
          <h3>{numberString}</h3>
          <div>
            {colorDom}
          </div>
        </div>

        <button className="btn btn-default btn-discard" onClick={this.props.onCardDiscard}>x</button>
      </div>
    );
  }
});
module.exports = HanabiCard;
