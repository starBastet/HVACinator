import React, {Component} from 'react';
import './MonthManager.css';
import Month from './Month';


class MonthManager extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			tempDataA:this.props.tempDataA
		};
		
		this.descriptorLabel = this.props.descriptorLabel;
		this.monthDetailsA = this.props.monthDetailsA;
		this.dayLabelsA = this.props.dayLabelsA;
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.show,1300);
	}
	
	show()
	{
		this.setState(
		{
			className:'show'
		});
	}
	
	compileJsx()
	{
		var jsxA = [];
		
		for (var i=0;i<this.state.tempDataA.length;i++)
		{
			var jsx = <div key={'month'+i}>
						<Month
							monthDetailsA={this.monthDetailsA[i]}
							dayLabelsA={this.dayLabelsA}
							tempDataA={this.state.tempDataA[i]}
						/>
					  </div>
			
			jsxA.push(jsx);
		}
		
		return jsxA;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'monthManagerContainer'} className={this.state.className}>
				<div id={'monthDescriptorLabel'}>
					{this.descriptorLabel}
				</div>
				{jsx}
			</div>
		);
	}
}

export default MonthManager;