import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import axios from 'axios';
import { selectToiletFromMap } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import API_KEY from '../../keys.js';

import {connect} from 'react-redux';

const image = '../src/assets/toilet_icon.png';

export default class SimpleMap extends Component{

  constructor(props) {
    super(props);
    this.state = { hide: true, current: null, currentAddress: null };
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: false,
      streetViewControl: true,
      streetViewControlOptions:true,
      zoomControl:true,
      zoomControlOptions: true,
      panControl:true,
      panControlOptions: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick(index) {
    this.setState({
      ['marker' + index]: false,
      current: null
    });
  }

  onClick(e) {
    console.log('onClick', this.state)
    let curr = this.state.current;
    if (curr) this.setState({ ['marker' + curr]: false, current: null });

    console.log('A \n','onClick, selected toilet is:', this.props.toilets[e]);
    this.props.selectToiletFromMap(this.props.toilets[e])
    .then( (data) => {
      console.log('D \n', ' then, data .......is:', data);
      this.setState({
        ['marker' + e]: true,
        current: e,
        currentAddress: data.payload.address
      })

    })
    .catch( (err) => {
      console.log('error:', err);
    });
  }


  renderMarkers() {
    console.log('E \n','mapping markers...', this.props.toilets);
    return this.props.toilets.map((toilet, index) => {
          return (
            <Marker
              key={index}
              lat={toilet.latitude}
              lng={toilet.longitude}
              title={toilet.description}
              draggable={false}
              icon = {image}
              onClick={this.onClick.bind(this, index)}
            />
          )
    })
  }

  renderInfoWindows() {
    console.log('inside renderInfoWindows', this.state.currentAddress);
    return this.props.toilets.map((toilet, index) => {
          if (!this.state['marker' + index]) {
            return (null);
          } else {
            let loc = `${toilet.latitude},${toilet.longitude}`;
            let url = `https://maps.googleapis.com/maps/api/streetview?size=300x200&location=${loc}&pitch=-0.90&key=${API_KEY.maps}`
            return (
              <InfoWindow
                style={{'border':'1px black solid'}}
                className='testing'
                key={index}
                lat={toilet.latitude}
                lng={toilet.longitude}
                content={'<img src="' + url + '" style="border:1px black solid"/><div>' + toilet.name+' -- '+toilet.description+' -- '+toilet.address + '</div>' }
                onCloseClick={this.onCloseClick.bind(this, index)}
              />
            )
          }
      })
  }


  render() {
    if(!this.props.toilets){
      return null;
    }
    let markers = this.renderMarkers();
    let infoWindows = this.renderInfoWindows();
    if(typeof this.props.toilets === "string"){
      console.log("inside if")
      return (
        <div>
        <h3>{this.props.toilets}</h3>
        </div>
      )
    }

    return (
        // let lat = ;
        //lng = ;
        // if(this.state.current) {
        //
        // }

        <Gmaps
          width={'1200px'}
          height={'600px'}
          lat={34.016484}
          lng={-118.496216}
          zoom={13}
          loadingMessage={'Loading...'}
          params={{v: '3.exp', key: 'AIzaSyB85KqmtnH-PdxoaFTRZRWZJLI6H48oa-Q'}}
          onMapCreated={this.onMapCreated}
        >
          {markers}
          {infoWindows}
        </Gmaps>
    );
  }
};


function mapStateToProps(state){
  return{
    toilets:state.toilets //from rootReducer (index.js in reducers)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectToiletFromMap }, dispatch);
}


export default connect (mapStateToProps, mapDispatchToProps)(SimpleMap);
