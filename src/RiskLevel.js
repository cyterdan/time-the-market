import React, { Component } from 'react';
import { Button,ButtonGroup} from 'react-bootstrap';

import './App.css';

class RiskLevel extends Component {
  render() {
    return (
    	 <ButtonGroup >

	    	<Button bsStyle="success" block color="blue" onClick={() => this.props.allocationChange(100)}>100% stocks</Button> 
	   		<Button bsStyle="success" block onClick={() => this.props.allocationChange(80)}>80% stocks</Button>
	    	<Button bsStyle="success" block onClick={() => this.props.allocationChange(50)}>50% stocks</Button>
	    	<Button bsStyle="success" block onClick={() => this.props.allocationChange(20)}>20% stocks</Button>
	    	<Button bsStyle="success" block onClick={() => this.props.allocationChange(0)}> 0% stocks  </Button>
      	</ButtonGroup>
    );
  }
}
export default RiskLevel;
