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

    get_req:(token)=>dispatch(get_requests(token)),
    
})
class UserMoneyHelp extends Component {
    constructor(props){
        super(props);
        this.state={
     
          name:"",
          amount:1,
          purpose:"",
          ccnumber:"1111-1111-1111-1111",
          redirect:""
          
          
        }
    }
   

    changeName=(e)=>{
      this.setState({
        name:e.target.value
      })
    }
  
    changeAmount=(e)=>{
      this.setState({
        amount:e.target.value
      })
    }
  
    changePurpose=(e)=>{
      this.setState({
        purpose:e.target.value
      })
    }
    changeCCNumber=(e)=>{
      this.setState({
        ccnumber:e.target.value
      })
    }
  send=()=>{
  
    if (this.state.name=="" || this.state.purpose=="" || this.state.amount=="") 
    alert("You should fill all fields");
   
   else
   
  
    this.props.send_req(
      this.props.auth.token,
      this.state.name,
      "money",
      [],
      "",
      this.state.purpose,
      this.state.amount,
      this.state.ccnumber
    )
    .then(()=>{
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
              
        
      <h1>Request for money</h1>
      <div class="justify-content-center row">
            <form>
                <div class="form-group row">
                    <label for="m_name" class="col-sm-4 col-form-label"> Name</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="m_name" value={this.state.name} onChange={this.changeName}/>
                    </div>
                </div>
                
                <div class="form-group row">
                    <label for="m_amount" class="col-sm-4 col-form-label">Amount</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="m_amount" value={this.state.amount} onChange={this.changeAmount}/>
                    </div>
                </div>

            
                <div class="form-group row">
                    <label for="m_purpose" class="col-sm-4 col-form-label">Purpose</label>
                    <div class="col-sm-8">
                      <textarea class="form-control" id="m_purpose" rows={6} value={this.state.purpose} onChange={this.changePurpose}></textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="m_cc" class="col-sm-4 col-form-label">CC number</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" disabled id="m_cc"/>
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

export default connect(mapStateToProps,mapDispatchToProps)(UserMoneyHelp);