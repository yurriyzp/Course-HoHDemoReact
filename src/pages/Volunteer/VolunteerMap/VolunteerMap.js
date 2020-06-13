/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import React, { Component } from 'react';
import MapComponent from "../../Map"

import {get_requests_near_me} from "../../../store/actions/geo";
import {get_request} from "../../../store/actions/requests"
import {connect} from "react-redux"

import {Loading} from "../../LoadingComponent"
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom"
const mapStateToProps=state=>({
    auth:state.auth,
    geo:state.geo,
    requests:state.requests,
    
  
  });
  
  const mapDispatchToProps=(dispatch)=>({
      
      get_rq:(token)=>dispatch(get_requests_near_me(token)),
      view:(token,id)=>dispatch(get_request(token,id)),
      
  })
class  VolunteerMap extends Component {
    constructor(props){
        super(props);
        this.state={
            requests:[{
              name:"Me",
              location:{
                coordinates:[45,40]
                
                
              }
            }],
            redirect:""
          }
    }
    componentDidMount(){
        this.props.get_rq(this.props.auth.token).then((resp)=>{
          if (this.props.geo.requests_near.length>0)
          {
            
            
            this.setState({
              requests:this.props.geo.requests_near
            })
          }
          
        })
      }
      markerClick=(id)=>{
          
       
        let req=this.props.geo.requests_near.find(val=>val. id===id);
        console.log(req);
        
        this.props.view(this.props.auth.token,id).then(res=>{
          
            let type=this.props.requests.request.isGoods?"goods":
            this.props.requests.request.isDelivery?"delivery":
            this.props.requests.request.isService?"service":
            this.props.requests.request.isMoney?"money":""
      
      
            
            switch (type) {
              case "goods":
                this.setState({
                  redirect:"/vol_view_goods"
                }) 
              
                break;
              case "delivery":
                this.setState({
                  redirect:"/vol_view_delivery"
                }) 
                break;
              case "money":
                this.setState({
                  redirect:"/vol_view_money"
                }) 
                break;
              case "service":
                this.setState({
                  redirect:"/vol_view_service"
                }) 
                break;
              default:
                break;
            }
      
          
    
        }).catch(err=>alert(err))
    
      }
    render(){
        if (this.state.redirect!=="")
        return <Redirect to={this.state.redirect} />
        if (this.props.geo.isLoading) {
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

    <div style={{height:"60vh",position:"relative"}}>
    <h1>Requests near me</h1>
    <MapComponent 
     lat={this.props.auth.user.location.coordinates[1]}
     lon={this.props.auth.user.location.coordinates[0]}
     markerClick={this.markerClick}
     markers={this.state.requests}
     volunteer={true}
     ></MapComponent>
     </div>
   <Link to="/volunteer">Go back </Link>
 


 
         
</div>

    );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VolunteerMap);