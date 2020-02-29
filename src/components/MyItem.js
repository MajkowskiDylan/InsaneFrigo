import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, FlatList, navigation } from 'react-native';
	
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { connect, dispatch } from 'react-redux';

const MyItem = (props, { navigation }) => {
    const ingredient = props.ingredient;
    const uriIngredient = "https://spoonacular.com/cdn/ingredients_100x100/";
    var name = (ingredient.name);
    const zeFridge = props.lists[0];
    const zeShoppingList = props.lists[1];
    const myParent = props.parent;
    const addTo = props.addTo;
    console.log(props);

    _saveIngredient = async () => {
      console.log("Loool");
      var temp = [];
      temp = zeFridge.concat(ingredient);
    
      console.log(temp);
      const action = { type: 'SAVE_INGREDIENT', value: temp };
      props.dispatch(action);
      
      console.log("Onch");
      }
    
    _unsaveIngredient = async () => {
      const action = { type: 'UNSAVE_INGREDIENT', value: navigation.getParam('tbIngredients') };
      props.dispatch(action);
    }

    _displaySaved = () => {
      if(addTo == "Fridge" || addTo == "ShoppingList")
      {
        if(addTo == "Fridge")
        {
          return (
            <TouchableOpacity style = {styles.box} onPress={ _saveIngredient }>
              <Image style = { styles.bottomIcon } source = { assets.toSaveIcon} />
            </TouchableOpacity>
          );
        }
        else if(addTo == "ShoppingList")
        {
          return (
            <TouchableOpacity style = {styles.box} onPress={ _saveIngredient }>
            <Image style = { styles.bottomIcon } source = { assets.toSaveIcon} />
          </TouchableOpacity>
          );
        }
            
      }
      else
      {
        var otherList;
        if (myParent == "Fridge")
        {
          otherList = zeShoppingList;  
        }
        else if(myParent == "ShoppingList")
        {
          otherList = zeFridge;
        }
        // Dans liste A, si l'ingredient n'est pas dans liste B, on peut l'ajouter à la liste B
        if(otherList.findIndex( element => element.name == ingredient.name && element.aisle == ingredient.aisle ) > -1)
        {
          return (
            <TouchableOpacity style = {styles.box} onPress={ _saveIngredient }>
              <Image style = { styles.bottomIcon } source = { assets.outFridgeIcon } />
            </TouchableOpacity>
          );
        }
        else
        {
        return (
            <TouchableOpacity style = {styles.box}>
              <Image style = { styles.bottomIcon } source = { assets.onFridgeIcon } />
            </TouchableOpacity>
          );
        }
      }
      return null;
    }

	return (
        <TouchableOpacity style={ styles.mainContainer } >
        <Image source={{uri: uriIngredient + ingredient.image}} style={ styles.typeImage }/>
        <View style={ styles.itemsContainer }>
          <Text style={ styles.itemNameText }> 
          { ingredient.name },aisle: {ingredient.aisle}
          </Text>
        </View>
        
        { _displaySaved() }
        <TouchableOpacity>
        <Image style={styles.typeImage } source={ assets.suppIcon } />
        </TouchableOpacity>
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
