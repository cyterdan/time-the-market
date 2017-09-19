import React, { Component } from 'react';
import './App.css';

class Portfolio extends Component {



  render() {
    return (
      <div>  
        <h3>{this.props.title}</h3>
          <h2>{Math.round(this.props.value,2)} €</h2>
      
      </div>
    );
  }
}
export default Portfolio;
