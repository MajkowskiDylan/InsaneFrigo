import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList, navigation } from 'react-native';
import { Button } from 'react-native-elements'

	
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { connect, dispatch } from 'react-redux';

const MyItem = ({reloadIng, ingredient, parent, addTo, dispatch, updateIngredients, settingPreferance}) => {
  //const ingredient = props.ingredient; // l'ingredient courant sur lequel on clique
  const uriIngredient = "https://spoonacular.com/cdn/ingredients_100x100/";
  const myAddTo = addTo; // regarde si on fait ça depuis Add To (Fridge ou SL)
  var actionName =null;
  var suppName =null;

  if (parent == "Fridge")
  {
    actionName = "SAVE_SHOPPING_INGREDIENT";
    suppName = "SAVE_FRIDGE_INGREDIENT";
  }
  if (parent == "ShoppingList")
  {
    actionName = "SAVE_FRIDGE_INGREDIENT";
    suppName = "SAVE_SHOPPING_INGREDIENT";
  }

  // Sauve un ingredient dans la pList
  _saveIngredient = async (myIngredient) => {
    if(!_isIngredientInList(true, myIngredient))
      {
        const action = { type: actionName, value: myIngredient };
        dispatch(action);
        
        if (parent == "ShoppingList")
        {
          if(settingPreferance.FtoL == true)
            _supprimerIngredient(myIngredient);
        }
      }
    }
  
  // Supprime l'ingredient courant de la pList 
  _unsaveIngredient = async (myIngredient) => {
    if(_isIngredientInList(true, myIngredient))
    {
      const action = { type: 'UN'+actionName, value: myIngredient };
      dispatch(action);
    }
  }

  _supprimerIngredient = async (myIngredient) => {
    if (parent == "Fridge")
    {
      if(settingPreferance.FtoL == true)
        _saveIngredient(myIngredient);
    }
    await _supprimerIngredientBis(myIngredient);
    await reloadIng();
  }

  _supprimerIngredientBis = async (myIngredient) => {
    if(_isIngredientInList(false, myIngredient))
    {
      const action = { type: 'UN'+suppName, value: myIngredient };
      dispatch(action);
    }
  }

  _ajouterIngredient = async (myIngredient) => {
    await _ajouterIngredientBis(myIngredient);
    await reloadIng();
  }

  _ajouterIngredientBis = async (myIngredient) => {
    if(!_isIngredientInList(false, myIngredient))
    {
      const action = { type: suppName, value: myIngredient };
      dispatch(action);
    }
  }
  // Retourne vrai si l'ingredient est dans la pList sinon faux
  _isIngredientInList = (Oposer, myIngredient) => {
    if(!Oposer)
    {
      if (parent == "Fridge"){
        return (updateIngredients.FridgeIngredients.findIndex( element => (element.name).toLowerCase() == (myIngredient.name).toLowerCase() && (element.aisle).toLowerCase() == (myIngredient.aisle).toLowerCase() ) > -1);
      }if (parent == "ShoppingList"){
        return (updateIngredients.ShoppingIngredients.findIndex( element => (element.name).toLowerCase() == (myIngredient.name).toLowerCase() && (element.aisle).toLowerCase() == (myIngredient.aisle).toLowerCase() ) > -1);
  }}
    else
    {
      if (parent == "Fridge"){
        return (updateIngredients.ShoppingIngredients.findIndex( element => (element.name).toLowerCase() == (myIngredient.name).toLowerCase() && (element.aisle).toLowerCase() == (myIngredient.aisle).toLowerCase() ) > -1);
      }if (parent == "ShoppingList"){
        return (updateIngredients.FridgeIngredients.findIndex( element => (element.name).toLowerCase() == (myIngredient.name).toLowerCase() && (element.aisle).toLowerCase() == (myIngredient.aisle).toLowerCase() ) > -1);
    }}
  }

  // Affiche l'icone de suppression si la composant parent n'est pas AddTo (et donc soit My [Fridge/ShoppingList])
  _displaySuppIcons = () => {
    if(!myAddTo)
    {
      return (					
        <Button buttonStyle={{backgroundColor: colors.mainOrangeColor, height:33, width:33, margin:0,padding:0}} icon={{name: "delete-forever", size: 18, color: "white"}} onPress={() => _supprimerIngredient(ingredient) } />
      );
    }
  };

  // Affiche les icones d'ajout dans My [Fridge/ShoppingList] et AddTo [Fridge/ShoppingList]
  // Si l'icone n'est pas pleine, on peut l'ajouter
  _displaySaved = () => {
    if (addTo)
      return(<Button buttonStyle={{backgroundColor: colors.mainOrangeColor, height:33, width:33, margin:0,padding:0}} icon={{name: "add", size: 18, color: "white"}} onPress={() => _ajouterIngredient(ingredient) } />);
    else
    {
      if (parent == "Fridge")
        var icone = "shopping-cart";
      if (parent == "ShoppingList")
        var icone = "kitchen";
      if(_isIngredientInList(true, ingredient))
        return(<Button buttonStyle={{backgroundColor: colors.mainOrangeColor, height:33, width:33, marginRight:5, padding:0}} icon={{name: icone, size: 18, color: "white"}} onPress={() => _unsaveIngredient(ingredient) } />);
      else
        return(<Button buttonStyle={{backgroundColor: colors.mainWhiteColor, height:33, width:33, marginRight:5, padding:0}} icon={{name: icone, size: 18, color: "black"}} onPress={() => _saveIngredient(ingredient) } />);
    }
  }





	return (
    <TouchableOpacity style={ styles.mainContainer } >
      <Image source={{uri: uriIngredient + ingredient.image}} style={ styles.typeImage } resizeMode="contain" />
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

const mapStateToProps = (state) => {
	return {
    updateIngredients:state.updateIngredients,
    settingPreferance:state.settingPreferance,
	}
}
  
export default connect(mapStateToProps)(MyItem);

const styles = StyleSheet.create({
    mainContainer: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
    },
    typeImage: {
      height: 50,
      width: 50,
      backgroundColor: '#FFF',
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
