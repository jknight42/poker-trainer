import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayingCard from "./PlayingCard.js";

export default class PlayerList extends React.Component {
  state = {};

  constructor() {
    super();
  }

  render() {
    const styles = StyleSheet.create({
      player: {
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap"
      },
      playerText: {
        fontFamily: "Courier",
        marginRight: 20
      },
      folded: {
        opacity: 0.2
      },
      currTurn: {
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "cornsilk",
        borderColor: "gainsboro",
        borderRadius: 5
      },
      playingCards: {
        flexDirection: "row",
        flexWrap: "wrap"
      }
    });

    const playerList = this.props.players.map(player => {
      let playerInfo = [];
      let playerStyles = [styles.player];
      let positionIndicator = "";

      if (player.isItMyTurn) {
        playerStyles = [...playerStyles, styles.currTurn];
      }

      if (player.hasFolded) {
        playerStyles = [...playerStyles, styles.folded];
      }

      switch (player.positionThisDeal) {
        case 0:
          positionIndicator = " D ";
          break;
        case 1:
          positionIndicator = " SB";
          break;
        case 2:
          positionIndicator = " BB";
          break;
        default:
          positionIndicator = "   ";
          break;
      }

      if (player.currentHand[0] !== undefined) {
        playerInfo.push(
          <View style={playerStyles} key={player.key}>
            <Text style={styles.playerText}>
              {positionIndicator} : {player.name} : ${player.chipStack} : $
              {player.betThisRound} :
            </Text>
            <PlayingCard
              suit={player.currentHand[0].suit}
              value={player.currentHand[0].value}
            />
            <PlayingCard
              suit={player.currentHand[1].suit}
              value={player.currentHand[1].value}
            />
          </View>
        );
      } else {
        playerInfo.push(
          <View style={playerStyles} key={player.key}>
            <Text style={styles.playerText}>
              {positionIndicator} : {player.name} : ${player.chipStack} : $
              {player.betThisRound}
            </Text>
          </View>
        );
      }

      return playerInfo;
    });

    return <View>{playerList}</View>;
  }
}
