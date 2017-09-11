import React, { Component } from 'react';
import { Col,Row } from 'react-bootstrap';
import './App.css';
import RiskLevel from './RiskLevel'
import GameChart from './GameChart'
import msciWorld from './msciWorld'

class Game extends Component {


	constructor(props) {
  		super(props);
  		this.state = {
    		firstChange : true,
    		i : 0,
    		startDate : new Date(),
    		chartData : []
  		};
  
	};



    dateFromStr(str) {
        var parts = str.split("-");
        return Date.UTC(parts[0], parts[1] - 1, parts[2])
    }

	randomIntFromInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    startSimulation(){
    	//select a number randomely, 473 is a magic date (8 years before dataset end)
    	var randomStart = this.randomIntFromInterval(0, 473);
    	var lastDate = this.dateFromStr(this.props.msci[randomStart][0]);


    }

    updateData(){    
  			 //this.setState({chartData:[,{x:2,y:3}]});	
  		

  			 var i = this.state.i;
             var date = this.dateFromStr(msciWorld[i][0]),
                            val	 = msciWorld[i][1];
              	 this.setState({ 
			  chartData: this.state.chartData.concat([{x:date,y:val}]),
			  i : i+1
			});

              //console.log(this.state.chartData); 
           
    }

  handleAllocationChange(e){
  
  	
  	if(this.state.firstChange){
  		
  		var intervalId = setInterval( this.updateData.bind(this) , 1000);
			
  		//this.setState({firstChange :false,intervalId:intervalId});
  	}
  	else{

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
	  	    	<GameChart msci={msciWorld} startDate={this.state.startDate} chartData={this.state.chartData} />
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
