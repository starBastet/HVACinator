import React, {Component} from 'react';
import './MonthCalendar.css';


class MonthCalendar extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			calendarDataA:this.props.calendarDataA,
			className:'monthCalendarContainer',
			isOpen:this.props.isOpen
		};
		
		this.dayLabelsA = this.props.dayLabelsA;
		this.monthDetailsA = this.props.monthDetailsA;
		
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.isOpen !== this.state.isOpen)
		{
			if (newProps.isOpen === true)
			{
				this.show();
			}
			else
			{
				this.hide();
			}
		}
	}
	
	show()
	{
		this.setState(
		{
			className:'monthCalendarContainer show',
			isOpen:true
		});
	}
	
	hide()
	{
		this.setState(
		{
			className:'monthCalendarContainer',
			isOpen:false
		});
	}
	
	compileJsx()
	{
		var weekdayJsxA = [];
		var daysJsxA = [];
		var dayNum = 1;
		
		var i;
		
		for (i=0;i<this.dayLabelsA.length;i++)
		{
			var weekdayJsx = <li key={'weekdayTitle'+i}>
								{this.dayLabelsA[i]}
							 </li>
			
			weekdayJsxA.push(weekdayJsx);
		}
		
		for (i=0;i<35;i++)
		{
			var daysJsx;
			
			if (i >= Number(this.monthDetailsA.FIRST_DAY) && i < (Number(this.monthDetailsA.TOTAL_DAYS)+Number(this.monthDetailsA.FIRST_DAY)))
			{
				daysJsx = <li className={'dayCell'} key={'weekday'+i}>
							<div className={'dayNumLabel'}>
								{dayNum}
							</div>
							<div className={'dayDetails'}>
								{/* THIS BIT HAS AN EXTRA (unused) DATA POINT */}
								{/*<div className={'dayHeat'}>
									{this.state.calendarDataA[dayNum-1][0][0]} / {this.state.calendarDataA[dayNum-1][0][1]}
								</div>
								<div className={'dayAc'}>
									{this.state.calendarDataA[dayNum-1][1][0]} / {this.state.calendarDataA[dayNum-1][1][1]}
								</div>*/}
								<div className={'dayHeat'}>
									{this.state.calendarDataA[dayNum-1][0][1]} hrs
								</div>
								<div className={'dayAc'}>
									{this.state.calendarDataA[dayNum-1][1][1]} hrs
								</div>
							</div>
						  </li>
						  
				dayNum++;
			}
			else
			{
				daysJsx = <li className={'dayCell'} key={'weekday'+i}>
							<div className={'dayNumLabel'}>
								&nbsp;
							</div>
						  </li>
			}
			
			daysJsxA.push(daysJsx);
		}
		
		var jsx = <div>
					<ul>
						{weekdayJsxA}
					</ul>
					<ul className={'daysList'}>
						{daysJsxA}
					</ul>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div className={this.state.className}>
				{jsx}
			</div>
		);
	}
}

export default MonthCalendar;