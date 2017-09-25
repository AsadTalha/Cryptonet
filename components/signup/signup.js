

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


export default class SignUp extends Component
{

  constructor() {
              super();
              this.state=
                {
                  email:'Enter your email',
                  password:'enter password'
                }
              }

    render(){
      return(

        <View style={styles.container}>

              <View style={styles.container1} >
                  <Text style={styles.logotxt} >Create account</Text>
              </View>

              <View style={styles.container2}>
                  <View style={styles.form}>
                      <ScrollView>



                          <View style={styles.textField}>
                             <Text style={styles.formTxt}> Email </Text>
                              <TextInput style={styles.inputField} placeholder={this.state.email}
                              onChangeText={(email) => this.setState({email})}/>

                          </View>

                          <View style={styles.textField}>
                             <Text style={styles.formTxt}> password </Text>
                              <TextInput style={styles.inputField} placeholder={this.state.password}
                              onChangeText={(password) => this.setState({password})}
                              secureTextEntry={true}/>

                          </View>



                      </ScrollView>

                      <TouchableHighlight style={styles.button} onPress={this.signUp.bind(this)}>
                        <Text style={styles.btnTxt}>
                            Create Account
                        </Text>
                      </TouchableHighlight>

                  </View>
                  <View style={{marginTop:10}}>
                     <Text onPress={this.signIn.bind(this)}>
                         Have an account
                     </Text>
                 </View>
              </View>
        </View>
      );
    }

    signUp(){
      var a=this.props.navigator;
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
        a.push({id : 'First'});
      }).catch(function(error) {
          alert(error);
      });
    }

    signIn(){
      this.props.navigator.pop();
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
    flex:1,
    backgroundColor:'#CEB9FE',
    justifyContent:'center',
    alignItems:'center'
  },
  logotxt:{
    color:'black',
    fontSize:25,
    fontWeight:'bold',
    marginTop:15,
    marginRight:10
  },
  container2:{
    flex:4,
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    height:'90%'
  },
  form:{
    height:'90%',
    width:'100%',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
  textField:{
    margin:15,
    width:'85%',
    marginLeft:20,
    marginTop:30
  },
  inputField:{
    height:50,
  },
  formTxt:{
      margin:5,
      color:'black'
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
  border:{
    height:0,
     borderWidth:0.3,
     marginTop:-10,
  },
});
