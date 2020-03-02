import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList, navigation } from 'react-native';
import { Button } from 'react-native-elements'

	
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { connect, dispatch } from 'react-redux';

const MyItem = ({navigation, ingredient, parent, addTo, dispatch, updateIngredients, config}) => {

  //const ingredient = props.ingredient; // l'ingredient courant sur lequel on clique
  const uriIngredient = "https://spoonacular.com/cdn/ingredients_100x100/";
  var name = (ingredient.name);
  const myParent = parent; // regarde si on fait ça depuis My (Fridge ou SL)
  const myAddTo = addTo; // regarde si on fait ça depuis Add To (Fridge ou SL)

  // Sauve un ingredient dans la pList
  _saveIngredient = async (pList) => {
    console.log("save");
      if(!_isIngredientInList(pList))
      {
        var temp = pList.push(ingredient);
        const action = { type: 'SAVE_INGREDIENT', value: pList };
        dispatch(action);
      }
    }
  
  // Supprime l'ingredient courant de la pList 
  _unsaveIngredient = async (pList) => {
    console.log("unSave");
    if(_isIngredientInList(pList))
    {
      var temp = pLish.filter(element => ((element.name) != (ingredient.name) && (element.aisle) != (ingredient.aisle)));
      const action = { type: 'UNSAVE_INGREDIENT', value: pList };
      dispatch(action);
    }
  }

  // Retourne vrai si l'ingredient est dans la pList sinon faux
  _isIngredientInList = (pList) => {
    return (pList.findIndex( element => (element.name).toLowerCase() == (ingredient.name).toLowerCase() && 
    (element.aisle).toLowerCase() == (ingredient.aisle).toLowerCase() ) > -1);
  }

  _supprimerIngredient = () => {
    console.log("supp");
  }

  // Affiche l'icone de suppression si la composant parent n'est pas AddTo (et donc soit My [Fridge/ShoppingList])
  _displaySuppIcons = () => {
    if(!myAddTo)
    {
      return (					
        <Button buttonStyle={{backgroundColor: colors.mainDrakGray, height:33, width:33, margin:0,padding:0}} icon={{name: "delete-forever", size: 18, color: "white"}} onPress={() => _supprimerIngredient() } />
      );
    }
  };

  // Affiche les icones d'ajout dans My [Fridge/ShoppingList] et AddTo [Fridge/ShoppingList]
  // Si l'icone n'est pas pleine, on peut l'ajouter
  _displaySaved = () => {

  }





	return (
    <TouchableOpacity style={ styles.mainContainer } >
      <Image source={{uri: uriIngredient + ingredient.image}} style={ styles.typeImage }/>
      <View style={ styles.itemsContainer }>
        <Text style={ styles.itemNameText }> 
        { ingredient.name } - aisle: {ingredient.aisle}
        </Text>
      </View>
      <View style = {styles.buttons}>
        { _displaySaved() }
        { _displaySuppIcons() }
      </View>
    </TouchableOpacity>  
  )
};

MyItem.navigationOptions = {
	title: 'MyItem',
};

export default connect(mapStateToProps)(MyItem);

const mapStateToProps = (state) => {
	return {
    updateIngredients: state.updateIngredients,
    config : state.settingPreferance
	}
}

const styles = StyleSheet.create({
    mainContainer: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
    },
    typeImage: {
      height: 50,
      width: 50,
      backgroundColor: '#6b689c',
    },
    itemsContainer: {
      flex: 1,
      marginLeft: 10,
    },
    itemNameText: {
      textTransform: 'capitalize',
      fontWeight: 'bold',
      fontSize: 20,
    },
    buttons:{
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
