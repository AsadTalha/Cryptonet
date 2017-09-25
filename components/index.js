

import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Navigator} from 'react-native';
import SignIn from './sign/sign';
import SignUp from './signup/signup';
import Dashboard from './dashboard/dashboard';
import Profile from './profile/profile';
import Chatroom from './chatroom/chatRoom';
import Chatroom2 from './chatroom/chatRoom2';
import Feedback from './feedback/feedback';


var First = SignIn;
var Second= Dashboard;
var Third= SignUp;
var Fourth=Profile;
var Fifth=Chatroom;
var Sixth= Chatroom2;
var Seventh=Feedback;

export default class App extends Component{

  render(){

    return(
      <Navigator
            initialRoute={{id : 'First'}}
            renderScene={this.navigate}
            configureScene={(route, routeStack) =>Navigator.SceneConfigs.FloatFromRight} />
    );
  }

  navigate(route , navigator)
{

   switch (route.id)
   {
           case 'First':
           return(<First navigator = {navigator}/>);

           case 'Second':
           return(<Second navigator = {navigator} />);

           case 'Third':
           return(<Third navigator = {navigator} />);

           case 'Fourth':
           return(<Fourth navigator = {navigator} />);

           case 'Fifth':
           return(<Fifth navigator = {navigator} />);

           case 'Sixth':
           return(<Sixth navigator = {navigator} data={route.data}/>);

           case 'Seventh':
           return(<Seventh navigator = {navigator} />);



    }


 }

}
