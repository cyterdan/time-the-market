import React, { Component } from 'react';
import { Col,Row } from 'react-bootstrap';
import './App.css';
import RiskLevel from './RiskLevel'
class Game extends Component {
  render() {
    return (
      <div> 
      	<Row>
      		Title and general introduction
	  	</Row>
      	<Row>
	  	    <Col xs={6} md={1}>
	  	    	<RiskLevel />
	  	    </Col>
	  	    <Col xs={12} md={8}>
	  	    	Here is the graph
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
