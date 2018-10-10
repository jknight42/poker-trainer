import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class PlayerUser extends Player {
  // PlayerAi is a AI Player whose behavior is set by the computer. 
  // It is not a human player.  

  // Potential simple AI: Calculate the odds of making a two pair or above
  // based on pocket cards and whatever is on the table in this round. 
  // If the odds are 50% or more, make standard 2/3 pot bet (or 3x big blind pre-flop). 
  // If not, fold. 
  // More advanced AI: Consider what hands the other players could have. 
  // Tweak the 50% threshold and bet size to see what works best over time. 
  // As the chips stack gets smaller, make smaller than 2/3 pot bets. 
  // Maybe which ever is less: 2/3 pot or 1/10th chip stack. 

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


