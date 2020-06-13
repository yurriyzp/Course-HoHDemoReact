/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import {Link} from "react-router-dom"
const mapStateToProps=state=>({
  auth:state.auth,
  
  geo:state.geo,
  requests:state.requests,



  


});
class  UserViewVolunteer extends Component {
    constructor(props){
        super(props);
    }
    needHelp(){
        alert("Need help!");
    }
    render(){
        let volunteer=this.props.geo.volunteers_near.find(val=>val._id===this.props.requests.receiver);
    
    return(
  
              
      <div class="container">
          <div class="main">
              
        
      
      <div>
      <h1>Volunteer:</h1>
            <h1>
               {
               volunteer.name
               }
            </h1>
            <h3>{volunteer.adress}</h3>
            <h3>{volunteer.phone}</h3>

            <Link to="/user">Go back </Link>
        </div>
        
        
        
        
     </div>
      
         
 


 
         
</div>

    );
    }
}

export default connect(mapStateToProps)(UserViewVolunteer)