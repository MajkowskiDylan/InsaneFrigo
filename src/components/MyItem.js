import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
	
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';

const MyItem = (props) => {
    const ingredient = props.ingredient;

    _removeIngredient = () => {
        console.log("On enleve hop hop hop!");
    }

    // D'ici, quand on est dans le Fridge, on ajoute à la ShoppingList
    // D'ici, quand on est dans la Shopping List, on ajoute au Fridge
    _addToList = () => {
        console.log("On ajoute ça allez allez allez");
        // Dependant de Settings: un ingredient retire peut etre ajoute automatiquement ajoute a l'autre
    }

	return (
        <TouchableOpacity style={ styles.mainContainer } >
        <Image style={ styles.typeImage }/>
        <View style={ styles.itemsContainer }>
          <Text style={ styles.itemNameText }> 
          { ingredient.name }
          </Text>
        </View>
        
        <Button title="+" style = {styles.typeImage } onPress={ _addToList}/>

        <Button title="-" style = {styles.typeImage } onPress={ _removeIngredient}/>
      </TouchableOpacity>
      
)};

MyItem.navigationOptions = {
	title: 'MyItem',
};

export default MyItem;

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