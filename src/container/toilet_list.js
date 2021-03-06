import { Link } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { SelectToilet } from '../actions/index';

class ToiletList extends Component{


	renderList(){
		console.log("inside renderList", this.props.toilets)
		if(typeof this.props.toilets === "string"){
			console.log("inside if")
			return (
				 	<div>
        				<h3>{this.props.toilets}</h3>
        			</div>
			)
		}

		return this.props.toilets.map((toilet, index) => {
			return ( <div className="col-md-4 col-sm-6 col-xs-12 col-lg-3">
				<div
					className="toilet-info"
					onClick={()=> this.props.selectToilet(toilet)}
					style={{cursor:'pointer'}}
					key={index}>
					<div>
						<Link  to={'details'}><ul className='list-group'>
							<li className='list-group-item' key={toilet.id}>
								<h2> {toilet.name}</h2>
								<strong>Toilet Description: {toilet.description}</strong>
							</li>
						</ul></Link>
					</div>
				  </div>
				</div>
			)
		});
	}

	render (){
		if(!this.props.toilets){
      		return null;
    	}

		return (
			<div className="container">
				<div className="row">
					<div>{this.renderList()}</div>
				</div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		toilets:state.toilets
	}
}

function mapDispatchToProps(dispatch){
  //Whenever SearchVal is called, the result should be passed to
  //all of our reducers
  return bindActionCreators({selectToilet:SelectToilet},dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(ToiletList);
