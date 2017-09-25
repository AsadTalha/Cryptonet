
import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

import firebase from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

export default class Dashboard extends Component {

    constructor(){
      super();
      this.state={
        users:[],
        userFetch:[],
        greetings:''
      }
    }
    componentDidMount(){
                        firebase.database().ref('userList/').on('value',(snapshot)=>{
                        const currentMessages =snapshot.val()
                        this.setState({
                          userFetch:currentMessages
                        })
                      })
                      var current_time = new moment ().format("HH:mm");
                      var time= current_time.replace(':','')

                      if(time > 600 && time < 1200){
                        var greetings = 'Good Morning'
                      }
                      else if (time > 1200 && time < 1800 ) {
                        var greetings = 'Good Afternoon'
                      }
                      else if (time > 1800 && time < 2400) {
                        var greetings = 'Good Night'
                      }
                      this.setState({
                        greetings:greetings
                      })
    }
        logOut(){
          var a=this.props.navigator;
          firebase.auth().signOut().then(function() {a.pop();})
    }
        profilePress(){
          this.props.navigator.push({id : 'Fourth'});
        }
        globalPress(){
          this.props.navigator.push({id : 'Fifth'});
        }
        feedPress(){
          this.props.navigator.push({id : 'Seventh'});

        }



    render(){

      return(
        <View style={styles.container}>

          <View style={styles.header} >
              <Icon name="sign-out" size={20} color="white" onPress={this.logOut.bind(this)} />
              <Text style={styles.headerTxt}>
                {this.state.greetings}
              </Text>
              <Icon name="cog" size={20} color="white" onPress={this.profilePress.bind(this)}/>
          </View>
          <View style={styles.header2}>
            <Icon name="envelope-open-o" size={20} color="white" onPress={this.feedPress.bind(this)}/>
            <Icon name="user" size={20} color="gold" />
            <Icon name="users" size={20} color="white" onPress={this.globalPress.bind(this)}/>
          </View>

          <View style={styles.listCon}>
            <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
            <ScrollView>
            {
              this.state.userFetch.map((u)=>{
                var name = u.username
                return(
                  <TouchableHighlight
                    underlayClolor={'white'}
                    onPress={()=>{
                    this.props.navigator.push({
                                                id: 'Sixth',
                                                data: name
                                              })
                  }}>
                  <View style={styles.listObject}>
                  <View>
                        <Image source={{uri: u.profile_picture}}
                        style={{width:100 ,height:100, borderRadius:50, marginLeft:-6}}/>
                  </View>
                  <View style={{marginLeft:15}}>
                        <Text >
                        {u.username}
                        </Text>
                        <Text >
                        {u.email}
                        </Text>

                  </View>

                  </View>
                  </TouchableHighlight>
                );
              })
            }

            </ScrollView>
            </View>

          </View>

          <View style={styles.footer} >
                <Icon name="plus" size={20} color="black" />
                <Text style={styles.footerTxt} >Add Friend</Text>
          </View>


        </View>
      );
    }
    }


const styles=StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center'
  },
  header:{
    height:'10%',
    width:'100%',
    backgroundColor:'black',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:20
  },
  header2:{
    height:'10%',
    width:'100%',
    backgroundColor:'black',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    padding:20
  },
  headerTxt2:{
    color:'white',
    fontFamily:'roboto',
    fontSize:16
  },
  headerTxt:{
    color:'white',
    fontFamily:'roboto',
    fontSize:16
  },
  listCon:{
    backgroundColor:'#CEB9FE',
    width:'100%',
    height:'83%',
    alignItems:'center',
    justifyContent:'center'
  },
  listObject:{
    backgroundColor:'white',
    width:'95%',
    height:100,
    margin:10,
    flexDirection:'row',
    padding:5,
    alignItems:'center',
    borderRadius:50
  },
  footer:{
    height:'7%',
    backgroundColor:'#FFEC57',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  footerTxt:{
    fontWeight:'bold',
    fontSize:18,
    color:'#000',
    fontFamily:'roboto',
    paddingLeft:20
  },
  imageView:{
    borderRadius:5
  },
  statusView:{
    marginLeft:20,
    justifyContent:'space-around',
    height:70
  },
  lastSeen:{
    width:'50%',
    flexDirection:'row',
    justifyContent:'space-between'

  },
  border:{
    height:1,
     borderWidth:1,
  },
  name:{
    fontWeight:'bold',

  }
});
