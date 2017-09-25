

import React, {Component} from 'react';
import{
        View,
        Text,
        TextInput,
        StyleSheet,
        ScrollView,
        TouchableHighlight
      } from 'react-native';
import Buttons from './button';



export default class Forms extends Component {

  constructor() {
              super();
              this.state=
                {
                  email:'Default',
                  password:'Default'
                }
              }

  //  testPress (){
  //    alert('hello'+ this.state.email);
  //    Actions.Main
  //   }



    render(){
      return(
        <View style={styles.container2}>
          <ScrollView>
          <View style={{height:80}}>
          </View>
          <View style={styles.formContainer}>
                <View style={styles.formInput}>
                      <View style={styles.userIcon}>

                      </View>

                      <View style={styles.inputField}>
                        <Text style={{color:'white'}}>
                        USER NAME
                        </Text>
                        <TextInput underlineColorAndroid={'transparent'}
                         style={styles.inputTxt} onChangeText={(email) => this.setState({email})}/>
                        <View style={styles.border}>
                        </View>
                      </View>
                </View>
          </View>

          <View style={styles.formContainer}>
                <View style={styles.formInput}>
                      <View style={styles.userIcon}>
                      </View>

                      <View style={styles.inputField}>
                        <Text style={{color:'white'}}>
                        password
                        </Text>
                        <TextInput underlineColorAndroid={'transparent'}
                        style={styles.inputTxt} onEndEditing={(text)=>{this.setState({password: text})}}/>
                        <View style={styles.border}>
                        </View>
                      </View>
                </View>
          </View>

            <TouchableHighlight onPress={this.props.onpress}>
            <View>
            <Buttons name='Get Started'/>
            </View>
            </TouchableHighlight>

            <View style={styles.createAccount}>

              <Text style={styles.signTxt}>
                Create Account
              </Text>

              <Text style={styles.signTxt}>
                Forget password
              </Text>

           </View>
        </ScrollView>
       </View>

      );
    }


}

const styles=StyleSheet.create({


  container2:{
    flex:3,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',

  },
  createAccount:{
    flexDirection:'row',
    marginTop:40,
    justifyContent:'space-between'

  },
  signTxt:{
    color:'white'
  },
  formContainer:{
    marginTop: 20,
    marginBottom:20
  },
  formInput:{
    flexDirection:'row',
    width:'80%',
  },
  userIcon:{
    flex:0.3
  },
  inputField:{
    flex:0.7,

  },
  border:{
    height:0,
     borderWidth:0.3,
     borderColor:'white',
     marginTop:-15,
     width:'135%'
  },
  inputTxt:{
    color:'white',
     marginTop:-5,
     fontSize:16
  }


});
