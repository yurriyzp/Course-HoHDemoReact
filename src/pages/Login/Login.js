/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { login } from '../../store/actions/auth';
import { createSelectorHook } from 'react-redux';
import {Loading} from "../LoadingComponent";
import { connect } from 'react-redux';

import { get_requests } from '../../store/actions/requests';
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests

});

const mapDispatchToProps=(dispatch)=>({
    login:(creds)=>dispatch(login(creds)),
    get_req:(token)=>dispatch(get_requests(token))
})
class Home extends Component {
    constructor(props){
      super(props);
      this.state={
        username:"",
        password:"",
        errMess:"",
        redirect:""
      }
    }
    needHelp=()=>{
      this.setState({
        redirect:"/user_register"
      })
    }
    canHelp=()=>{
      this.setState({
        redirect:"/volunteer_register"
      })

    }
    login=()=>{ 
      this.props.login({
        username:this.state.username,
        password:this.state.password
      }).then(()=>{
        if (!(this.props.auth.errMess)){
          
          if (this.props.auth.user.role=="User"){
  
            this.props.get_req(this.props.auth.token).then(resp=>{
              if (!(this.props.requests.errMess)){
                
                this.setState({
                  redirect:"/user"
                })
              }
              else this.setState({
                errMess:this.props.requests.errMess
              })
  
  
              
            })
            
          }
          else if (this.props.auth.user.role=="Volunteer"){
  
  
            this.props.get_req(this.props.auth.token).then(resp=>{
              if (!(this.props.requests.errMess)){
                
                this.setState({
                  redirect:"/volunteer"
                })  
              }
              else this.setState({
                errMess:this.props.requests.errMess
              })
  
  
              
            })
            
          }
          else {
            this.setState({
              redirect:"/admin_requests"
            })  
          }
          
        }
        else this.setState({
          errMess:this.props.auth.errMess
        })
        
        
      }).catch((err)=>this.setState({
        errMess:err
      }))
  
    }


    changeUserName=(e)=>{
      this.setState({
          username:e.target.value
      })
  }

  changePassword=(e)=>{
      this.setState({
          password:e.target.value
      })
  }

  
    render(){
        if (this.state.redirect!=="")
        return <Redirect to={this.state.redirect} />
        if (this.props.auth.isLoading) {
          return(
              <div className="container">
                  <div className="row">
                      <Loading />
                  </div>
              </div>
          );
      } 
      else
    
    return(
       
      <div class="container">
          <div class="main">
              
        
  
      
        
        
        
        
        <div class="justify-content-center row">
            <h3>Login</h3>
        </div>
        <div class="row justify-content-center" >
            
          
                <form>
                
                
                    <div class="form-group row">
                    <label for="username" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="username" value={this.state.username} onChange={this.changeUserName}/>
                    </div>
                    </div>
                    <div class="form-group row">
                  <label for="password" class="col-sm-2 col-form-label">Password</label>
                  <div class="col-sm-10">
                    <input type="password" class="form-control" id="password" value={this.state.password} onChange={this.changePassword}/>
                  </div>
                  </div>
                    
                    <div class="form-group row">
                      <div class="col-sm-6  offset-sm-4">
                        <button type="button" class="btn btn-primary btn-large" id="log_user" onClick={this.login}>Login</button>
                      </div>
                      
                    </div>
                  </form>
            
        </div>
        <h3 style={{color:'red',textAlign:"center"}}>{this.state.errMess}</h3>
        <div class="row justify-content-center">
            <h3>Registration</h3>
        </div>
        <div class="row justify-content-center">
          <div class="col-sm-4">
              <div class="row justify-content-center">

                <div class="col-sm-5">
                    <button type="button" class="btn btn-primary"  class="btn btn-primary" onClick={this.needHelp}>I need help</button>
                </div>
                <div class="col-sm-5">
                    <button type="button" class="btn btn-primary"  onClick={this.canHelp}>I could help</button>
                </div>
              </div>
          </div>
      
        
             
         
            
            
            
            
        </div>
  
        </div>
      
         


 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);