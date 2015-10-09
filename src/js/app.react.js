var React = require('react');
var ReactDOM = require('react-dom');
// $=require('jquery');
// var bootstrap = require('bootstrap');
var HanabiCard = require('./hanabiCard.react');
var CardData = require('./cardData');

var HanabiHelper = React.createClass({
  getInitialState: function(){
    return {
      gameStatus:0,//1 started.
      numOfCards:4,
      cards:[],
      selected:new Set()

    };
  },
  setCardNum : function(val){
    this.setState({gameStatus:1,numOfCards:val});
    let cards=[];
    for(let i=0;i<val;i++){
      cards[i]=new CardData();
    }
    this.setState({cards:cards});
  },
  setSelectedNumber:function(val){
    var selected = this.state.selected;
    var cards = this.state.cards;
    for(var i=0;i < cards.length; i++){
      if(selected.has(i)){
        cards[i].setNumber(val);
      } else {
        cards[i].excludeNumber(val);
      }
    }
    this.setState({cards:cards,selected:new Set()});
  },
  setSelectedColor:function(val){
    var selected = this.state.selected;
    var cards = this.state.cards;
    for(var i=0;i < cards.length; i++){
      if(selected.has(i)){
        cards[i].setColor(val);
      } else {
        cards[i].excludeColor(val);
      }
    }
    this.setState({cards:cards,selected:new Set()});
  },
  selectCard : function(val){

    let curSet=this.state.selected;

    if(curSet.has(val)){
      curSet.delete(val);
    }else{
      curSet.add(val);
    }
    this.setState({selected:curSet});
    console.log('select');

  },
  discardCard : function(val){
    let cards=this.state.cards;
    cards.splice(val,1);
    cards.splice(0,0,new CardData());
    this.setState({selected:new Set(),cards:cards});
    console.log("discard");
  },
  renderCard:function(c,index){

    return (
      <HanabiCard
        key={index}
        onCardClick={this.selectCard.bind(this,index)}
        isSelected={this.state.selected.has(index)}
        onCardDiscard={this.discardCard.bind(this,index)}
        cardData={c}/>
    );
  },
  render:function(){
    var hintOptions="";
    if(this.state.selected.size>0){
      hintOptions = (
        <div className="optionBar">
        <button
          className="btn btn-default"
          onClick={this.setSelectedNumber.bind(this,1)}>1</button>
        <button
          className="btn btn-default"
          onClick={this.setSelectedNumber.bind(this,2)}>2</button>
        <button
          className="btn btn-default"
          onClick={this.setSelectedNumber.bind(this,3)}>3</button>
        <button
          className="btn btn-default"
          onClick={this.setSelectedNumber.bind(this,4)}>4</button>
        <button
          className="btn btn-default"
          onClick={this.setSelectedNumber.bind(this,5)}>5</button>
        <button
          className="btn btn-default"
          style={{backgroundColor:'red'}}
          onClick={this.setSelectedColor.bind(this,'red')}> - </button>
        <button
          className="btn btn-default"
          style={{backgroundColor:'white'}}
          onClick={this.setSelectedColor.bind(this,'white')}>-</button>
        <button
          className="btn btn-default"
          style={{backgroundColor:'blue'}}
          onClick={this.setSelectedColor.bind(this,'blue')}>-</button>
        <button
          className="btn btn-default"
          style={{backgroundColor:'yellow'}}
          onClick={this.setSelectedColor.bind(this,'yellow')}>-</button>
        <button
          className="btn btn-default"
          style={{backgroundColor:'green'}}
          onClick={this.setSelectedColor.bind(this,'green')}>-</button>
      </div>);
    }

    if(this.state.gameStatus == 0) {
      return (
        <div className="col-xs-12">

          <h3 className="col-xs-offset-1">
            how many cards?
          </h3>

          <div className="col-xs-offset-1">

            <button
              className="btn btn-default btn-lg"
              onClick={this.setCardNum.bind(this,4)}>4</button>

            <button
              className="btn btn-default btn-lg"
              onClick={this.setCardNum.bind(this,5)}>5</button>

          </div>
        </div>
      );
    }else if(this.state.gameStatus == 1){

      return (
        <div className=" col-xs-12">
           { hintOptions }
          <div className="row">
            <div className='col-xs-1'>
            </div>
           { this.state.cards.map(this.renderCard) }

          </div>
        </div>
      );
    }else {
      return (
        <div>
          hello wold
        </div>
      );
    }


  }
});

ReactDOM.render(
  <HanabiHelper />,
  document.getElementById('container')
);
