/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import MapComponent from "../../Map"

import {connect} from "react-redux"
import { setReceiver } from '../../../store/actions/requests';
import {Loading} from "../../LoadingComponent"
import {Link} from "react-router-dom"
import { Redirect } from "react-router-dom";
const mapStateToProps=state=>({
    auth:state.auth,
    requests:state.requests
    
  
  });
  
  const mapDispatchToProps=(dispatch)=>({
    setId:(id)=>dispatch(setReceiver(id))
    
  })
  class UserViewService extends Component {
    constructor(props){
        super(props);
        this.state={
          redirect:""
        }

    }
    needHelp(){
        alert("Need help!");
    }
    render(){

      if (this.state.redirect!=="")
      return <Redirect to={this.state.redirect} />
      if (this.props.requests.isLoading) {
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
          <div class="main">
              
        
          <div class="justify-content-center row">
            <h3>Request for Service</h3>
        </div>
     
            <div class="justify-content-center row">
                <div class="card" style={{backgroundColor: "dodgerblue"}}>
                    <div class="card-body">
                      <h5 class="card-title">{this.props.requests.request.name}</h5>
                      <h6 class="card-subtitle mb-2 ">Type:money</h6>
                      
                      <p class="card-text">
                      Volunteer name:{this.props.requests.request.volunteer?this.props.requests.request.volunteer.name:""}
                    </p>
                    
                      <p class="card-text">
                      Request status:{this.props.requests.request.status}
                      </p>
                      <p class="card-text">
                      Request description:{this.props.requests.request.description}
                    </p>
                    
                </div>
                  </div>
            </div>
       
                <div class="justify-content-center row">
                    <h3>Volunteer name:</h3>
                </div>
        
        
     </div>
     <div style={{height:"40vh",position:"relative"}}>

     <Link to="/user">Go back </Link>
</div>
 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserViewService);