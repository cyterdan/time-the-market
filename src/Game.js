import React, { Component } from 'react';
import { Col,Row,Panel,Button,Modal,FormControl} from 'react-bootstrap';
import './App.css';
import RiskLevel from './RiskLevel'
import GameChart from './GameChart'
import Portfolio from './Portfolio'
import EndPanel from './EndPanel'
import msciWorld from './msciWorld'

//generate random integer between min and max
function randomIntFromInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

// 2000-01-01 => UTC date
function dateFromStr(str) {
        var parts = str.split("-");
        return Date.UTC(parts[0], parts[1] - 1, parts[2])
    }

//initializing 
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
    		showModal: false,
    		gameEnded : false,
    		gameSpeed : 2000
  		};

class Game extends Component {
    
	constructor(props) {
  		super(props);
  	
  		this.state = initialState;
  
	};

	reset(){
		var speed = this.state.gameSpeed;
		var rand = randomIntFromInterval(0, msciWorld.length-12*8);
		this.state = initialState;
		this.setState({gameSpeed : speed});
	}

    risk(proportion) {
        if (proportion === 0)
            return {color: '#edffd0', label: '0% '+this.props.i18n['stocks']};
        if (proportion === 20)
            return {color: '#d3ffba', label: '20% '+this.props.i18n['stocks']};
        if (proportion === 50)
            return {color: '#b7ffa2', label: '50% '+this.props.i18n['stocks']};
        if (proportion === 80)
            return {color: '#97ff88', label: '80% '+this.props.i18n['stocks']};
        if (proportion === 100)
            return {color: '#70ff69', label: '100% '+this.props.i18n['stocks']};
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

	changeSpeed(e){
		var speed = e.target.value;
		this.setState({gameSpeed:speed});
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
            	this.setState({gameEnded:true});
            }

           
    }

  handleAllocationChange(e){
  
  	
  	if(this.state.firstChange){
  		
  		var intervalId = setInterval( this.updateData.bind(this) , this.state.gameSpeed);
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
	      			<h4>{this.props.i18n['title']}</h4>

					<h5><i>{this.props.i18n['subtitle1']}
					<a href="https://qz.com/487013/this-game-will-show-you-just-how-foolish-it-is-to-sell-stocks-right-now/">{this.props.i18n['subtitleLink']}</a>
					{this.props.i18n['subtitle2']}</i></h5>
					 
				</Col>
				<Col xs={12} md={12} >
					<Button onClick={this.openModal}> {this.props.i18n['instructionBtn']}  </Button>

					<Modal show={this.state.showModal} onHide={this.closeModal}>
			          <Modal.Header closeButton>
			            <Modal.Title>{this.props.i18n['modal.title']}</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <h4> {this.props.i18n['modal.body.1']}
			            	<br />
			            	<br />
			    
			    			{this.props.i18n['modal.body.2']}
			    			<br />
						    {this.props.i18n['modal.body.3']}
						    <br />
						    <br />
						    <b>{this.props.i18n['modal.body.4']}</b>
			 		   		
			    			
						</h4>
	           		</Modal.Body>
	          		<Modal.Footer>
	           			 <Button onClick={this.closeModal}>{this.props.i18n['close']}</Button>
	         	    </Modal.Footer>
	        		</Modal>
				</Col>
				<Col xs={1} xsOffset={10}>	 
					
					<select id="languageSelect" name="languageSelect" onChange={this.props.changeLanguage}>
						<option value="0">{this.props.i18n['language']}...</option>
						<option value="en">English</option>
						<option value="fr">Français</option>
					</select>

				</Col>
					<br />

				<Row>
				<Col xs={2} xsOffset={10}>	 
					
					<select id="speedSelect" name="speedSelect" onChange={this.changeSpeed.bind(this)}>
						<option value="2000">{this.props.i18n['game.speed']}...</option>
						<option value="5000">{this.props.i18n['game.speed.5000']}</option>
						<option value="2000">{this.props.i18n['game.speed.2000']}</option>
						<option value="1000">{this.props.i18n['game.speed.1000']}</option>
						<option value="500">{this.props.i18n['game.speed.500']}</option>
						<option value="100">{this.props.i18n['game.speed.100']}</option>
					</select>

				</Col>
				</Row>

		  	</Panel>
			</Row>
	      	<Row>
		  	    <Col xs={6} md={1}>
		  	    	<Panel>
			  	    	<RiskLevel allocationChange={this.handleAllocationChange.bind(this)} i18n={this.props.i18n}/>
			  	    </Panel>
		  	    </Col>
		  	    <Col xs={12} md={8} >
		  	    	<Panel>
			  	    	<GameChart msci={msciWorld} startDate={this.state.startDate} chartData={this.state.chartData} bands={this.state.bands} i18n={this.props.i18n} />
			  	    </Panel>
		  	    </Col>
		  	     <Col xs={12} md={3}>
		  	     	<Panel>
		  	    		
		  	    		<Portfolio title={this.props.i18n['your.portfolio.title']} value={this.state.value}/>
		  	    		<Portfolio title={this.props.i18n['reference.portfolio.title']} value={this.state.reference} />

		  	    	</Panel>
		  	    	<Panel>
		  	    		<EndPanel portfolio={this.state.value} reference={this.state.reference} gameEnded={this.state.gameEnded} i18n={this.props.i18n} startDate={msciWorld[this.state.rand][0]} endDate={msciWorld[this.state.i-1][0]}/>
		  	    		<Button id="reset" onClick={this.reset.bind(this)}>Reset</Button>
		  	    	</Panel>
		  	    </Col>
		  	 </Row>
	      </div>
	    );
	  }
	}
export default Game;
