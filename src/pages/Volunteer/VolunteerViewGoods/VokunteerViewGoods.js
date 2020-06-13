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
   
class  VolunteerViewGoods extends Component {
    constructor(props){
        super(props);
        this.state={
          redirect:""
        }
    }
  
    doneGood=(id)=>{
      if (this.props.requests.request.volunteer==null) return;
      let request=this.props.requests.request;
      let good=request.goods.find(val=>val._id===id);
      good.status="Done"
      this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
        alert("Status updated")
      })
  
    }
  
    failGood=(id)=>{
      if (this.props.requests.request.volunteer==null) return;
      let request=this.props.requests.request;
      let good=request.goods.find(val=>val._id===id);
      good.status="Fail"
      this.props.change(this.props.auth.token,this.props.requests.request._id,request).then(res=>{
        alert("Status updated")
      })
  
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
            <h3>Request for delivery</h3>
        </div>
     
            <div class="justify-content-center row">
                <div class="card" style={{backgroundColor: "dodgerblue"}}>
                    <div class="card-body">
                      <h5 class="card-title">Goods name</h5>
                      <h6 class="card-subtitle mb-2 ">Type:goods</h6>
                      <p class="card-text">
                          Status:
                      </p>
                </div>
                  </div>
            </div>
            <div class="justify-content-center row">
                <table id="delivery" class="table table-hover">
                    <thead>
                      <tr>
                    
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                    
                        <th scope="col">Place</th>
                        <th scope="col">Status</th>
                       
                        
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.requests.request.goods.map((val,idx)=>{
                        return (
                          <tr>
                              <td>{val.name}</td> 
                              <td>{val.amount}</td>
                              <td>{val.place}</td>
                              <td>{val.status}</td>
                              <td><button type="button" id="add" class="btn btn-primary form-control" onClick={()=>this.doneGood(val._id)}>Done</button></td>
                              <td><button type="button" id="fail" class="btn btn-primary form-control" onClick={()=>this.failGood(val._id)}>Fail</button></td>
                          </tr>
                        )

                      })

                    }
               
                    </tbody>
                  </table>
                  
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

export default connect(mapStateToProps,mapDispatchToProps)(VolunteerViewGooods);