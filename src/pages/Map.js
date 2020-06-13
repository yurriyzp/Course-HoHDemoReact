/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
export class MapContainer extends Component {
  /*
 
  */
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      name:"",
      username:""
    };
  }

    render() {
      return (
        <Map google={window.google} containerStyle={{width:"100%",height:"100%" }}
      
      
        initialCenter={{
            lat: this.props.lat||40.854885,
            lng: this.props.lon||35.081807
          }}
        zoom={14}>
            {this.props.markers?this.props.markers.map((val,idx)=>{
              var val=val;
              return (
                  
                  <Marker onClick={
                    
                    ()=>this.props.markerClick(val._id)
                    }
                          name={val.name}
                          position={{lat: val.location.coordinates[1]+Math.random()/10000, lng: val.location.coordinates[0]+Math.random()/10000}} 
                  >
                     
                  </Marker>
              )
            }):(<div></div>)
          }

        </Map>
      );
    }
  }
  export default GoogleApiWrapper({
    apiKey: "AIzaSyAIAQXpfC_ljM4-2c2Ktt4f7BWZWkgRdnE",
   
  })(MapContainer)      