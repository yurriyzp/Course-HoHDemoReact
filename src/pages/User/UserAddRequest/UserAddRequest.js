/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import {Link} from "react-router-dom"

  
   
class  Default extends Component {
    constructor(props){
        super(props);
    }
    needHelp(){
        alert("Need help!");
    }
    render(){

    
    return(
  
              
      <div class="container">
          <div class="main">
              
        
      <h1>Add Request </h1>
      <div class="justify-content-center align-items-center row">
            
           <Link to="/user_goods_help">Request for goods</Link>
    </div>
    <div class="justify-content-center align-items-center row">
        <Link to="/user_delivery_help">Request for delivery</Link>
    </div>
    <div class="justify-content-center align-items-center row">
       <Link to="/user_money_help">Request for money</Link>
    </div>
    <div class="justify-content-center align-items-center row">
       <Link to="/user_service_help">Request for service</Link>
    </div>
        
        
        
        
     </div>
      
         
 


 
         
</div>

    );
    }
}

export default Default;