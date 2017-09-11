import React, { Component } from 'react';
import { Button,ListGroup,ListGroupItem} from 'react-bootstrap';

import './App.css';

class RiskLevel extends Component {
  render() {
    return (
      <div>
       <ListGroup>
    		<ListGroupItem> <Button bsStyle="success" onClick={() => this.props.allocationChange(100)}>100% stocks</Button> </ListGroupItem>
   			<ListGroupItem> <Button bsStyle="success" onClick={() => this.props.allocationChange(80)}>80% stocks</Button></ListGroupItem>
    		<ListGroupItem> <Button bsStyle="success" onClick={() => this.props.allocationChange(50)}>50% stocks</Button></ListGroupItem>
    		<ListGroupItem> <Button bsStyle="success" onClick={() => this.props.allocationChange(20)}>20% stocks</Button></ListGroupItem>
    		<ListGroupItem> <Button bsStyle="success" onClick={() => this.props.allocationChange(0)}>00% stocks</Button></ListGroupItem>
	  </ListGroup>
      </div>
    );
  }
}
export default RiskLevel;
