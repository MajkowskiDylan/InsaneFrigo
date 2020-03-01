import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, FlatList, navigation } from 'react-native';
	
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { connect, dispatch } from 'react-redux';

const MyItem = (props, { navigation }) => {
    const ingredient = props.ingredient; // l'ingredient courant sur lequel on clique
    const uriIngredient = "https://spoonacular.com/cdn/ingredients_100x100/";
    var name = (ingredient.name);
    const zeFridge = props.lists[0]; // récupère le Fridge de IngredientSearch, /!\ PB: c'est une copie et pas le redux state
    const zeShoppingList = props.lists[1]; // récupère la Shopping List de IngredientSearch, /!\ PB: c'est une copie et pas le redux state
    const myParent = props.parent; // regarde si on fait ça depuis My (Fridge ou SL)
    const addTo = props.addTo; // regarde si on fait ça depuis Add To (Fridge ou SL)
    //console.log(props);

    // Sauve un ingredient dans la pList
    _saveIngredient = async (pList) => {
      console.log("Loool");
      // Si l'ingredient n'est pas déjà dans la liste, on l'y ajoute
        if(!_isIngredientInList(pList))
        {
          var temp = pList.push(ingredient);
          const action = { type: 'SAVE_INGREDIENT', value: pList };
          props.dispatch(action);
          console.log(pList);
        }

      }
    
    // Supprime l'ingredient courant de la pList 
    _unsaveIngredient = async (pList) => {
      // Si l'ingredient n'est pas dedans, pas besoin de le retirer
      if(!_isIngredientInList(pList))
      {
        var temp = pLish.filter(element => ((element.name) != (ingredient.name) && (element.aisle) != (ingredient.aisle)));
        const action = { type: 'UNSAVE_INGREDIENT', value: pList };
        props.dispatch(action);
      }
    }

    // Retourne vrai si l'ingredient est dans la pList sinon faux
    _isIngredientInList = (pList) => {
      return (pList.findIndex( element => (element.name).toLowerCase() == (ingredient.name).toLowerCase() && 
      (element.aisle).toLowerCase() == (ingredient.aisle).toLowerCase() ) > -1);
    }
    // Affiche les icones d'ajout dans My [Fridge/ShoppingList] et AddTo [Fridge/ShoppingList]
    // Si l'icone n'est pas pleine, on peut l'ajouter
    _displaySaved = () => {
      if(addTo == "Fridge" || addTo == "ShoppingList")
      {
          var container = (addTo == "Fridge"? zeFridge:zeShoppingList);
          if((_isIngredientInList(container)))
          {
            return (
              <View style = {styles.box}>
                <Image style = { styles.bottomIcon } source = { assets.toUnsaveIcon} />
              </View>
            ); 
          }
          else
          {
            return (
              <TouchableOpacity style = {styles.box} onPress={() => _saveIngredient(addTo) }>
                <Image style = { styles.bottomIcon } source = { assets.toSaveIcon} />
              </TouchableOpacity>
          );
          }
      }
      else
      {
        // Dans liste A, si l'ingredient n'est pas dans liste B, on peut l'ajouter à la liste B
        var otherList = (myParent == "Fridge" ? zeShoppingList : zeFridge);
        if(_isIngredientInList(otherList))
        {
          return (
            <TouchableOpacity style = {styles.box} onPress={() => _saveIngredient(otherList) }>
              <Image style = { styles.bottomIcon } source = { assets.onFridgeIcon } />
            </TouchableOpacity>
          );
        }
        else
        {
        return (
            <View style = {styles.box}>
              <Image style = { styles.bottomIcon } source = { assets.outFridgeIcon } />
            </View>
          );
        }
      }
    }

    // Affiche l'icone de suppression si la composant parent n'est pas AddTo (et donc soit My [Fridge/ShoppingList])
    _displaySuppIcons = () => {
      if(!addTo)
      {
        return (
          <TouchableOpacity>
          <Image style={styles.typeImage } source={ assets.suppIcon } />
          </TouchableOpacity>
        );
      }
    };

	return (
        <TouchableOpacity style={ styles.mainContainer } >
        <Image source={{uri: uriIngredient + ingredient.image}} style={ styles.typeImage }/>
        <View style={ styles.itemsContainer }>
          <Text style={ styles.itemNameText }> 
          { ingredient.name } - aisle: {ingredient.aisle}
          </Text>
        </View>
        { _displaySaved() }
        { _displaySuppIcons() }
      </TouchableOpacity>

      
)};

MyItem.navigationOptions = {
	title: 'MyItem',
};

export default connect(mapStateToProps)(MyItem);

const mapStateToProps = (state) => {
	return {
	  updateIngredients: state.updateIngredients.tbIngredients
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
    },
    box: {
      flex: 1,
      fontSize: 20,
      paddingTop: 15,
      paddingLeft: 20,
      flexDirection: 'row',
    },
    bottomIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
  }
  });
