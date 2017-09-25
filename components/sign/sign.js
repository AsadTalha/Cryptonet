

import React, {Component} from 'react';
import{
        View,
        Text,
        TextInput,
        StyleSheet,
        ScrollView,
        Image,
        TouchableHighlight

      } from 'react-native';
import firebase from '../firebase';

export default class SignIn extends Component
{

  constructor() {
              super();
              this.state=
                {
                  Username:'Enter your email',
                  password:'enter your password'
                }
              }

    render(){
      return(

        <View style={styles.container}>

              <View style={styles.container1}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.logotxt}>CryptoNet</Text>
                  <Image source={require('./logo.png')} style={{width: 90, height: 90}}/>
                  </View>
              </View>

              <View style={styles.container2}>
                  <View style={styles.form}>
                      <ScrollView>

                          <View style={styles.textField}>
                             <Text style={styles.formTxt}> Username </Text>
                              <TextInput style={styles.inputField} placeholder={this.state.Username}
                              onChangeText={(Username) => this.setState({Username})}/>
                              <View style={styles.border}>
                              </View>
                          </View>

                          <View style={styles.textField}>
                             <Text style={styles.formTxt}> password </Text>
                              <TextInput style={styles.inputField} placeholder={this.state.password}
                              onChangeText={(password) => this.setState({password})}
                              secureTextEntry={true}/>
                              <View style={styles.border}>
                              </View>
                          </View>

                      </ScrollView>

                      <TouchableHighlight style={styles.button} onPress={this.logInPress.bind(this)}>
                        <Text style={styles.btnTxt}>
                            Get started
                        </Text>
                      </TouchableHighlight>

                  </View>

                   <View style={{marginTop:10}}>
                      <Text onPress={this.signUp.bind(this)}>
                          Need an account
                      </Text>
                  </View>

              </View>
        </View>
      );
    }

    logInPress() {
      var a=this.props.navigator;
      firebase.auth().signInWithEmailAndPassword(this.state.Username, this.state.password).then(function() {
        a.push({id : 'Second'});
      }).catch(function(error) {
        if(error){
          switch(error.code){
            case "auth/invalid-email":
            alert("Invali email.");
            break;

            case "auth/wrong-password":
            alert("Wrong password.");
            break;

            case "auth/user-not-found":
            alert("User not Found.");
            break;

            default:
            alert("Error creating user:");
          }
        }
      });
      // this.props.navigator.push({id : 'Second'});
    }

    signUp(){
      this.props.navigator.push({id : 'Third'});
    }




}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#CEB9FE',
    justifyContent:'center',
    alignItems:'center'
  },
  container1:{
    flex:2,
    backgroundColor:'#CEB9FE',
    justifyContent:'center',
    alignItems:'center'
  },
  logotxt:{
    color:'black',
    fontSize:40,
    fontWeight:'bold',
    marginTop:15,
    marginRight:10
  },
  container2:{
    flex:4,
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    height:'80%'
  },
  form:{
    height:'70%',
    width:'100%',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  textField:{
    margin:5,
    width:'85%',
    marginLeft:20,
    marginTop:30
  },
  inputField:{
    height:50,
  },
  formTxt:{
      margin:5,
      color:'black',
      fontFamily:'roboto',
      fontSize:16
  },
  button:{
    height:50,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFEC57',
  },
  btnTxt:{
    justifyContent:'center',
    alignItems:'center',
  },



});
