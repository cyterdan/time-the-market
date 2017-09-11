import React, { Component } from 'react';
import { Col,Row,Panel,Button,Modal,FormControl} from 'react-bootstrap';
import './App.css';
import RiskLevel from './RiskLevel'
import GameChart from './GameChart'
import Portfolio from './Portfolio'
import msciWorld from './msciWorld'


function randomIntFromInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

function dateFromStr(str) {
        var parts = str.split("-");
        return Date.UTC(parts[0], parts[1] - 1, parts[2])
    }

const rand =randomIntFromInterval(0, msciWorld.length-12*8);
const initialState = {
    		firstChange : true,
    		i : rand,
    		rand : rand,
    		startDate : dateFromStr(msciWorld[rand][0]),
    		chartData : [],
    		bands : [],
    		value : 10000,
    		reference : 10000,
    		showModal: false
  		};

class Game extends Component {

	
    
	constructor(props) {
  		super(props);
  		 //select a number randomely, 473 is a magic date (8 years before dataset end)
  		

  		this.state = initialState;
  
	};

    risk(proportion) {
        if (proportion === 0)
            return {color: '#edffd0', label: '0% invested'};
        if (proportion === 20)
            return {color: '#d3ffba', label: '20% invested'};
        if (proportion === 50)
            return {color: '#b7ffa2', label: '50%  invested'};
        if (proportion === 80)
            return {color: '#97ff88', label: '80% invested'};
        if (proportion === 100)
            return {color: '#70ff69', label: '100% invested '};
        ;

    }

	addBand(from,to,color,label){
		this.setState({
			  bands: this.state.bands.concat(
			  	[{
			  		from:from,
			  		to:to,
			  		color:color,
			  		label:label
			  	}])
			});
	}


    updateData(){    
  			 var i = this.state.i;
             var date = dateFromStr(msciWorld[i][0]),
                            val	 = msciWorld[i][1];
             var previous = msciWorld[i - 1][1];
             var perfMsci = (val - previous) / previous;
             var perfEuro = 0.0018;
             var capital = this.state.value * 
             (1 + 
             	(perfEuro * (100-this.state.currentProportion)/100 + perfMsci * (this.state.currentProportion/100)))
             var reference = this.state.reference * (1+perfMsci);
              	 this.setState({ 
			  chartData: this.state.chartData.concat([{x:date,y:val}]),
			  i : i+1,
			  currentDate : date,
			  value: capital,
			  reference : reference
			});
             //after 8 years, the game ends
            if(this.state.i-this.state.rand > 8 * 12){
            	clearInterval(this.state.intervalId);
            	this.addBand(this.state.lastDate,this.state.currentDate,this.risk(this.state.currentProportion).color,this.risk(this.state.currentProportion).label);
            }

           
    }

  handleAllocationChange(e){
  
  	
  	if(this.state.firstChange){
  		
  		var intervalId = setInterval( this.updateData.bind(this) , 1000);
  		this.setState({currentProportion : e,firstChange :false,intervalId:intervalId,lastDate:this.state.startDate});
  	}
  	else{
  		this.addBand(this.state.lastDate,this.state.currentDate,this.risk(this.state.currentProportion).color,this.risk(this.state.currentProportion).label);
  		this.setState({lastDate:this.state.currentDate,currentProportion : e})
  	}


  }


	closeModal = () => {
  		this.setState({showModal:false});
	}

	openModal = () => {
    	this.setState({ showModal: true });
	}
  render() {
    return (
      <div> 
      	<Row>
      		<Panel>
      		
      		<Col xs={6} md={12}>
      			<h4>The goal of this game is to demonstrate the difficulty of timing the market</h4>

				<h5><i>Initial idea came from <a href="https://qz.com/487013/this-game-will-show-you-just-how-foolish-it-is-to-sell-stocks-right-now/">this similar game</a> only adapted to 
					a typical French investor scenario</i></h5>
				 
			</Col>
			<Col xs={12} md={12} >
				<Button onClick={this.openModal}> View Instructions </Button>

				<Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>How to play ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>You are given an initial capital of 10000€ <br/><br/>
    
    Over a period of 8 years (randomly selected), you will decide how much of your portfolio 
    should be in "the market" (we'll use MSCI World index in this case).
    The rest of your capital will be invested in a €-fund (fixed 2% annual return)<br/><br/>
    
    You can, of course, change your allocation at any time if you feel like a reversal is coming.
    
    At the end of the simulation, we'll compare your strategy with a portfolio 100% invested in the market.

    <br/>
    The game will start as soon as you choose an initial allocation.
</h4>
           </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
		  	</Col>

		  	</Panel>
		
		</Row>
      	<Row>
	  	    <Col xs={6} md={1}>
	  	    	<Panel>
		  	    	<RiskLevel allocationChange={this.handleAllocationChange.bind(this)}/>
		  	    </Panel>
	  	    </Col>
	  	    <Col xs={12} md={8} >
	  	    	<Panel>
		  	    	<GameChart msci={msciWorld} startDate={this.state.startDate} chartData={this.state.chartData} bands={this.state.bands} />
		  	    </Panel>
	  	    </Col>
	  	     <Col xs={12} md={3}>
	  	     	<Panel>
	  	    		<Portfolio title="Your portfolio" value={this.state.value}/>
	  	    		<Portfolio title="100% invested portfolio" value={this.state.reference} />
	  	    	</Panel>
	  	    </Col>
	  	 </Row>
      </div>
    );
  }
}
export default Game;
