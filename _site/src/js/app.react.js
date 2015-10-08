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
  selectCard : function(val){

    let curSet=this.state.selected;

    if(curSet.has(val)){
      curSet.delete(val);
    }else{
      curSet.add(val);
    }
    this.setState({selected:curSet})

  },
  renderCard:function(c,index){

    return (<HanabiCard onCardClick={this.selectCard.bind(this,index)} isSelected={this.state.selected.has(index)} cardData={c}/>);
  },
  render:function(){
  //  console.log(this.state.gameStatus);


    if(this.state.gameStatus == 0) {
        return (
          <div className="col-xs-12">
            <h3 className="col-xs-offset-1">
              how many cards?
            </h3>
            <div className="col-xs-offset-1">
              <button className="btn btn-default btn-lg" onClick={this.setCardNum.bind(this,4)}>4</button>
              <button className="btn btn-default btn-lg" onClick={this.setCardNum.bind(this,5)}>5</button>
            </div>
          </div>
        );
    }else if(this.state.gameStatus == 1){

      return (<div className=" col-xs-12">
      <div className="row">
        <div className='col-xs-1'></div>
        {this.state.cards.map(this.renderCard)}
      </div>

      </div>);
    }else {
        return (<div>hello wold</div>);
    }


  }
});

ReactDOM.render(<HanabiHelper />, document.getElementById('container'));
