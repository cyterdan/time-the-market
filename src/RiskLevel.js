import React, { Component } from 'react';
import { Button,ListGroup,ListGroupItem} from 'react-bootstrap';

import './App.css';

class RiskLevel extends Component {
  render() {
    return (
      <div> 
        <ListGroup>
    		<ListGroupItem> <Button bsStyle="success">100% stocks</Button> </ListGroupItem>
   			<ListGroupItem> <Button bsStyle="success">80% stocks</Button></ListGroupItem>
    		<ListGroupItem> <Button bsStyle="success">50% stocks</Button></ListGroupItem>
    		<ListGroupItem> <Button bsStyle="success">20% stocks</Button></ListGroupItem>
    		<ListGroupItem> <Button bsStyle="success">00% stocks</Button></ListGroupItem>
	  </ListGroup>
      	  
      	  
      	  
      </div>
    );
  }
}
export default RiskLevel;
