/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {Loading} from "../../LoadingComponent";
import { connect, createSelectorHook } from 'react-redux';
import { place_request,get_requests }  from '../../../store/actions/requests';
  
const mapStateToProps=state=>({
  auth:state.auth,
  requests:state.requests

});

const mapDispatchToProps=(dispatch)=>({
  send_req:(token,name,type,goods,description,purpose,amount,ccnumber)=>dispatch(place_request(token,name,type,goods,description,purpose,amount,ccnumber)),

  get_req:(token)=>dispatch(get_requests(token)),
})
   
class  Default extends Component {
    constructor(props){
        super(props);
        this.state={
          goods:[],
          name:"",
          good_name:"",
          amount:0,
          place:"",
          redirect:""
        }
    }
    changeName=(e)=>{
      this.setState({
        name:e.target.value
      })
    }
    changeGoodName=(e)=>{
      this.setState({
        good_name:e.target.value
      })
    }

    changeAmount=(e)=>{
      this.setState({
        amount:e.target.value
      })
    }

    changePlace=(e)=>{
      this.setState({
        place:e.target.value
      })
    }
    addGood=()=>{
      alert(this.props.auth.token);
      this.setState({
        goods:[...this.state.goods,{
          name:this.state.good_name,
          amount:this.state.amount,
          place:this.state.place
        }],
        good_name:"",
        place:"",
        amount:""

      })
    }
    send=()=>{
     
    
      if (this.state.name=="" || this.state.goods.length==0) 
   alert("You should fill all fields");
  
  else
  
      
      this.props.send_req(
        this.props.auth.token,
        this.state.name,
        "goods",
        this.state.goods
      ).then(()=>{
        if (!this.props.requests.errMes)
      
        this.props.get_req(this.props.auth.token).
        then(()=>
        { if (!this.props.requests.errMes)
          {
            
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

      var rows;
    if (this.state.goods.length==0) rows="";
    else rows=this.state.goods.map((val,idx)=>{
      return (
        <tr>
          <td>{val.name}</td>
          <td>{val.amount}</td>
          <td>{val.place}</td>
        </tr>
      )
    })
    if (this.state.redirect!=="")
        return <Redirect to={this.state.redirect} />
    return(
  
              
      <div class="container">
          <div class="main">
              
        
      <h1>Request goods</h1>
      <div class="justify-content-center row">
            <form>
            <div class="form-group row">
                    <label for="name" class="col-sm-4 col-form-label"> Name</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="name" value={this.state.name} onChange={this.changeName}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="g_name" class="col-sm-4 col-form-label"> Good Name</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="g_name" value={this.state.good_name} onChange={this.changeGoodName}/>
                    </div>
                </div>
                
                <div class="form-group row">
                    <label for="g_amount" class="col-sm-4 col-form-label">Amount</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="g_amount" value={this.state.amount} onChange={this.changeAmount}/>
                    </div>
                </div>

            
                <div class="form-group row">
                    <label for="g_place" class="col-sm-4 col-form-label">Where to buy</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="g_place" value={this.state.place} onChange={this.changePlace}/>
                    </div>
                </div>

              
                
                <div class="form-group row ">
                   
                  <div class="col-sm-6">
                    <button type="button" id="g_add" class="btn btn-primary form-control" onClick={this.addGood}>Add</button>
                  </div>
                </div>
              </form>
                     
        </div>
        <div class="justify-content-center row">
        <table id="goods" class="table table-hover">
            <thead>
              <tr>
             
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Place</th>
                
              </tr>
           
            </thead>
            <tbody>
            {rows}
            </tbody>
          </table>
          <button type="button" id="send_goods" class="btn btn-primary btn-large" onClick={this.send}>Send Request</button>
        </div>
        
        
        
        
     </div>
      
         
 

 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Default);