/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';

import {Loading} from "../../LoadingComponent"
import { connect } from 'react-redux';
import {get_request, delete_request,get_requests} from "../../../store/actions/requests"
import { logout } from '../../../store/actions/auth';
import {Link} from "react-router-dom"
import { Redirect } from "react-router-dom";
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests

});



const mapDispatchToProps=(dispatch)=>({
    view:(token,id)=>dispatch(get_request(token,id)),
    delete:(token,id)=>dispatch(delete_request(token,id)),
    get_req:(token)=>dispatch(get_requests(token)),
    logout:()=>dispatch(logout())
    
})  
class  UserComponent extends Component {
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
      console.log(this.props.requests.requests);
    }
    viewRequest=(id)=>{
      alert(id);
     
      this.props.view(this.props.auth.token,id).then(res=>{
        
        let type=this.props.requests.request.isGoods?"goods":
        this.props.requests.request.isDelivery?"delivery":
        this.props.requests.request.isService?"service":
        this.props.requests.request.isMoney?"money":""
        switch (type) {
          case "goods":
            this.setState({
              redirect:"/user_view_goods"
            }) 
          
            break;
          case "delivery":
            this.setState({
              redirect:"/user_view_delivery"
            }) 
            break;
          case "money":
            this.setState({
              redirect:"/user_view_money"
            }) 
            break;
          case "service":
            this.setState({
              redirect:"/user_view_service"
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
    deleteRequest=(id)=>{
      
   
     this.props.delete(this.props.auth.token,id).then(res=>{
       this.props.get_req(this.props.auth.token).then(res2=>{
  
       })
      
       
       
  
  
     })
  
  
    
   }
   




    render(){
    
    if (this.state.redirect!=="")
    return <Redirect to={this.state.redirect} />
    return(
  
              
      <div class="container">
          <div class="main">
              
        
      <h1>User home</h1>
      <div>
            <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Volunteer</th>
                  </tr>
                </thead>
                <tbody>
              
                 
                   { this.props.requests.requests?
                    this.props.requests.requests.map((item, i) => (
                     <tr key={i} onClick={()=>this.viewRequest(item.id)}>
                        <td>{}</td>
                        <td >{item.name}</td>
                        <td>{item.isDelivery?"Delivery":item.isGoods?"Goods":item.isMoney?"Money":item.isService?"Service":""}</td>
                        <td>{item.status}</td>
                        <td>{item.volunteer?item.volunteer:"No"}</td>
                        
                        
                           </tr>))
                        :<tr></tr>
                 }
               
                </tbody>
              </table>
             <Link to="/user_add_request">Add request</Link>
              <Link to="/user_map">Go map </Link>
              
        </div>
        
        
        
        
     </div>
      
         
 


 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserComponent);