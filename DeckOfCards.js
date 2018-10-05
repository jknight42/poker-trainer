import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayingCard from './PlayingCard.js';

export default class DeckOfCards extends React.Component {


  constructor() {
  	const numOfCards = 52;
  	const cardsPerSuit = 13;
  	const suits = ["spade","diamond","club","heart"];
  	let currCardNum = 0;

  	super();

  	this.state = {
  		cards: [],
  	};

    // Create all cards
    for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    	for (var valueIndex = 0; valueIndex <= cardsPerSuit; valueIndex++) {
    		currCardNum++;
  			this.state = {
  				cards: [...this.state.cards,
		  				{
		  					key: currCardNum,
		  					suit: suits[suitIndex],
		  					value: valueIndex,
		  					hasBeenDealt: false,
		  				}
  					],
  			};
    	}
    }

    // Shuffle our newly created deck of cards.
    // this.state.cards = shuffle(this.state.cards);

  }




  render() {
  	return (
  		<View style={styles.deckOfCards}>
      	{this.state.cards.map((oneCard) => <PlayingCard key={oneCard.key} suit={oneCard.suit} value={oneCard.value} />)}
    	</View>
  	);
  }


}
const styles = StyleSheet.create({
  deckOfCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});



// Shuffle function grabbed from:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}