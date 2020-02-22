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
    var name = (ingredient.name)

    _saveRestaurant = async () => {
      const action = { type: 'SAVE_RESTAURANT', value: navigation.getParam('restaurantsID') };
      dispatch(action);
      }
    
    _unsaveRestaurant = async () => {
      const action = { type: 'UNSAVE_RESTAURANT', value: navigation.getParam('restaurantsID') };
      dispatch(action);
    }

	return (
        <TouchableOpacity style={ styles.mainContainer } >
        <Image source={{uri: uriIngredient + ingredient.image}} style={ styles.typeImage }/>
        <View style={ styles.itemsContainer }>
          <Text style={ styles.itemNameText }> 
          { ingredient.name },aisle: {ingredient.aisle}
          </Text>
        </View>
        <Button title="kek" style = {styles.typeImage } onPress={() => _saveRestaurant()} />
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
      height: 100,
      width: 100,
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
    }
  });