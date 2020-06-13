/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import {signup} from "../../store/actions/auth";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import {Loading} from "../LoadingComponent";
const mapStateToProps=(state)=>({
    auth:state.auth
    });
  
  const mapDispatchToProps=(dispatch)=>({
      register:(creds)=>dispatch(signup(creds))
  })
class  RegistrationUser extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            username:"",
            password:"",
            tel:"",
            email:"",
            lat:1,
            lon:1,
            adress:"",
            errMess:"",
            redirect:""
        }
    }
    register=()=>{
        let creds={
            name:this.state.name,
            username:this.state.username,
            password:this.state.password,
            email:this.state.email,
            adress:this.state.adress,
            phone:this.state.tel,
            lat:this.state.lat,
            lon:this.state.lon,
            role:"User"
    
    
        };
    
    if (this.state.name=="" || this.state.username=="" || this.state.email=="" ||this.state.adress=="" ||
        this.state.phone=="" || this.state.lat=="" || this.state.lon=="" 
    ) alert("You should fill all field");
    else 
    
        this.props.register(creds).then(()=>{
            if (!(this.props.auth.errMess)){
               this.setState({
                   redirect:"/login"
               })
              }
              else this.setState({
                errMess:this.props.auth.errMess
              })   
        }).catch(()=>alert("SignUP Error"))
    }
    goBack(){


    }

    changeName=(e)=>{
        this.setState({
            name:e.target.value
        })
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

    changeTel=(e)=>{
        this.setState({
            tel:e.target.value
        })
    }

    changeEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    changeAdress=(e)=>{
        this.setState({
            adress:e.target.value
        })
    }

    changeLon=(e)=>{
        this.setState({
            lon:e.target.value
        })
    }

    changeLat=(e)=>{
        this.setState({
            lat:e.target.value
        })
    }
    getGeo=()=>{
        fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAIAQXpfC_ljM4-2c2Ktt4f7BWZWkgRdnE',
        {
            method: 'POST',
            

        }).then((response)=>{
        
            return response.json();
        }).then((data)=>
        {
            
            this.setState({
                lat:data.location.lat,
                lon:data.location.lng
            })
        });
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
              
        
      <h1>User Sign Up</h1>
      
      <div class="row justify-content-center">
            
          
            <form>
                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label"> Name</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="name" value={this.state.name} onChange={this.changeName}/>
                    </div>
                </div>
                
                <div class="form-group row">
                    <label for="username" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="username" value={this.state.username} onChange={this.changeUserName}/>
                    </div>
                </div>

            
                <div class="form-group row">
                  <label for="email" class="col-sm-2 col-form-label">Email</label>
                  <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" value={this.state.email} onChange={this.changeEmail}/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="password" class="col-sm-2 col-form-label">Password</label>
                  <div class="col-sm-10">
                    <input type="password" class="form-control" id="password" value={this.state.password} onChange={this.changePassword}/>
                  </div>
                </div>

                <div class="form-group row">
                    <label for="adress" class="col-sm-2 col-form-label">Adress</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="adress" value={this.state.adress} onChange={this.changeAdress}/>
                    </div>
                </div>
                
                <div class="form-group row">
                    <label for="geo" class="col-sm-2 col-form-label">GeoLocation</label>
                    <div class="col-sm-2">
                      <button type="button" class="btn btn-primary btn-small" id="btngeo" onClick={this.getGeo}>Geo</button>
                    </div>
                    
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="geo" value={this.state.lon} onChange={this.changeLon}/>
                    </div>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="geo2" value={this.state.lat} onChange={this.changeLat}/>
                      </div>
                </div>
                <div class="form-group row">
                    <label for="tel" class="col-sm-2 col-form-label">Phone number</label>
                    <div class="col-sm-10">
                      <input type="tel" class="form-control" id="tel" value={this.state.tel} onChange={this.changeTel}/>
                    </div>
                    
                </div>

                
                
                <div class="form-group row ">
                    <div class="col-sm-6 ">
                        <a role="button" class="form-control btn btn-primary " href="/" onClick={this.goBack}>Cancel</a>
                      </div>
                  <div class="col-sm-6">
                    <button type="button" id="reg_user" class="btn btn-primary form-control" onClick={this.register}>Register</button>
                  </div>
                </div>
              </form>
        
    </div>
    <h3 style={{color:'red',textAlign:"center"}}>{this.state.errMess}</h3>
        
        
        
     </div>
      
         
 

 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationUser);