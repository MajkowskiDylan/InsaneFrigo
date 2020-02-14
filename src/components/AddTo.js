import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation } from 'react-native';
	
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import IngredientSearch from './IngredientSearch';

const AddTo = (props) => {
	console.log(props);
	return (
		<View>
			<IngredientSearch/>
            <Text> Add To : Fridge / My List (un seul composant pour les deux, ça fonctionnera comme un filtre... </Text>
		</View>
    );
}

AddTo.navigationOptions = {
	title: 'Add to my Fridge / Shopping List',
};

export default AddTo;