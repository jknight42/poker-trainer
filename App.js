import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";
import PlayingCard from "./PlayingCard.js";
import PlayerList from "./PlayerList.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class App extends React.Component {
  // currDeal is changed each time a new set of cards are dealt to all players.
  // currRound is changed for each round of betting: preflop, flop, turn, river.

  state = {
    currDealInfo: {
      currRound: "pregame",
      whoseTurnIsIt: 3,
      highestBet: 0,
      currPotRound: 0,
      currPotCenter: 0,
      sharedCards: []
    },
    deckOfCards: [],
    players: [
      {
        key: 0,
        name: "Jeremy        ",
        chipStack: 50,
        isAi: false,
        isUser: true,
        currentHand: [],
        betThisRound: 0,
        positionThisDeal: 0,
        isItMyTurn: false,
        hasFolded: false
      },
      {
        key: 1,
        name: "Tex Bettor    ",
        chipStack: 50,
        isAi: true,
        isUser: false,
        currentHand: [],
        betThisRound: 0,
        positionThisDeal: 1,
        isItMyTurn: false,
        hasFolded: false
      },
      {
        key: 2,
        name: "Juan Suave    ",
        chipStack: 50,
        isAi: true,
        isUser: false,
        currentHand: [],
        betThisRound: 0,
        positionThisDeal: 2,
        isItMyTurn: false,
        hasFolded: false
      },
      {
        key: 3,
        name: "Chip Fullhouse",
        chipStack: 50,
        isAi: true,
        isUser: false,
        currentHand: [],
        betThisRound: 0,
        positionThisDeal: 3,
        isItMyTurn: false,
        hasFolded: false
      }
    ]
  };

  constructor(props) {
    super(props);

    this.createDeckOfCards();
  }
  createDeckOfCards = () => {
    // Create all cards
    let currCardNum = 0;
    const maxCardValue = 14;
    const suits = ["spade", "diamond", "club", "heart"];

    let deckOfCards = [];

    for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      for (var valueIndex = 2; valueIndex <= maxCardValue; valueIndex++) {
        deckOfCards[currCardNum] = {
          key: currCardNum,
          suit: suits[suitIndex],
          value: valueIndex,
          hasBeenDealt: false
        };
        currCardNum++;
      }
    }

    deckOfCards = shuffle(deckOfCards);

    this.state = { ...this.state, deckOfCards: deckOfCards };
  };
  dealCardsToPlayers = () => {
    let players = this.state.players;
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
      players[playerIndex].currentHand[0] = this.getNextCardFromTheDeck();
      players[playerIndex].currentHand[1] = this.getNextCardFromTheDeck();
    }
    this.setState({ players });
  };
  startGameBtnClicked = () => {
    // deal the pocket hands to all players:
    this.dealCardsToPlayers();

    // collect blinds
    let players = this.state.players;
    let currDealInfo = this.state.currDealInfo;
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
      if (players[playerIndex].positionThisDeal == 1) {
        // This player is the Small Blind
        players[playerIndex].betThisRound += 1;
        players[playerIndex].chipStack -= 1;
      }
      if (players[playerIndex].positionThisDeal == 2) {
        // This player is the Big Blind
        players[playerIndex].betThisRound += 2;
        players[playerIndex].chipStack -= 2;
      }
      if (players[playerIndex].positionThisDeal == 3) {
        players[playerIndex].isItMyTurn = true;
        currDealInfo.whoseTurnIsIt = 3;
      }
    }
    // end: collect blinds.

    currDealInfo.highestBet = 2;
    currDealInfo.currRound = "preflop";

    this.setState({ players });
    this.setState({ currDealInfo });
  };
  raiseBtnPress = () => {
    let currDealInfo = this.state.currDealInfo;
    let players = this.state.players;
    let whoseTurnIsIt = currDealInfo.whoseTurnIsIt;

    // raise the bet from the current player.
    // and remove that amount from chipstack
    players[whoseTurnIsIt].betThisRound += 5;
    players[whoseTurnIsIt].chipStack -= 5;

    currDealInfo.highestBet = players[whoseTurnIsIt].betThisRound;

    this.setState({ players });
    this.setState({ currDealInfo });
    this.moveAction();
  };
  checkBtnPress = () => {
    this.moveAction();
  };
  foldBtnPress = () => {
    let currDealInfo = this.state.currDealInfo;
    let players = this.state.players;
    let whoseTurnIsIt = currDealInfo.whoseTurnIsIt;

    players[whoseTurnIsIt].hasFolded = true;
    this.setState({ players });
    this.moveAction();
  };
  callBtnPress = () => {
    let currDealInfo = this.state.currDealInfo;
    let players = this.state.players;
    let whoseTurnIsIt = currDealInfo.whoseTurnIsIt;

    let betDifference =
      currDealInfo.highestBet - players[whoseTurnIsIt].betThisRound;

    if (betDifference > 0) {
      players[whoseTurnIsIt].betThisRound += betDifference;
      players[whoseTurnIsIt].chipStack -= betDifference;
    }
    this.setState({ players });
    this.moveAction();
  };

  moveAction = () => {
    let currDealInfo = this.state.currDealInfo;
    let players = this.state.players;

    // Moves the action from one player to the next after a player has acted.
    // If the player who acted last is the last player in the round, move to the next round

    // Tell previous player it's not their turn anymore:
    players[currDealInfo.whoseTurnIsIt].isItMyTurn = false;

    // Check to see if someone has won the game.
    // which would happen if all players have folded except one.
    let nonFoldedPlayers = [];
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
      if (players[playerIndex].hasFolded == false) {
        nonFoldedPlayers.push(playerIndex);
      }
    }
    if (nonFoldedPlayers.length == 1) {
      // only one player left who hasn't folded!
      // that player is winner!
      console.log("Winner is: ", players[nonFoldedPlayers[0]].name);
      // TODO: Disable all buttons.
      // TODO: End this deal.
    }

    // increment variable
    if (currDealInfo.whoseTurnIsIt == players.length - 1) {
      // this is the last player, move to beginning.
      currDealInfo.whoseTurnIsIt = 0;
    } else {
      currDealInfo.whoseTurnIsIt++;
    }

    // Folded players:
    // If the next player has folded run this function again
    // to move to the next-next player.
    if (players[currDealInfo.whoseTurnIsIt].hasFolded == true) {
      this.setState({ players });
      this.setState({ currDealInfo });
      this.moveAction();
    } else {
      // This player hasn't folded.

      // Update whose turn it is:
      players[currDealInfo.whoseTurnIsIt].isItMyTurn = true;

      // Add up all this round's bets to get the pot for this round:
      currDealInfo.currPotRound = 0;
      for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
        currDealInfo.currPotRound += players[playerIndex].betThisRound;
      }

      this.setState({ players });
      this.setState({ currDealInfo });

      // Determine if it's time to move to the next round
      // by checking that the pot is right (aka everyone has matched the highest bet)
      let timeForNextRound = true;
      for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
        if (
          players[playerIndex].hasFolded == false &&
          players[playerIndex].betThisRound < currDealInfo.highestBet
        ) {
          timeForNextRound = false;
        }
      }
      if (timeForNextRound) {
        this.goToNextRound();
      }
    }
  };
  goToNextRound = () => {
    // After the pot is right, this function moves the game to the next round.
    // For instance from preflop to flop or from flop to turn, etc.

    let currDealInfo = this.state.currDealInfo;
    let players = this.state.players;

    let nextCardFromDeck = null;

    if (currDealInfo.currRound == "preflop") {
      // get 3 cards (the flop) from the deck and add them to shared cards
      nextCardFromDeck = this.getNextCardFromTheDeck();
      currDealInfo.sharedCards.push(nextCardFromDeck);

      nextCardFromDeck = this.getNextCardFromTheDeck();
      currDealInfo.sharedCards.push(nextCardFromDeck);

      nextCardFromDeck = this.getNextCardFromTheDeck();
      currDealInfo.sharedCards.push(nextCardFromDeck);

      currDealInfo.currRound = "flop";
    } else if (currDealInfo.currRound == "flop") {
      // Move from flop to river:

      nextCardFromDeck = this.getNextCardFromTheDeck();
      currDealInfo.sharedCards.push(nextCardFromDeck);

      currDealInfo.currRound = "turn";
    } else if (currDealInfo.currRound == "turn") {
      // Move from turn to river:

      nextCardFromDeck = this.getNextCardFromTheDeck();
      currDealInfo.sharedCards.push(nextCardFromDeck);

      currDealInfo.currRound = "river";
    } else if (currDealInfo.currRound == "river") {
      // TODO: END game and declare winner
      // TODO: Add any winnings to the real players persistent accounts data
      // TODO: Add any stats to the real players persistent account data (wins, losses, biggest pot, skill level?)
      console.log("Game over!");
    }

    // move the bets from the current round (currPotRound) to the central pot (currPotCenter)
    currDealInfo.currPotCenter =
      currDealInfo.currPotCenter + currDealInfo.currPotRound;
    currDealInfo.currPotRound = 0;

    // reset highestBet to zero:
    currDealInfo.highestBet = 0;

    // reset current bet for each player to zero:
    for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
      players[playerIndex].betThisRound = 0;
    }

    // update state:
    this.setState({ currDealInfo });
    this.setState({ players });
  };
  getNextCardFromTheDeck = () => {
    // copy deckOfCards from state so we can manipulate it.
    let deckOfCards = this.state.deckOfCards;

    let cardIndex = 0;
    while (deckOfCards[cardIndex].hasBeenDealt == true) {
      cardIndex++;
    }
    let nextCard = deckOfCards[cardIndex];
    deckOfCards[cardIndex].hasBeenDealt = true;
    this.setState({ deckOfCards });
    return nextCard;
  };
  render() {
    const whoseTurnIsIt = this.state.whoseTurnIsIt;
    const players = this.state.players;
    return (
      <ScrollView style={styles.mainContainer}>
        <Text>Texas Hold Em Poker</Text>
        <View style={styles.deckOfCards}>
          {this.state.deckOfCards.map(oneCard => (
            <PlayingCard
              key={oneCard.key}
              suit={oneCard.suit}
              value={oneCard.value}
              hasBeenDealt={oneCard.hasBeenDealt}
            />
          ))}
        </View>
        <View style={styles.sharedCards}>
          {this.state.currDealInfo.sharedCards.map(oneCard => (
            <PlayingCard
              key={oneCard.key}
              suit={oneCard.suit}
              value={oneCard.value}
            />
          ))}
        </View>
        <Text>Highest Bet: {this.state.currDealInfo.highestBet}</Text>
        <Text>Pot (round): {this.state.currDealInfo.currPotRound}</Text>
        <Text>Pot (total): {this.state.currDealInfo.currPotCenter}</Text>
        <Text>Round: {this.state.currDealInfo.currRound}</Text>
        <PlayerList players={this.state.players} />
        // If we are in "pregame" state show the start button:
        {this.state.currDealInfo.currRound == "pregame" ? (
          <TouchableOpacity
            style={styles.startGameBtn}
            onPress={this.startGameBtnClicked}
          >
            <View style={styles.actionButtonView}>
              <Text style={styles.actionButtonText}>Start Game</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        // If we are not in "pregame", show the btns for raise, check, call,
        fold.
        {this.state.currDealInfo.currRound != "pregame" ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={this.raiseBtnPress}
            >
              <View style={styles.actionButtonView}>
                <Text style={styles.actionButtonText}>Raise</Text>
                <MaterialCommunityIcons
                  name="arrow-up"
                  style={styles.actionButtonIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.currDealInfo.highestBet ==
                this.state.players[this.state.currDealInfo.whoseTurnIsIt]
                  .betThisRound
                  ? styles.actionButton
                  : styles.actionButtonDisabled
              }
              disabled={
                this.state.currDealInfo.highestBet ==
                this.state.players[this.state.currDealInfo.whoseTurnIsIt]
                  .betThisRound
                  ? false
                  : true
              }
              onPress={this.checkBtnPress}
            >
              <View style={styles.actionButtonView}>
                <Text style={styles.actionButtonText}>Check</Text>
                <MaterialCommunityIcons
                  name="check"
                  style={styles.actionButtonIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.currDealInfo.highestBet >
                this.state.players[this.state.currDealInfo.whoseTurnIsIt]
                  .betThisRound
                  ? styles.actionButton
                  : styles.actionButtonDisabled
              }
              disabled={
                this.state.currDealInfo.highestBet >
                this.state.players[this.state.currDealInfo.whoseTurnIsIt]
                  .betThisRound
                  ? false
                  : true
              }
              onPress={this.callBtnPress}
            >
              <View style={styles.actionButtonView}>
                <Text style={styles.actionButtonText}>Call</Text>
                <MaterialCommunityIcons
                  name="equal"
                  style={styles.actionButtonIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={this.foldBtnPress}
            >
              <View style={styles.actionButtonView}>
                <Text style={styles.actionButtonText}>Fold</Text>
                <MaterialCommunityIcons
                  name="close"
                  style={styles.actionButtonIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sharedCards: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  deckOfCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20
  },
  actionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 50
  },
  startGameBtn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "blue",
    flexGrow: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "blue",
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  },
  actionButtonDisabled: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gainsboro",
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  },
  actionButtonView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionButtonText: {
    color: "blue"
  },
  actionButtonIcon: {
    fontSize: 17,
    color: "blue"
  },
  mainContainer: {
    padding: 10,
    marginTop: 50
  }
});

// Shuffle function grabbed from:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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
};
