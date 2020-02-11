import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
	
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import IngredientSearch from './IngredientSearch';

const AddTo = (props) => {

	return (
		<View>
			<IngredientSearch/>
            <Text> Add To : Fridge / My List (un seul composant pour les deux, ça fonctionnera comme un filtre... 
                remarque à moi-même: d'ailleurs on pourrait faire pareil avec Fridge et Shopping List ?) </Text>
		</View>
    );
}

AddTo.navigationOptions = {
	title: 'Add to my Fridge / Shopping List',
};

export default AddTo;