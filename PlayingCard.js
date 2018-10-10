import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class PlayingCard extends View {
  render() {
	  const {suit, value, hasBeenDealt} = this.props;
	  let suitIconName = "";
	  let suitColorName = "";
	  let valueName = "";

	  switch(suit) {
	  	case "club":
	  		suitIconName = "cards-club";
	  		suitColorName = "black";
	  		break;
	  	case "spade":
	  		suitIconName = "cards-spade";
	  		suitColorName = "black";
	  		break;
	  	case "diamond":
	  		suitIconName = "cards-diamond";
	  		suitColorName = "red";
	  		break;
	  	case "heart":
	  		suitIconName = "cards-heart";
	  		suitColorName = "red";
				break;
			default:
				suitIconName = "alert-circle";
				suitColorName = "green";
	  }


	  switch(value) {
	  	case 11:
	  		valueName = "J";
	  		break;
	  	case 12:
	  		valueName = "Q";
	  		break;
	  	case 13:
	  		valueName = "K";
				break;
			case 14:
	  		valueName = "A";
	  		break;
	  	default:
	  		valueName = value;
	  		break;
	  }

	  const styles = StyleSheet.create({
	    card: {
	      backgroundColor: '#fff',
	      borderColor: "#666",
	      borderWidth: 1,
	      width: "7.14%",
	      height: 37,
	      borderRadius: 5,
	      padding: 2,
	   		margin: 1,
			},
			dealtCard: {
				opacity: .2,
			},
	    valueText: {
	    	fontSize: 10,
	    	fontWeight: "600",
	    	width: "100%",
	    	textAlign: "center",
	    	color: suitColorName,
	    },
	    suitContainer: {
	    	width: "100%",
	    	flexDirection: 'row',
	    	justifyContent: "center",
	    }
	  });


    return (
    	// <View style={styles.card}>
    	<View style={[styles.card, hasBeenDealt ? styles.dealtCard : styles.card]}>
	    	<View style={styles.suitContainer}><MaterialCommunityIcons style="" name={suitIconName} size={14} color={suitColorName} /></View>
	      <Text style={styles.valueText}>{valueName}</Text>
      </View>
    );
  }
}

