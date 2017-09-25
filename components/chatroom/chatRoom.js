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
import CryptoJS from 'crypto-js';

var user = firebase.auth().currentUser;


// "auth != null",
export default class Chatroom extends Component
{


  constructor(props , context) {
      super(props , context);
      this.Submitting=this.Submitting.bind(this)
      this.state={
            name:'',
            photo:'',
            imagePath:'./images/IMG.jpg',
            time:'',
            path:'messages/',
            message:'',
            cryptMessage:'',
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
       id=profile.uid
       photo=profile.photoURL
       email=profile.email

      });
      this.setState({
        name:name,
        id:id,
        photo:photo,
        email:email
      })


    }

      Submitting(event){
        const nextMessage={
          key:this.state.messages.length,
          text:this.state.message,
          user:this.state.name,
          time:this.state.time,
          photo:this.state.imagePath
        }
        var path = this.state.path;
        firebase.database().ref(path+nextMessage.key).set(nextMessage)

        const nextMessage2={
          key:this.state.messages.length,
          text:this.state.cryptMessage,
          user:this.state.name,
          time:this.state.time,
          photo:this.state.imagePath
        }
        firebase.database().ref('User_messages/'+nextMessage.key).set(nextMessage2)

      }
      back(){
        this.props.navigator.pop();

      }

    render(){
      var currentMessage = this.state.messages.map((message,i)=>{
        return(
          <View style={styles.chat}>
              <View>
                <Image/>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
              <Text style={styles.user}>
                {message.user}
              </Text>
              <Text style={styles.user}>
                {message.time}
              </Text>
              </View>

              <Text style={styles.chatTxt}>
              {message.text}
              </Text>
          </View>
        );
      })
      return(

        <View style={styles.container}>

            <View style={styles.header}>
                <Icon name="chevron-left" size={20} color="white" onPress={this.back.bind(this)}/>
                <Text style={styles.headerTxt}>
                  {this.props.name}
                  Global Chat
                </Text>
                <Text>
                  ::::::::
                </Text>
            </View>

            <View style={styles.cahtBody}>

                  <ScrollView style={styles.innerChat} >
                          {currentMessage}
                  </ScrollView>

            </View>

            <View style={styles.footer}>
                <View style={styles.fotOpt}>
                <Icon name="camera" size={22} color="black" />
                </View>

                <View style={styles.fotInput}>
                    <TextInput placeholder="Your message"  multiline={true} onChangeText={(text)=>{
                      var inputTxt=text;
                      var ciphertext = CryptoJS.AES.encrypt(inputTxt, 'secret key 123');
                      var cipherString=ciphertext.toString();

                      var current_time = new moment ().format("HH:mm");
                      this.setState({
                        cryptMessage:cipherString,
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
  cahtBody:{
    height:'79%'
  },
  innerChat:{
    width:'95%',
    backgroundColor:'white',
  },
  chat:{
    margin:10,
    backgroundColor:'#f2f2f2',
    borderRadius:20,
  },
  chatTxt:{
    margin:10,
    fontSize:15,
  },
  user:{
    margin:5,
    fontSize:12,
    color:'black'
  },

  footer:{
    backgroundColor:'#FFEC57',
    height:'10%',
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  fotOpt:{
    height:'100%',
    width:'10%',
    justifyContent:'center',
    alignItems:'center'
  },
  fotInput:{
    height:'100%',
    width:'70%',
    justifyContent:'center',
  },
  fotSend:{
    height:'100%',
    width:'20%',
    justifyContent:'center',
    alignItems:'center'
  },

});
