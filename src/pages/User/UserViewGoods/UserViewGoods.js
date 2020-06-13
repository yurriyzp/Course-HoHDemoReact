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
   
class  UserViewGooods extends Component {
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
            <h3>Request for delivery</h3>
        </div>
     
            <div class="justify-content-center row">
                <div class="card" style={{backgroundColor: "dodgerblue"}}>
                    <div class="card-body">
                      <h5 class="card-title">Goods name</h5>
                      <h6 class="card-subtitle mb-2 ">Type:goods</h6>
                      <p class="card-text">
                      {this.props.requests.request.status}
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
                          </tr>
                        )

                      })

                    }
               
                    </tbody>
                  </table>
                  
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

export default connect(mapStateToProps,mapDispatchToProps)(UserViewGooods);