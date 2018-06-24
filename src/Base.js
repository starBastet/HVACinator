import React, {Component} from 'react';
import './Base.css';
import data from './data/json.json';
import Header from './elements/header/Header';
import Footer from './elements/footer/Footer';
import MonthManager from './elements/months/MonthManager';


class Base extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			jDataA:data,
			monthDetailsA:data.MONTHS,
			tempDataA:[]
		};
		
		this.monthDataA = [];
		
		this.getData = this.getData.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		var monthsA = this.state.jDataA.MONTHS;
		for (var i=0;i<monthsA.length;i++)
		{
			this.monthDataA.push(Number(monthsA[i].TOTAL_DAYS));
		}
		
		this.getData();
	}
	
	getData()
	{
		var monthsA = [];
		var daysA = [];
		var monthNum = 0;
		
		for (var i=0;i<this.monthDataA.length;i++)
		{
			for (var j=0;j<this.monthDataA[i];j++)
			{
				// MONTH STRING
				var month = i+4;
				month = month < 10 ? month = '0'+month : month;
				var day = j+1;
				day = day < 10 ? day = '0'+day : day;
				
				fetch('https://api.darksky.net/forecast/YOUR API KEY HERE/45.5898,-122.5951,2018-'+month+'-'+day+'T00:00:00?exclude=currently,flags')
				.then(results =>
				{
					return results.json();
				})
				.then(data =>
				{
					var hoursA = [];
					for(var x=0;x<data.hourly.data.length;x++)
					{
						hoursA.push(data.hourly.data[x].temperature);
					}
					
					daysA.push(hoursA);
					if (daysA.length >= this.monthDataA[monthNum])
					{
						monthsA.push(daysA);
						monthNum++;
						daysA = [];
					}
					
					if (monthNum >= this.monthDataA.length)
					{
						this.setState(
						{
							tempDataA:monthsA
						});
					}
				})
			}
		}
	}
	
	componentDidMount()
	{
		
	}
	
	compileJsx()
	{
		if (this.state.tempDataA.length === 0)
		{
			return;
		}
		
		var jsx = <div>
					<Footer
						dataA={this.state.jDataA.FOOTER}
					/>
					<Header
						dataA={this.state.jDataA.HEADER}
					/>
					<MonthManager
						descriptorLabel={this.state.jDataA.DESCRIPTOR_LABEL}
						monthDetailsA={this.state.monthDetailsA}
						dayLabelsA={this.state.jDataA.DAY_LABELS}
						tempDataA={this.state.tempDataA}
					/>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'appContainer'}>
				{jsx}
			</div>
		);
	}
}

export default Base;