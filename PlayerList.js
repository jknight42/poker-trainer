import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayingCard from './PlayingCard.js';

export default class PlayerList extends React.Component {

  state = {
  
  }

  constructor() {
    super();
  }

  render() {
    const styles = StyleSheet.create({
      player: {
        marginTop: 20,
      }
    });

    const playerList = this.props.players.map(player => {
      if(player.currentHand[0] !== undefined) {
        return <View style={styles.player} key={player.key}><Text>{player.name}: ${player.chipStack}: ${player.betThisRound}</Text><PlayingCard suit={player.currentHand[0].suit} value={player.currentHand[0].value} /><PlayingCard suit={player.currentHand[1].suit} value={player.currentHand[1].value} /></View>
      } else {
        return <View style={styles.player} key={player.key}><Text>{player.name}: ${player.chipStack}: ${player.betThisRound}</Text></View> 
      }
    });
    
  	return (
  		<View>
        {playerList}
    	</View>
    );
    
  }
  
}
