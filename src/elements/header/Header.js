import React, {Component} from 'react';
import './Header.css';


class Header extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			className:'',
			blurbClassName:''
		};
		
		this.dataA = this.props.dataA;
		this.timeout = null;
		this.blurbTimeout = null;
		
		this.show = this.show.bind(this);
		this.showBlurb = this.showBlurb.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.show,100);
		this.blurbTimeout = setTimeout(this.showBlurb,3000);
	}
	
	show()
	{
		this.setState(
		{
			className:'show'
		});
	}
	
	showBlurb()
	{
		this.setState(
		{
			blurbClassName:'show'
		});
	}
	
	compileJsx()
	{
		var jsx = <div>
					<div id={'headerImg'}></div>
					<div id={'headerBlurb'} className={this.state.blurbClassName}>{this.dataA.BLURB}</div>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'headerContainer'} className={this.state.className}>
				{jsx}
			</div>
		);
	}
}

export default Header;