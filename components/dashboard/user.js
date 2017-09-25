import React,{Component} from 'react';
import {Image,Text,StyleSheet,View,} from 'react-native';

export default class User extends Component {
  render(){
    return(
      <View style={styles.listObject} >
        <View style={styles.imageView}>
              <Image source={this.props.picture} style={{width:70 ,height:70, borderRadius:5}}/>
        </View>
        <View style={styles.statusView}>
              <Text style={styles.status}>
                  {this.props.status}
              </Text>
              <View style={styles.lastSeen}>
                 <Text style={styles.name}>
                      {this.props.name}
                 </Text>
                 <Text style={styles.name}>
                      4 min ago
                 </Text>
              </View>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({

  listObject:{
    backgroundColor:'white',
    width:'95%',
    height:100,
    margin:10,
    flexDirection:'row',
    padding:5,
    alignItems:'center',
    borderRadius:5
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
