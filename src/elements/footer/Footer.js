import React, {Component} from 'react';
import './Footer.css';


class Footer extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			className:''
		};
		
		this.dataA = this.props.dataA;
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.show,3000);
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
		var jsx = <div>
					{this.dataA.BLURB}
					<a href={this.dataA.LINK} target='_blank'>{this.dataA.LINK_TEXT}</a>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'footerContainer'} className={this.state.className}>
				{jsx}
			</div>
		);
	}
}

export default Footer;