import React, { Component } from 'react';
import { Col,Row } from 'react-bootstrap';
import './App.css';
import RiskLevel from './RiskLevel'
import GameChart from './GameChart'
import msciWorld from './msciWorld'

class Game extends Component {

	
    
	constructor(props) {
  		super(props);
  		 //select a number randomely, 473 is a magic date (8 years before dataset end)
  		var rand =this.randomIntFromInterval(0, msciWorld.length-12*8);

  		this.state = {
    		firstChange : true,
    		i : rand,
    		rand : rand,
    		startDate : this.dateFromStr(msciWorld[rand][0]),
    		chartData : [],
    		bands : []
  		};
  
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

    dateFromStr(str) {
        var parts = str.split("-");
        return Date.UTC(parts[0], parts[1] - 1, parts[2])
    }

	randomIntFromInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    updateData(){    
  			 var i = this.state.i;
             var date = this.dateFromStr(msciWorld[i][0]),
                            val	 = msciWorld[i][1];
              	 this.setState({ 
			  chartData: this.state.chartData.concat([{x:date,y:val}]),
			  i : i+1,
			  currentDate : date
			});
             //after 8 years, the game ends
            if(this.state.i-this.state.rand > 8 * 12){
            	clearInterval(this.state.intervalId);
            }

           
    }

  handleAllocationChange(e){
  
  	
  	if(this.state.firstChange){
  		
  		var intervalId = setInterval( this.updateData.bind(this) , 400);
  		this.setState({currentProportion : e,firstChange :false,intervalId:intervalId,lastDate:this.state.startDate});
  	}
  	else{
  		this.addBand(this.state.lastDate,this.state.currentDate,this.risk(this.state.currentProportion).color,this.risk(this.state.currentProportion).label);
  		this.setState({lastDate:this.state.currentDate,currentProportion : e})
  		console.log(e);
  	}


  }

  render() {
    return (
      <div> 
      	<Row>
      		Title and general introduction
	  	</Row>
      	<Row>
	  	    <Col xs={6} md={1}>
	  	    	<RiskLevel allocationChange={this.handleAllocationChange.bind(this)}/>
	  	    </Col>
	  	    <Col xs={12} md={8}>
	  	    	<GameChart msci={msciWorld} startDate={this.state.startDate} chartData={this.state.chartData} bands={this.state.bands} />
	  	    </Col>
	  	     <Col xs={12} md={3}>
	  	    	Here the result
	  	    </Col>
	  	 </Row>
      </div>
    );
  }
}
export default Game;
