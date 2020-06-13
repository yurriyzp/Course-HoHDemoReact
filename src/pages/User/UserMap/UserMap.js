/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import MapComponent from "../../Map";
import {connect} from "react-redux"
import {get_volunteers_near_me} from "../../../store/actions/geo";

import {get_request, setReceiver} from "../../../store/actions/requests"
import {Loading} from "../../LoadingComponent"
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom"
const mapStateToProps=state=>({
    auth:state.auth,
    geo:state.geo,
  
  });
  
  const mapDispatchToProps=(dispatch)=>({
      
      get_rq:(token)=>dispatch(get_volunteers_near_me(token)),
      setId:(id)=>dispatch(setReceiver(id))
  })
class  UserMap extends Component {
    constructor(props){
        super(props);
        this.state={
            requests:[{
              name:"Me",
              location:{
                coordinates:[45,40]
                
                
              }
            }],
            redirect:""
          }
    }
    componentDidMount(){
        this.props.get_rq(this.props.auth.token).then((resp)=>{
          if (this.props.geo.volunteers_near.length>0)
          {
            
           
            this.setState({
              requests:this.props.geo.volunteers_near
            })
          }
          
        }).catch(err=>alert(err))
      }
    
      markerClick=(id)=>{
        this.props.setId(id);
       this.setState({
           redirect:"/user_view_volunteer"
       })
      }
      
    render(){

        if (this.state.redirect!=="")
        return <Redirect to={this.state.redirect} />
        if (this.props.geo.isLoading) {
          return(
              <div className="container">
                  <div className="row">
                      <Loading />
                  </div>
              </div>
          );
      } 
    return(
        
              
      <div class="container">

    <div style={{height:"60vh",position:"relative"}}>
    <h1>Volunteers near me</h1>
     <MapComponent 
     lat={this.props.auth.user.location.coordinates[1]}
     lon={this.props.auth.user.location.coordinates[0]}
     markerClick={this.markerClick}
     markers={this.state.requests}
     volunteer={true}
     ></MapComponent>
     </div>
     <a role="button" class="btn btn-primary btn-large"><Link to="/user">Go back </Link></a>
         
 


 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserMap);