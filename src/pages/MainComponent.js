import React, { Component } from 'react';


import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';





import Header from "./Header";
import Footer from "./Footer";







//Authorization
import Login from "./Login/Login";
import RegistrationUser from "./RegistrationUser/RegistationUser"
import RegistrationVolunteer from "./RegistrationVolunteer/RegistrationVolunteer";


//User

import UserList from "./User/UserList/UserList";
import UserMap from "./User/UserMap/UserMap";
import UserViewVolunteer from "./User/UserViewVolunteer/UserViewVolunteer";


import UserAddRequest from "./User/UserAddRequest/UserAddRequest";
import UserDeliveryHelp from "./User/UserDeliveryHelp/UserDeliveryHelp";
import UserGoodsHelp from "./User/UserGoodsHelp/UserGoodsHelp";
import UserMoneyHelp from "./User/UserMoneyHelp/UserMoneyHelp";
import UserServiceHelp from './User/UserServiceHelp/UserServiceHelp';

import UserViewDelivery from "./User/UserViewDelivery/UserViewDelivery";
import UserViewsGoods from "./User/UserViewGoods/UserViewGoods";
import UserViewMoney from "./User/UserViewMoney/UserViewMoney";
import UserViewService from "./User/UserViewService/UserViewService";




//Volunteer
import VolunteerList from "./Volunteer/VolunteerList/VolunteerList";
import VolunteerMap from "./Volunteer/VolunteerMap/VolunteerMap";

import VolunteerViewDelivery from "./Volunteer/VolunteerViewDelivery/VolunteerViewDelivery";
import VolunteerViewGoods from "./Volunteer/VolunteerViewDelivery/VolunteerViewDelivery";
import VolunteerViewMoney from "./Volunteer/VolunteerViewMoney/VolunteerViewMoney";
import VolunteerViewService from "./Volunteer/VolunteerViewService/VolunteerViewService";



//admin
import ViewRequests from "./Admin/ViewRequests";
import ViewUsers from "./Admin/ViewUsers";
import ViewVolunteers from "./Admin/ViewVolunteers";


















import { TransitionGroup, CSSTransition } from 'react-transition-group';
import RegistationUser from './RegistrationUser/RegistationUser';

const mapStateToProps = state => {
  return {

    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
 

});


class Main extends Component {


  componentDidMount() {
    
  }
 
  render() {
    
    const ProtectedRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )} />
    );
    return (
      <div>
       
         
          <Header/>
         <Switch>
        
              <Route path='/login' component={Login} />
              <Route path='/user_register' component={RegistrationUser} />
              <Route path='/volunteer_register' component={RegistrationVolunteer} />
              
              

              
              
              <ProtectedRoute path='/user' component={UserList}/>
              <ProtectedRoute path='/user_map' component={UserMap} />
              <ProtectedRoute path='/user_view_volunteer' component={UserViewVolunteer} />


              <ProtectedRoute path='/user_add_request' component={UserAddRequest}/>
              <ProtectedRoute path='/user_delivery_help' component={UserDeliveryHelp}/>
              <ProtectedRoute path='/user_goods_help' component={UserGoodsHelp}/>
              <ProtectedRoute path='/user_money_help' component={UserMoneyHelp}/>
              <ProtectedRoute path='/user_service_help' component={UserServiceHelp}/>
              

              <ProtectedRoute path='/user_view_delivery' component={UserViewDelivery}/>
              <ProtectedRoute path='/user_view_goods' component={UserViewsGoods}/>
              <ProtectedRoute path='/user_view_money' component={UserViewMoney}/>
              <ProtectedRoute path='/user_view_service' component={UserViewService}/>



              <ProtectedRoute path='/volunteer' component={VolunteerList} />
              <ProtectedRoute path='/vol_map' component={VolunteerMap} />



              <ProtectedRoute path='/vol_view_delivery' component={VolunteerViewDelivery}/>
              <ProtectedRoute path='/vol_view_goods' component={VolunteerViewGoods}/>
              <ProtectedRoute path='/vol_view_money' component={VolunteerViewMoney}/>
              <ProtectedRoute path='/vol_view_service' component={VolunteerViewService}/>

            


               <ProtectedRoute path="/admin_requests" component={ViewRequests}/>
               <ProtectedRoute path="/admin_users" component={ViewUsers}/>
               <ProtectedRoute path="/admin_volunteers" component={ViewVolunteers}/>
              <Redirect to="/login" />
          </Switch>
          <Footer/>
        
          
          
      
      </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);