import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, FlatList, navigation } from 'react-native';
	
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import { connect, dispatch } from 'react-redux';
import { saveRestaurants } from '../store/reducer/updateListReducer';

const MyItem = (props,{navigation,saveRestaurants, dispatch}) => {
    const ingredient = props.ingredient;
    const uriIngredient = "https://spoonacular.com/cdn/ingredients_100x100/";
    var name = (ingredient.name);
    const tempTBFridge = [{"name": "Tomate", "aisle": "Fruigume"},{"name": "Haricot", "aisle": "Legume"}];
    const tempTBShopList= [{"name": "Asperge", "aisle": "Legume"}, {"name": "Riz", "aisle": "Fruit"}];
  
    console.log(navigation);
    _saveRestaurant = async () => {
      const action = { type: 'SAVE_RESTAURANT', value: navigation.getParam('restaurantsID') };
      dispatch(action);
      }
    
    _unsaveRestaurant = async () => {
      const action = { type: 'UNSAVE_RESTAURANT', value: navigation.getParam('restaurantsID') };
      dispatch(action);
    }
    const _displaySaved = () => {
      /*if( isSaved ) { return ( <Image  style = { styles.saveIcon } source = { assets.onFridgeIcon } /> ); }
      return ( <Image  style = { styles.saveIcon } source = { assets.outFridgeIcon } /> );*/
      return ( 
        <TouchableOpacity>
        <TouchableOpacity style = {styles.box}>
        <Image style = { styles.bottomIcon } source = { assets.outFridgeIcon } />
        </TouchableOpacity>
      <TouchableOpacity style = {styles.box}>
        <Image style = { styles.bottomIcon } source = { assets.onFridgeIcon } />
        </TouchableOpacity>
        </TouchableOpacity>
        );
    }
  //A METTRE EN BAS: <Button title="sav" style = {styles.typeImage } onPress={() => _saveRestaurant()} />
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
	  saveRestaurants: state.saveRestaurants.restaurantsID
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