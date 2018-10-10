import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import DeckOfCards from './DeckOfCards.js';
import PlayingCard from './PlayingCard.js';
import PlayerList from './PlayerList.js';

export default class App extends React.Component {

  state = {
    roundInfo: {
      currentRound: "preflop",
      dealerSeat: 0,
      bigBlindSeat: 1,
      smallBlindSeat: 2, 
      highestBet: 0, 
    },
    deckOfCards: [],
    players: [
      {
        key: 0,
        name: "Jeremy",
        chipStack: 100,
        isAi: false,
        isUser: true,
        currentHand: [],
        betThisRound: 0,
      },
      {
        key: 1,
        name: "Tex Bettor",
        chipStack: 100,
        isAi: true,
        isUser: false,
        currentHand: [],
        betThisRound: 0,
      },
      {
        key: 2,
        name: "Juan Suave",
        chipStack: 100,
        isAi: true,
        isUser: false,
        currentHand: [],
        betThisRound: 0,
      },
      {
        key: 3,
        name: "Chip Fullhouse",
        chipStack: 100,
        isAi: true,
        isUser: false,
        currentHand: [],
        betThisRound: 0,
      }
    ],
    numOfPlayers: 8,
  }

  constructor(props) {
    super(props);

    this.createDeckOfCards();

  }
  createDeckOfCards = () => {
    // Create all cards
    let currCardNum = 0;
    const maxCardValue = 14;
    const suits = ["spade","diamond","club","heart"];
    
    let deckOfCards = [];

    for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      for (var valueIndex = 2; valueIndex <= maxCardValue; valueIndex++) {
        deckOfCards[currCardNum] = {
          key: currCardNum,
          suit: suits[suitIndex],
          value: valueIndex,
          hasBeenDealt: false,
        }
        currCardNum++;
      }
    }
    
    deckOfCards = shuffle(deckOfCards);
    
    this.state = {
      ...this.state,
      deckOfCards: deckOfCards,
    }
  }
  dealCardsToPlayers = () => {
    let players = this.state.players;
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
      players[playerIndex].currentHand[0] = this.getNextCardFromTheDeck();
      players[playerIndex].currentHand[1] = this.getNextCardFromTheDeck();
    }
    this.setState({players});
  }
  buttonPressed = () => {
    this.dealCardsToPlayers();
  }
  getNextCardFromTheDeck = () => {
    // copy deckOfCards from state so we can manipulate it. 
    let deckOfCards = this.state.deckOfCards;
    
    let cardIndex = 0;
    while(deckOfCards[cardIndex].hasBeenDealt == true) {
      cardIndex++;
    }
    let nextCard = deckOfCards[cardIndex];
    deckOfCards[cardIndex].hasBeenDealt = true;
    this.setState({deckOfCards});
    return nextCard;
  }
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <Text>Texas Hold Em Poker</Text>
        <View style={styles.deckOfCards}>
          {this.state.deckOfCards.map((oneCard) => <PlayingCard key={oneCard.key} suit={oneCard.suit} value={oneCard.value} hasBeenDealt={oneCard.hasBeenDealt} />)}
        </View>

        <PlayerList players={this.state.players} />
        <Button title="Deal Cards" onPress={this.buttonPressed} onClick={this.buttonClicked} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deckOfCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainContainer: {
    padding: 10,
    marginTop: 50,
  }
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


