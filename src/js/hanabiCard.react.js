var React = require('react');
var HanabiCard = React.createClass({


  render:function(){
    var css=" ";

    if(this.props.isSelected){
      css+="selected";
    }
    var numberString = "";
    //
    //
    // let numIt=this.props.cardData.numbers.values();
    // let colorIt=this.props.cardData.colors.values();
    let val;
    this.props.cardData.numbers.forEach(function(val,v2){
      numberString= numberString + val+" ";
    });
    var colorDom=[];
    var colorBox=function(key){
      console.log('a');
      return (<div key={key} className='colorBox' style={{backgroundColor:key}}></div>);
    };
    this.props.cardData.colors.forEach(function(val,v2){
      colorDom.push(colorBox(val));
    });
    console.log(colorDom[1]);


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
