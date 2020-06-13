/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';

import {Loading} from "../LoadingComponent"
import { connect } from 'react-redux';
import {get_request, delete_request,get_requests} from "../../store/actions/requests"
import { logout } from '../../store/actions/auth';
import {Link} from "react-router-dom"
import { Redirect } from "react-router-dom";

import { adm_get_volunteers } from '../../store/actions/admin';
const mapStateToProps=state=>({
  auth:state.auth,
  admin:state.admin,
  

});



const mapDispatchToProps=(dispatch)=>({
    
    get_req:(token)=>dispatch(adm_get_volunteers(token)),
    
    
})  
class  ViewVolunteers extends Component {
    constructor(props){
        super(props);
        this.state={
          data:[],
          redirect:""
        }
    }
    componentDidMount(){
      this.props.get_req(this.props.auth.token).then(res=>{

      }).catch(err=>alert(err));
      
    }
    
  
  
     
  
  
  
  
  
    
   
   




    render(){
       
        if (this.props.admin.isLoading) {
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
              
        
      <h1>Volunteers</h1>
      <div>
            <table class="table table-hover">
                <thead>
                  <tr>
                    
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Email</th>
                    <th scope="col">Adress</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Lat</th>
                    <th scope="col">Long</th>
                    <th scope="col">ID</th>
                  </tr>
                </thead>
                <tbody>
              
                 
                   { this.props.admin.volunteers?
                    this.props.admin.volunteers.map((item, i) => (
                     <tr key={i} >
                        
                        <td >{item.name}</td>
                        <td >{item.status}</td>
                        <td>{item.email}</td>
                        <td>{item.adress}</td>
                        <td>{item.phone}</td>
                        <td>{item.location.coordinates[1]}</td>
                        <td>{item.location.coordinates[0]}</td>
                        <td>{item._id}</td>
                        
                        
                           </tr>))
                        :<tr></tr>
                 }
               
                </tbody>
              </table>
              
              
        </div>
        
        
        
        
     </div>
      
         
 


 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewVolunteers);