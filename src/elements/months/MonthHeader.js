import React, {Component} from 'react';
import './MonthHeader.css';


class MonthHeader extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			headerDataA:this.props.headerDataA
		};
		
		this.monthName = this.props.monthName;
		this.clickCallback = this.props.clickCallback;
		
		this.clicked = this.clicked.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		
	}
	
	clicked()
	{
		this.clickCallback();
	}
	
	compileJsx()
	{
		var jsx = <div>
					<div className={'monthHeaderLabel'}>
						{this.monthName}
					</div>
					<div className={'monthHeaderDetails'}>
						<div className={'monthHeat'}>
							HEAT: {this.state.headerDataA[0][0]} / {this.state.headerDataA[0][1]}
						</div>
						<div className={'monthAc'}>
							AC: {this.state.headerDataA[1][0]} / {this.state.headerDataA[1][1]}
						</div>
					</div>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div className={'monthHeaderContainer'} onClick={this.clicked}>
				{jsx}
			</div>
		);
	}
}

export default MonthHeader;