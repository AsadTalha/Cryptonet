import React,{Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';


export default class Buttons extends Component {
  render(){
    return(

      <View style={styles.button}>
      <Text>
      {this.props.name}
      </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  button:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#B8A6E4',
    borderRadius: 0,
    margin:1
   }

});
