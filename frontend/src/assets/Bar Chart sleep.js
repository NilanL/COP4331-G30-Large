import React, { Component , useState } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

 
class BarChart extends Component {

	


	addSymbols(e){
		var suffixes = ["H", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}

	



	

	render() {




		var _rec = localStorage.getItem('sleep_data');
		var rec = JSON.parse(_rec);
		
		
		const options = {
			animationEnabled: true,
			theme: "light2",
			axisY: {
				title: "Hours",
			},
			axisX: {
				title: "Sleep",
				reversed: true,
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  rec.Hours, label: "Sleep" }
				]
			}]
		}
		





		return (
		<div>
			
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BarChart;