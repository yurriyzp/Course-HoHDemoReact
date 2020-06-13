/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';

import {Loading} from "../LoadingComponent"
import { connect } from 'react-redux';
import {get_request, delete_request,get_requests} from "../../store/actions/admin"
import { logout } from '../../store/actions/auth';
import {Link} from "react-router-dom"
import { Redirect } from "react-router-dom";

import { adm_get_requests } from '../../store/actions/admin';
const mapStateToProps=state=>({
  auth:state.auth,
  admin:state.admin,
  

});



const mapDispatchToProps=(dispatch)=>({
    
    get_req:(token)=>dispatch(adm_get_requests(token)),
    
    
})  
class  ViewRequests extends Component {
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
              
        
      <h1>Requests</h1>
      <div>
            <table class="table table-hover">
                <thead>
                  <tr>
                    
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Type</th>

                    <th scope="col">User ID</th>
                    <th scope="col">Volunteer ID</th>
                    
                  </tr>
                </thead>
                <tbody>
              
                 
                   { this.props.admin.requests?
                    this.props.admin.requests.map((item, i) => (
                     <tr key={i} >
                        
                        <td >{item.name}</td>
                        <td >{item.status}</td>
                        <td>{item.isDelivery?"Delivery":item.isGoods?"Goods":item.isMoney?"Money":item.isService?"Service":""}</td>
                        <td>{item.user}</td>
                        <td>{item.volunteer?item.volunteer:""}</td>
                        
                        
                        
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

export default connect(mapStateToProps,mapDispatchToProps)(ViewRequests);