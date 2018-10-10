import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Player extends React.Component {

	state = {
		chipStack: 100,
		isAiPlayer: false,
  }

  constructor() {
		super();
		
		let {name,positionAtTable, positionInRound} = this.props;

  	this.state = {
  		
  	};
  }

  render() {
  	return (
  		<View style={styles.something}>
      	
    	</View>
  	);
  }

}
Player.defaultProps = {
  name: "Player X",
	positionAtTable: 0,
	positionInRound: 0,
};

const styles = StyleSheet.create({
  something: {
	  "fontSize": 15,
  }
});


