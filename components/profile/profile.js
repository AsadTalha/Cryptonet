

import React, {Component} from 'react';
import{
        View,
        Text,
        TextInput,
        StyleSheet,
        Image,
        TouchableHighlight
      } from 'react-native';
      import Icon from 'react-native-vector-icons/FontAwesome';
      import ImagePicker from 'react-native-image-picker';
      import firebase from '../firebase';
      var user = firebase.auth().currentUser;






export default class Profile extends Component {


        constructor(){
          super();
          this.updatePress=this.update.bind(this)
          this.logOut=this.logOut.bind(this)
          this.state={
              name:'',
              bufferName:'',
              photo:'',
              imagePath:'',
              id:'',
              email:'email',
              users:[
                {key:'0',name:'Name one',photo:'reandone'}
              ],
              userFetch:[]
          }
        }
        render(){
          return(
            <View style={styles.container}>

                  <View style={styles.header}>
                  <Icon name="chevron-left" size={20} color="white"
                  onPress={this.logOut} />
                  </View>

                  <View style={styles.profileCon}>
                      <View style={styles.profileBody}>
                            <View style={styles.profileOne}>
                                <TouchableHighlight onPress={this.openImagePicker.bind(this)}>
                                <View>
                                <Text>
                                edit
                                </Text>
                                <Image
                                source={{uri: this.state.photo}} style={{width:100 ,height:100, borderRadius:5}}/>
                                </View>
                                </TouchableHighlight>

                                <Text style={styles.name}>
                                  {this.state.name}
                                </Text>


                            </View>
                            <View style={styles.profileTwo}>
                                  <Text style={styles.ptxt}>Name
                                  </Text>
                                  <TextInput placeholder={this.state.name}
                                  onChangeText={(bufferName) => this.setState({bufferName:bufferName})}/>

                                  <Text style={styles.ptxt}>E-mail
                                  </Text>
                                  <TextInput placeholder={this.state.email}
                                  onChangeText={(email) => this.setState({email})}/>


                            </View>
                      </View>
                      <TouchableHighlight onPress={this.updatePress}>
                      <View style={styles.btn}>
                          <Text>
                              Update
                          </Text>
                      </View>
                      </TouchableHighlight>

                  </View>

                  <View style={styles.footer}>

                  </View>

            </View>
          );
        }
        componentWillMount(){
          user = firebase.auth().currentUser;
          user.providerData.forEach(function (profile) {
          name=profile.displayName
          id=profile.uid
          photo=profile.photoURL
          email=profile.email
         });
         this.setState({
           id:id,
           email:email,
           name:name,
           photo:photo,
         })
        }
        componentDidMount(){


                  firebase.database().ref('userList/').on('value',(snapshot)=>{
                  const currentMessages =snapshot.val()
                  this.setState({
                    userFetch:currentMessages
                  })
                })



        }
        logOut(){
          this.props.navigator.pop();
        }
        update(){
                //    var Pname=photo.name
                //    alert(photo)
                //    var storageRef = firebase.storage().ref('images/userProfile/'+Pname);
                //    var uploadPicture = storageRef.put(photo)
                 //
                //    uploadPicture.on('state_changed',function(snapshot){
                 //
                //    },function(error){
                //      alert(error);
                //    },function(){
                //      var downlaodURL = uploadPicture.snapshot.downloadURL;
                //      alert(downlaodURL)
                //    }
                //  );

                   var user = firebase.auth().currentUser;
                   var  bufferName=this.state.bufferName
                   var photo=this.state.imagePath
                   var id=this.state.id
                    user.updateProfile({
                    displayName:bufferName,
                    photoURL: photo

                  }).then(function(){
                    user = firebase.auth().currentUser;
                    user.providerData.forEach(function (profile) {
                    name=profile.displayName
                    id=profile.uid
                    photo=profile.photoURL
                    email=profile.email
                   });
                  })

                 this.setState({
                   id:id,
                   email:email,
                   name:name,
                   photo:photo
                 })
                 var i = this.state.userFetch.length

                 const nextUser = {
                   name:bufferName,
                   photo:photo,
                   key:i
                 }
                 firebase.database().ref('userList/'+i).set({
                   username: bufferName,
                   email: this.state.email,
                   profile_picture : photo
                 });

        }

        openImagePicker(){
                  const options={
                    title:'select avatar',
                    storageOptions:{
                    skipBackup: true,
                    path:'images'
              }
            }
            ImagePicker.showImagePicker(options,(response) => {
                            this.setState({
                              imagePath: response.uri
                            })
                        })
        }
}

const styles=StyleSheet.create({

    container:{
          justifyContent:'space-between',
          flex:1,
          backgroundColor:'#CEB9FE',
          alignItems:'center'
    },
    header:{
      width:'100%',
      flexDirection:'row',
      height:'7%',
      backgroundColor:'black',
      alignItems:'center',
      height:'10%',
      padding:20
    },
    profileCon:{
        justifyContent:'center',
        alignItems:'center',
        width:'80%',
    },
    profileBody:{
      width:'100%',
      backgroundColor:'white',
      height:'80%',
      justifyContent:'space-around',
      alignItems:'center'
    },
    profileOne:{
        width:'90%',
        flexDirection:'row',
    },
    name:{
      marginLeft:40,
      marginTop:'10%',
      fontWeight:'bold',
    },
    profileTwo:{
      width:'90%',
      justifyContent:'space-between',
      marginTop:-50
    },
    ptxt:{
      marginLeft:20,
      marginBottom:-10,
      marginTop:15
    },
    btn:{
      height:50,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFEC57',
    },
    footer:{
      height:'10%'
    }

});
