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
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../firebase';
import moment from 'moment';

var user = firebase.auth().currentUser;


export default class Feedback extends Component
{


  constructor(props , context) {
      super(props , context);
      this.Submitting=this.Submitting.bind(this)
      this.state={
            name:'',
            path:'feedback/',
            message:'',
            messages:[]
          }
        }

        componentWillMount() {
          var path = this.state.path;
          firebase.database().ref(path).on('value',(snapshot)=>{
          const currentMessages =snapshot.val()
          if(currentMessages != null){
            this.setState({
              messages : currentMessages
            })

            }
            var len = this.state.messages.length;

           })
           var user = firebase.auth().currentUser;
           user = firebase.auth().currentUser;
           user.providerData.forEach(function (profile) {
           name=profile.displayName
           email=profile.email

          });
          this.setState({
            name:name,
            email:email
          })


    }

      Submitting(event){
        const nextMessage={
          key:this.state.messages.length,
          text:this.state.message,
          user:this.state.name,
          time:this.state.time,
        }
        var path = this.state.path;
        firebase.database().ref(path+nextMessage.key).set(nextMessage)
}

      back(){
        this.props.navigator.pop();
      }

    render(){
      return(

        <View style={styles.container}>

            <View style={styles.header}>
                <Icon name="chevron-left" size={20} color="white" onPress={this.back.bind(this)}/>
                <Text style={styles.headerTxt}>
                  Feedback
                </Text>
                <Text>
                  ::::::::
                </Text>
            </View>

            <View style={styles.note}>
              <Text style={styles.notetxt}>
                Dear User.
                Thank you for downloading our app, for using our service.
                Most importantly trusting us with your conversations.
                Please leave any complain or feedback you have, we'll responce
                you as soon as possible :-) .
              </Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.fotInput}>
                    <TextInput placeholder="Your message"  multiline={true} onChangeText={(text)=>{
                      var inputTxt=text;
                      var current_time = new moment ().format("HH:mm");
                      this.setState({
                        message:inputTxt,
                        time:current_time
                      })
                    }}/>
                </View>
                <View style={styles.fotSend} >
                  <TouchableHighlight onPress={this.Submitting}>
                    <Icon name="play" size={22} color="black" />
                  </TouchableHighlight>
                </View>

            </View>

        </View>
      );
    }
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'space-between',
    backgroundColor:'#CEB9FE',
    alignItems:'center'
  },
  header:{
    height:'10%',
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    backgroundColor:'black',
    alignItems:'center'
  },
  headerTxt:{
    color:'white',
    fontSize:16,
    fontFamily:'roboto'
  },
  address:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:15
  },
  note:{
    width:'80%',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    height:'60%',

  },
  notetxt:{
    padding:10,
    fontSize:16,
    fontWeight:'bold'
  },
  footer:{
    backgroundColor:'#FFEC57',
    height:'10%',
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },

  fotInput:{
    height:'100%',
    width:'70%',
    justifyContent:'center',
    marginBottom:10
  },
  fotSend:{
    height:'100%',
    width:'20%',
    justifyContent:'center',
    alignItems:'center'
  },

});
