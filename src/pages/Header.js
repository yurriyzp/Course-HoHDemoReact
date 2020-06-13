/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React from "react";
import {Loading} from "./LoadingComponent";
import { connect } from 'react-redux';
import { logout } from "../store/actions/auth";
import {Link} from "react-router-dom"
import { Redirect } from "react-router-dom";
const mapStateToProps=state=>({
    auth:state.auth
  
  });
  
  const mapDispatchToProps=(dispatch)=>({
      logout:()=>dispatch(logout())
  })
class  Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            redirect:""
        }
    }
    logout=()=>{
        this.props.logout();
        
    }
    render(){
       
    return (
    <div>
        <nav class="navbar navbar-dark navbar-expand-sm fixed-top">
        <div class="container">
            <a class="navbar-brand" >Hands of Help</a>
           <div class="collapse navbar-collapse" id="Navbar">
                {this.props.auth.isAuthenticated?(<ul class="navbar-nav mr-auto">
                    
                   
                        { this.props.auth.user.role=="Admin"?(<>
                          
                    <li ><Link to={"/admin_users"}>
                        Users
                        </Link></li>    
                    <li ><Link to={"/admin_volunteers"}>
                        Volunteers
                        </Link></li>    
                    <li ><Link to={"/admin_requests"}>
                        Requests
                        </Link></li></>):(<> <li >
                        <Link to={this.props.auth.user.role=="User"?"/user":this.props.auth.user.role=="Volunteer"?"/volunteer":"/admin"}>
                        Home 
                        </Link></li>

                    <li ><Link to={this.props.auth.user.role=="User"?"/user_map":this.props.auth.user.role=="Volunteer"?"/vol_map":"/admin_requests"}>
                        Maps 
                        </Link></li></>)
                        }


                  
                </ul> ):(<ul></ul>)}
                {this.props.auth.isAuthenticated?(
                <span class="navbar-text">
                    <a id="logout" onClick={this.logout}>
                        <span class="fa fa-sign-in" ></span> Logout</a>
                </span>):(<span></span>)}
           </div>            
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>

   
  
    <header class="jumbotron " >
        
        <div class="row justify-content-center">
     
       
            <h1>HoH-demo</h1>
        
        
    </div>
    </header>
    
    </div>)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);