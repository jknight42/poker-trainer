import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DeckOfCards from './DeckOfCards.js';

export default class App extends React.Component {



  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <DeckOfCards style={styles.deckOfCards}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deckOfCards: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    padding: 10,
    marginTop: 50,
  }
});
