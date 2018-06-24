import React, {Component} from 'react';
import './Month.css';
import MonthHeader from './MonthHeader';
import MonthCalendar from './MonthCalendar';


class Month extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			tempDataA:this.props.tempDataA,
			className:'monthContainer',
			triangleClassName:'monthTriangle',
			isOpen:false
		};
		
		this.monthDetailsA = this.props.monthDetailsA;
		this.dayLabelsA = this.props.dayLabelsA;
		this.headerDataA = [];
		this.calendarDataA = [];
		
		this.compileData = this.compileData.bind(this);
		this.monthClicked = this.monthClicked.bind(this);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		this.compileData();
	}
	
	compileData()
	{
		// MONTHLY (HEADER)
		var totalDaysHeatOn = 0;
		var totalHoursHeatOn = 0;
		var totalDaysAcOn = 0;
		var totalHoursAcOn = 0;
		
		var arr = this.state.tempDataA;
		for (var i=0;i<arr.length;i++)
		{
			// DAILY (CALENDAR)
			var dailyTimesHeatToggledOn = 0;
			var dailyTotalHoursHeatOn = 0;
			var dailyTimesAcToggledOn = 0;
			var dailyTotalHoursAcOn = 0;
			
			var heatToggledOn = false;
			var acToggledOn = false;
			var heatRunning = false;
			var acRunning = false;
			for (var j=0;j<arr[i].length;j++)
			{
				// HEATER
				if (arr[i][j] < 62)
				{
					if (heatRunning === false)
					{
						dailyTimesHeatToggledOn++;
						heatRunning = true;
					}
					dailyTotalHoursHeatOn++;
					
					totalHoursHeatOn++;
					heatToggledOn = true;
				}
				else
				{
					heatRunning = false;
				}
				
				// AC
				if (arr[i][j] > 75)
				{
					if (acRunning === false)
					{
						dailyTimesAcToggledOn++;
						acRunning = true;
					}
					dailyTotalHoursAcOn++;
					
					totalHoursAcOn++;
					acToggledOn = true;
				}
				else
				{
					acRunning = false;
				}
			}
			
			// DAILY
			var dailyHeatDataA = [dailyTimesHeatToggledOn,dailyTotalHoursHeatOn];
			var dailyAcDataA = [dailyTimesAcToggledOn,dailyTotalHoursAcOn];
			var dataA = [dailyHeatDataA,dailyAcDataA];
			this.calendarDataA.push(dataA);
			
			if (heatToggledOn === true)
			{
				totalDaysHeatOn++;
			}
			
			if (acToggledOn === true)
			{
				totalDaysAcOn++;
			}
		}
		
		// MONTHLY
		var monthlyHeatDataA = [totalDaysHeatOn,totalHoursHeatOn];
		var monthlyAcDataA = [totalDaysAcOn,totalHoursAcOn];
		this.headerDataA = [monthlyHeatDataA,monthlyAcDataA];
	}
	
	componentDidMount()
	{
		
	}
	
	monthClicked()
	{
		if (this.state.isOpen === false)
		{
			this.show();
		}
		else
		{
			this.hide();
		}
	}
	
	show()
	{
		this.setState(
		{
			className:'monthContainer show',
			triangleClassName:'monthTriangle hide',
			isOpen:true
		});
	}
	
	hide()
	{
		this.setState(
		{
			className:'monthContainer',
			triangleClassName:'monthTriangle',
			isOpen:false
		});
	}
	
	compileJsx()
	{
		var jsx = <div>
					<MonthHeader
						monthName={this.monthDetailsA.NAME}
						headerDataA={this.headerDataA}
						clickCallback={this.monthClicked}
					/>
					<MonthCalendar
						dayLabelsA={this.dayLabelsA}
						monthDetailsA={this.monthDetailsA}
						calendarDataA={this.calendarDataA}
						isOpen={this.state.isOpen}
					/>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div className={'monthWrapper'}>
				<div className={this.state.className}>
					{jsx}
				</div>
				<div className={this.state.triangleClassName}></div>
			</div>
		);
	}
}

export default Month;