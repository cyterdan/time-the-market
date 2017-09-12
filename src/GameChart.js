import React, { Component } from 'react';
import './App.css';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, LineSeries,PlotBand
} from 'react-jsx-highcharts';



class GameChart extends Component {


	//renderer for the x axis bands
	renderPlotBand (band) {
    	const { from, to , color } = band;
    	const id = `${from}-${to}`;
    	return (
    	  <PlotBand id={id} key={id} from={from} to={to} color={color}>
    	    <PlotBand.Label>{band.label}</PlotBand.Label>
    	  </PlotBand>
    	);
  	}

  	//formats the dates as elapsd months [0,1,2,...] 
	xAxisLabelFormatter(val)  {		
		      return Math.round((this.value-this.axis.dataMin)/(1000 * 60 * 60 * 24*30));
	};	




	render() {
	  return (

	  	 <HighchartsChart  >
          <Chart type ="line" animation={true} height={700} />

          <Title>{this.props.i18n['chart.title']}</Title>

          <Legend enabled={false}>
          </Legend>

          <XAxis type="datetime" labels={{enabled:true,formatter : this.xAxisLabelFormatter	}}>
            <XAxis.Title>{this.props.i18n['xaxis.title']}</XAxis.Title>  
            {this.props.bands.map(this.renderPlotBand)}
        
          </XAxis>

          <YAxis id="Value">
            <YAxis.Title>{this.props.i18n['yaxis.title']}</YAxis.Title>
            <LineSeries id="msci" name="MSCI world" color="#808080" data={this.props.chartData} />

          </YAxis>
        </HighchartsChart>

   	);
	}
}

export default GameChart;

