import React, { Component } from 'react';
import './App.css';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';



class GameChart extends Component {

	render() {
		    const xAxisLabelFormatter =  (val) => {
			      return val;

			      console.log(val);
			      //return Math.round((val-this.props.startDate)/(1000 * 60 * 60 * 24*30));
    	  };

	  return (

	  	 <HighchartsChart>
          <Chart type ="line" animation={true}/>

          <Title>Market</Title>

          <Legend enabled={false}>
            <Legend.Title>Legend</Legend.Title>
          </Legend>

          <XAxis type="datetime"  >
            <XAxis.Title>Months elapsed</XAxis.Title>          
          </XAxis>

          <YAxis id="Value">
            <YAxis.Title>Value</YAxis.Title>
            <LineSeries id="msci" name="MSCI world" color="#808080" data={this.props.chartData} />
          </YAxis>
        </HighchartsChart>

   	);
	}
}

export default GameChart;

