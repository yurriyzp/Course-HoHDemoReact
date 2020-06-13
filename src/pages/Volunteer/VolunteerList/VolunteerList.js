/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';

import {connect} from "react-redux"
import {get_request,get_requests} from "../../../store/actions/requests"
import { logout } from '../../../store/actions/auth';
import {Loading} from "../../LoadingComponent"
import {Link} from "react-router-dom"
import { Redirect } from "react-router-dom";
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests

});

const mapDispatchToProps=(dispatch)=>({
    view:(token,id)=>dispatch(get_request(token,id)),
    logout:()=>dispatch(logout()),
    get_req:(token)=>dispatch(get_requests(token)),
})  
   
class VolunteerList extends Component {
    constructor(props){
        super(props);
        this.state={
          redirect:""
        }
    }
    componentDidMount(){
      this.props.get_req(this.props.auth.token).then(res=>{

      }).catch(err=>alert(err))
    }
  
    viewRequest=(id)=>{
     
      this.props.view(this.props.auth.token,id).then(res=>{
        
        let type=this.props.requests.request.isGoods?"goods":
        this.props.requests.request.isDelivery?"delivery":
        this.props.requests.request.isService?"service":
        this.props.requests.request.isMoney?"money":""
  
  
        
        switch (type) {
          case "goods":
            this.setState({
              redirect:"/vol_view_goods"
            }) 
          
            break;
          case "delivery":
            this.setState({
              redirect:"/vol_view_delivery"
            }) 
            break;
          case "money":
            this.setState({
              redirect:"/vol_view_money"
            }) 
            break;
          case "service":
            this.setState({
              redirect:"/vol_view_service"
            }) 
            break;
          default:
            break;
        }
  
      }).catch(err=>alert(err))
  
     
    }
    update=()=>{
      this.props.get_req(this.props.auth.token).then(res=>{
  
      },(err=>alert(err)))
      .catch(err=>alert(err))
    }
   
    render(){
      if (this.state.redirect!=="")
      return <Redirect to={this.state.redirect} />
   
    
    return(
  
              
      <div class="container">
          <div class="main">
              
        
      <h1>Volunteer</h1>
      
      <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">User</th>
               
                </tr>
              </thead>
              <tbody>
              
                 
                   { this.props.requests.requests?
                    this.props.requests.requests.map((item, i) => (
                     <tr key={i} onClick={()=>this.viewRequest(item.id)}>
                        <td>{}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                        <td>{item.user?item.user:"No"}</td>
                     
                        
                        
                           </tr>))
                        :<tr></tr>
                 }
               
              </tbody>
            </table>
            <Link to="/vol_map">Go map </Link>  
        
        
        
     </div>
      
         
 



 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VolunteerList);