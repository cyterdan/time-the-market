import React, { Component } from 'react';
import { Button,Badge} from 'react-bootstrap';

import './App.css';


class EndPanel extends Component {
  constructor(props) {
      super(props);
  
  };

  render() {
  		var ours = this.props.portfolio;
  		var ref = this.props.reference;
  		if(this.props.gameEnded){
		    if(ours==ref){
		    	return (
			    	<div>
			  		   	<h3>{this.props.i18n['end.title.eq']}</h3>
						<h4>{this.props.i18n['end.between']}<br /> <Badge>{this.props.startDate}</Badge> {this.props.i18n['end.and']} <Badge>{this.props.endDate}</Badge></h4>
		  			</div>
			    );	
		    }
		    if(ours>ref){
			    return (
			    	<div>
				    	<h1>{this.props.i18n['end.title.win']}</h1>
			  		   	{this.props.i18n['end.win.by']} {Math.round(100*(ours-ref)/ref)}% !
						<h4>{this.props.i18n['end.between']}<br /> <Badge>{this.props.startDate}</Badge> {this.props.i18n['end.and']} <Badge>{this.props.endDate}</Badge></h4>
		  			</div>

			    );
		    }
		    if(ours<ref){
		    	return (
		    		<div>
		    			<h1>{this.props.i18n['end.title.lose']}</h1>
			  		   	 {this.props.i18n['end.lose.by']} {Math.round(100*(ref-ours)/ref)}% !
						<h4>{this.props.i18n['end.between']}<br /> <Badge>{this.props.startDate}</Badge> {this.props.i18n['end.and']} <Badge>{this.props.endDate}</Badge></h4>
		  			</div>
		    		);
		    }
		}
		else{
			return null;
		}
  }
}

export default EndPanel