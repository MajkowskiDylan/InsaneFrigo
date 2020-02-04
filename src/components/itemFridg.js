import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons';

const RestaurantItem = () => {
  return (
    <TouchableOpacity style={ styles.mainContainer } >
      <Image style={ styles.typeImage }/>
      <View style={ styles.itemsContainer }>
        <Text style={ styles.itemNameText }> 
          type
        </Text>
      <View style={ styles.ratesContainer }>
        quantity
      </View>
      </View>
      <View style = { styles.bouton } >
        <Button style = {{margin: 3}} icon={{name: "shopping-cart", size: 30, color: "white"}} />
        <Button style = {{margin: 3}} icon={{name: "delete-forever", size: 30, color: "white"}} />        
      </View>
    </TouchableOpacity>
  );
}

export default RestaurantItem;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  typeImage: {
    height: 80,
    width: 80,
    backgroundColor: '#6b689c',
  },
  itemsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemNameText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ratesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bouton : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
		justifyContent: 'center',
  }
});