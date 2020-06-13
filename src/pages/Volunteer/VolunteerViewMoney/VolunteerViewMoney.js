/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import MapComponent from "../../Map"

import {connect} from "react-redux"
import { setReceiver } from '../../../store/actions/requests';
import { change_request } from '../../../store/actions/requests';
import {Loading} from "../../LoadingComponent"
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom"
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests
  

});

const mapDispatchToProps=(dispatch)=>({
  setId:(id)=>dispatch(setReceiver(id)),
  change:(token,id,request)=>dispatch(change_request(token,id,request)),
  
})
class VolunteerViewMoney  extends Component {
    constructor(props){
        super(props);
        this.state={
            redirect:""
        }
    }
    acceptRequest=()=>{
        let request=this.props.requests.request;
        request.status="Accepted";
        request.volunteer=this.props.auth.user._id;
        this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
          this.setState({
            redirect:"/volunteer"
          })
        })
    
    
      }
      cancelRequest=()=>{
        let request=this.props.requests.request;
        request.status="Not active";
        request.volunteer=null;
        let goods=request.goods.map(val=>{
          
          val.status="";
        return val});
        request.goods=goods;
        this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
          this.setState({
            redirect:"/volunteer"
          })
        })
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
            <h3>Request for Money</h3>
        </div>
     
            <div class="justify-content-center row">
                <div class="card" style={{backgroundColor: "dodgerblue"}}>
                    <div class="card-body">
                      <h5 class="card-title">{this.props.requests.request.name} </h5>
                      <h6 class="card-subtitle mb-2 ">Type:money</h6>
                      <p class="card-text">
                      Request status:{this.props.requests.request.status}
                      </p>
                      <p class="card-text">
                      Request purpose:{this.props.requests.request.purpose}
                    </p>
                    <p class="card-text">
                    User name:{this.props.requests.request.user?this.props.requests.request.user.name:""}
                    </p>
                    <p class="card-text">
                    Request amount:{this.props.requests.request.amount}
                 </p>
                 <p class="card-text">
                 CC Number:{this.props.requests.request.ccnumber}
                </p>
                </div>
                  </div>
            </div>
       
            <button type="button" id="accept" class="btn btn-primary form-control" onClick={this.acceptRequest}>Accept</button>
                <button type="button" id="cancel" class="btn btn-primary form-control" onClick={this.cancelRequest}>Cancel</button>
     </div>
     <div style={{height:"40vh",position:"relative"}}>

     <Link to="/volunteer">Go back </Link>
</div>



 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VolunteerViewMoney);