/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';

  
import {connect} from "react-redux"
import { place_request,get_requests } from '../../../store/actions/requests';
import Loading from "../../LoadingComponent"
import { Redirect } from "react-router-dom";
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests
  

});

const mapDispatchToProps=(dispatch)=>({
    send_req:(token,name,type,goods,description,purpose,amount,ccnumber)=>dispatch(place_request(token,name,type,goods,description,purpose,amount,ccnumber)),

    get_req:(token)=>dispatch(get_requests(token))
})
class UserServiceHelp extends Component {
    constructor(props){
        super(props);
        this.state={
     
          name:"",
          decription:"",
          redirect:""
          
          
        }
    }
    changeName=(e)=>{
      this.setState({
        name:e.target.value
      })
    }
    changeDescription=(e)=>{
      this.setState({
        decription:e.target.value
      })
    }
    send=()=>{

      if (this.state.name=="" || this.state.description=="") 
      alert("You should fill all fields");
     
     else
     
    
      this.props.send_req(
        this.props.auth.token,
        this.state.name,
        "service",
        [],
        this.state.decription,
        "",
        "",
        ""
      ).then(()=>{
        if (!this.props.requests.errMes)
      
        this.props.get_req(this.props.auth.token).
        then(()=>
        { if (!this.props.requests.errMes)
          {
            alert("ok!");
            this.setState({
              redirect:"/user"
            })
          }
          
          else this.setState({
            errMes:this.props.requests.errMes
          })
        })
        .catch((err)=>alert(err))
        else this.setState({
          errMes:this.props.requests.errMes
        })
      }).catch((err)=>alert(err))
        
    }
    render(){
      if (this.state.redirect!=="")
      return <Redirect to={this.state.redirect} />
    
    return(
  
              
      <div class="container">
          <div class="main">
              
        
      <h1>Request for service</h1>
      
      <div class="justify-content-center row">
            <form>
                <div class="form-group row">
                    <label for="s_name" class="col-sm-4 col-form-label"> Name</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="s_name" value={this.state.name} onChange={this.changeName}/>
                    </div>
                </div>
                
             

            
                <div class="form-group row">
                    <label for="s_description" class="col-sm-4 col-form-label">Description</label>
                    <div class="col-sm-8">
                      <textarea class="form-control" id="s_description" rows={6} value={this.state.decription} onChange={this.changeDescription}></textarea>
                    </div>
                </div>

              

              
                
                <div class="form-group row ">
                   
                  <div class="col-sm-6">
                  <button type="button" id="send_goods" class="btn btn-primary btn-large" onClick={this.send}>Send Request</button>
                  </div>
                </div>
              </form>
                     
        </div>
        
        
        
     </div>
      
         
 


 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserServiceHelp);