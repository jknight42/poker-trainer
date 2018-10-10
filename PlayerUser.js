import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class PlayerUser extends Player {
  // PlayerUser is the human Player that is currently using this app. 
  // Not an AI player or a human player who is also on this game.  

  constructor() {
  	super();

  }

  render() {
  	return (
  		<View style={styles.something}>
      	This is the current players information rendered. 
    	</View>
  	);
  }

}
const styles = StyleSheet.create({
  something: {
	  "fontSize": 15,
  }
});


